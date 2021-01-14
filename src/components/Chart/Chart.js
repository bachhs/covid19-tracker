import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../utils/axios';
import { Line, Bar } from 'react-chartjs-2';

import './Chart.css';
import Skeleton from '@material-ui/lab/Skeleton';

function Chart({ data, country, ...rest }) {

    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/daily`)
            .then((response) => {
                setDailyData(response.data.map(({ confirmed, deaths, reportDate: date }) =>
                    ({ confirmed: confirmed.total, deaths: deaths.total, date })));
            });
    }, []);

    const barChart = (
        data ? (
            <Bar
                data={{
                    labels: ['Ca nhiễm', 'Bình phục', 'Tử vong'],
                    datasets: [
                        {
                            label: 'People',
                            backgroundColor: ['#1e88e5', '#388e3c', '#d81b60'],
                            data: [data.confirmed.value, data.recovered.value, data.deaths.value],
                        },
                    ],
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Số liệu thống kê tại ${country}` },
                }}
            />
        ) : <Skeleton variant="rect" width="100%">
                <Bar
                    data={{
                        labels: ['Loading'],
                        datasets: [
                            {
                                label: 'Loading',
                                data: [0],
                            },
                        ],
                    }}
                />
            </Skeleton>
    );

    const lineChart = (
        dailyData.length ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString('vi-VN')),
                    datasets: [{
                        data: dailyData.map((data) => data.confirmed),
                        label: 'Ca nhiễm',
                        borderColor: '#1e88e5',
                        fill: true,
                    }, {
                        data: dailyData.map((data) => data.deaths),
                        label: 'Tử vong',
                        borderColor: '#d81b60',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }
                    ],
                }}
            />
        ) : <Skeleton variant="rect" width="100%">
                <Line data={{
                    labels: 'Loading',
                    datasets: [{
                        data: 0
                    }
                    ],
                }}
                />
            </Skeleton>
    );

    return (
        <div className="chart-container">
            {country ? barChart : lineChart}
        </div>
    );
}

Chart.propTypes = {
    data: PropTypes.object,
    country: PropTypes.string
}

export default React.memo(Chart);
