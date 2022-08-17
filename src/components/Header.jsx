import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


function Header({ setSearch, searchValue, handleKeyPress }) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ borderRadius: '10px', background: 'rgb(111,101,237)' }}>
                <Toolbar sx={{ display: 'flex', flexDirection: { lg: 'row', xs: 'column' }, padding: { xs: '1rem' } }}>
                    <Typography
                        variant="h4"
                        noWrap
                        sx={{ flexGrow: 1, display: 'block', fontFamily: 'inherit', fontWeight: 'bold', textAlign: 'left', marginBottom: { xs: '1rem', lg: '0rem' } }}
                    >
                        Reunion-intern
                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            value={searchValue}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => {
                                const newValue = e.target.value
                                setSearch(newValue);
                            }
                            }
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box >
    )
}

export default Header;