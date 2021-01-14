import React, { useCallback, useEffect, useState } from 'react';
import Image from 'material-ui-image';

import './App.css';

import axios from './utils/axios';
import Cards from './components/Cards/Cards';
import Chart from './components/Chart/Chart';
import CountryPicker from './components/CountryPicker/CountryPicker';

function App() {

  const [data, setData] = useState();
  const [country, setCountry] = useState('');

  const handleCountryChange = (e) => {
    if (e !== 'Global')
      setCountry(e);
    else
      setCountry('');
    getData();
  }

  const getData = useCallback(async () => {
    let url = process.env.REACT_APP_API_URL;
    if (country && country !== 'Global')
      url = `${url}/countries/${country}`;
    await axios
      .get(url)
      .then((response) => {
        setData({
          confirmed: response.data.confirmed,
          deaths: response.data.deaths,
          recovered: response.data.recovered,
          lastUpdate: response.data.lastUpdate,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country]);

  useEffect(() => {
    getData();
  }, [getData, country]);

  return (
    <div className="App-container">
      <span className="image">
        <Image
          src="/static/images/image.png"
          aspectRatio={(370 / 82)}
          alt="COVID19"
        />
      </span>
      <Cards data={data} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
