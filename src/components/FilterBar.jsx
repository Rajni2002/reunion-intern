import React from 'react';
import {
    Grid,
    Autocomplete,
    TextField,
    Slider,
    Typography,
    FormControl,
    Select,
    InputLabel,
    MenuItem,
    Button
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#6E64ED'
        },
    },
});



export default function FilterBar({ filterData, setFilterData, handleFilter, resetFilters }) {
    const addresses = [
        {
            title: "All"
        },
        {
            title: "Boston, USA"
        },
        {
            title: "San Antonio, Texas"
        },
        {
            title: "New York, USA"
        }
    ]

    function valuetext(value) {
        return `$ ${value}`;
    }
    const handleChangeSlider = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setFilterData({ ...filterData, priceRange: [Math.min(newValue[0], filterData.priceRange[1] - 200), filterData.priceRange[1]] });
        } else {
            setFilterData({ ...filterData, priceRange: [filterData.priceRange[0], Math.max(newValue[1], filterData.priceRange[0] + 200)] });
        }
    };

    const defaultProps = {
        options: addresses,
        getOptionLabel: (option) => option.title,
    };
    return (
        <Grid container rowSpacing={3} columns={4} sx={{ borderRadius: '10px', background: 'white', padding: '0rem 1rem 0rem 1rem', marginTop: '2rem' }}>
            <Grid item xs={4} sx={{ marginBottom: '2rem' }}>
                <Typography
                    variant="h4"
                    sx={{
                        flexGrow: 1,
                        display: { sm: 'block' },
                        fontWeight: "bold",
                        fontSize: { lg: '1.5rem', xs: '1.3rem' }
                    }}
                >
                    Search Properties to rent
                </Typography>
            </Grid>
            <Grid item lg={1} md={4} xs={4}>
                <Autocomplete
                    {...defaultProps}
                    id="location"
                    clearOnEscape
                    onChange={(e) => {
                        setFilterData({ ...filterData, location: e.target.innerText })
                    }}
                    renderInput={(params) => (
                        <TextField {...params} label="Location"
                            value={filterData.location}
                            variant="outlined" />
                    )}
                />
            </Grid>
            <Grid item lg={1} md={4} xs={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <ThemeProvider theme={theme}>
                        <DesktopDatePicker
                            label="Move In date"
                            inputFormat="MM/dd/yyyy"
                            color={'primary'}
                            name="moveInDate"
                            value={filterData.moveInDate}
                            onChange={(newValue) => {
                                setFilterData({ ...filterData, moveInDate: newValue });
                            }}
                            renderInput={(params) => <TextField {...params} 
                            />}
                        />
                    </ThemeProvider>
                </LocalizationProvider>
            </Grid>
            <Grid item lg={1} md={4} xs={4} sx={{ position: 'relative', left: { lg: '-1.5rem', xs: '0rem' }, top: { lg: '-0.7rem', xs: '0rem' } }}>
                <Typography variant='body'>Price</Typography>
                <br />
                <Typography variant='body' sx={{ fontWeight: "bold" }}
                >${`${filterData.priceRange[0]}`} - ${`${filterData.priceRange[1]}`}</Typography>
                <ThemeProvider theme={theme}>
                    <Slider
                        getAriaLabel={() => 'Minimum distance'}
                        value={filterData.priceRange}
                        onChange={handleChangeSlider}
                        valueLabelDisplay="off"
                        getAriaValueText={valuetext}
                        disableSwap
                        min={600}
                        max={3600}
                        color={'primary'}
                    />
                </ThemeProvider>
            </Grid>
            <Grid item lg={1} md={4} xs={4}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Property Type</InputLabel>
                    <Select
                        name="pType"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filterData.pType}
                        label="Property Type"
                        onChange={(e) => {
                            setFilterData({ ...filterData, pType: e.target.value });
                        }}
                    >
                        <MenuItem value={"All"}>All</MenuItem>
                        <MenuItem value={"Single Family"}>Single Family</MenuItem>
                        <MenuItem value={"Double Family"}>Double Family</MenuItem>
                        <MenuItem value={"Bachelor/single"}>Bachelor/single</MenuItem>
                        <MenuItem value={"Villa"}>Villa</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={4} sx={{ marginBottom: '2rem' }}>
                <ThemeProvider theme={theme}>
                    <Button
                        variant="contained"
                        color='primary'
                        sx={{ fontWeight: 'bold' }}
                        onClick={handleFilter}>Apply filters</Button>
                    <Button
                        variant="outlined"
                        color='primary'
                        sx={{ marginLeft: '1.2rem' }}
                        onClick={resetFilters}>Reset</Button>
                </ThemeProvider>
            </Grid>
        </Grid >
    )
}