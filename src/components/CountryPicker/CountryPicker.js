import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, MenuItem, Select } from '@material-ui/core';

import axios from '../../utils/axios';

import './CountryPicker.css';
import Skeleton from '@material-ui/lab/Skeleton';

function CountryPicker({ handleCountryChange, ...rest }) {

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/countries`)
            .then((response) => {
                setCountries(response.data.countries.map((country) => country.name));
            })
    }, []);

    return (
        <FormControl className="country-picker">
            {!countries.length ? <Skeleton /> : <Select
                displayEmpty
                defaultValue=""
                onChange={(e) => handleCountryChange(e.target.value)}
            >
                <MenuItem value="">Global</MenuItem>
                {countries.map((country) => <MenuItem key={country} value={country}>{country}</MenuItem>)}
            </Select>
            }
        </FormControl>
    );
}

CountryPicker.propTypes = {
    handleCountryChange: PropTypes.func
}

export default CountryPicker;
