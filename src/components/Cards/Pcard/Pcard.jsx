import React from 'react';
import './Pcard.css'
import {
    Card,
    Typography,
    CardContent,
    CardMedia,
    Divider,
    Grid
} from '@mui/material';

import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import ShowerIcon from '@mui/icons-material/Shower';
import AppsIcon from '@mui/icons-material/Apps';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

export default function Pcard({ data, giveStar }) {
    return (
        <Grid item lg={1} md={3} sm={3}>
            <Card sx={{ width: '100%' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={data.url}
                    alt={data.name}
                />
                <CardContent>
                    <div className='cardHeader'>
                        <div>
                            <Typography gutterBottom variant="h6" align='left'>
                                <span className='rent'>${`${data.rent}`}</span>/month
                            </Typography>
                        </div>
                        <div>
                            {data.like ? <StarIcon className='icon' onClick={() => {
                                giveStar(data.id)
                            }} /> : <StarOutlineIcon className='icon' onClick={() => {
                                giveStar(data.id)
                            }} />}
                        </div>
                    </div>
                    <Typography gutterBottom variant="h5" color="text.primary" sx={{ fontWeight: 'bold' }} align='left'>
                        {data.name} <span className='ptype'>{data.type}</span>
                    </Typography>
                    <Typography gutterBottom variant="body2" color="text.secondary" align='left'>
                        {data.address}
                    </Typography>
                    <Typography gutterBottom variant="body2" color="text.secondary" align='left'>
                        <span className='moveInDate'>Move in date </span>
                        {data.move_in_date.toISOString().split('T')[0]}
                    </Typography>
                    <Divider />
                    <div className='cardBottom'>
                        <div> <LocalHotelIcon className='icon' /> {data.no_beds} Beds</div>
                        <div> <ShowerIcon className='icon' /> {data.no_baths} Bathrooms</div>
                        <div> <AppsIcon className='icon' /> {data.lot_size} sqft</div>
                    </div>
                </CardContent>
            </Card>
        </Grid>
    );
}
