import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import CountUp from 'react-countup';

import './Cards.css';

function Cards({ data, ...rest }) {

    return (
        <div className="card-container">
            <Grid container spacing={3} justify="center">
                <Grid item component={Card} xs={12} md={3} className="card infected">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Tổng số ca nhiễm</Typography>
                        <Typography variant="h5">
                            {!data ? <Skeleton animation="wave" /> : <CountUp
                                start={0}
                                end={data.confirmed.value}
                                separator=","
                            />
                            }
                        </Typography>
                        <Typography color="textPrimary">{!data ? <Skeleton animation="wave" /> : new Date(data.lastUpdate).toLocaleDateString('vi-VN')}</Typography>
                        <Typography variant="body2">Tổng số ca nhiễm COVID19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className="card recovered">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Đã bình phục</Typography>
                        <Typography variant="h5">
                            {!data ? <Skeleton animation="wave" /> : <CountUp
                                start={0}
                                end={data.recovered.value}
                                separator=","
                            />
                            }
                        </Typography>
                        <Typography color="textPrimary">{!data ? <Skeleton animation="wave" /> : new Date(data.lastUpdate).toLocaleDateString('vi-VN')}</Typography>
                        <Typography variant="body2">Tổng số ca đã bình phục COVID19</Typography>
                    </CardContent>
                </Grid>
                <Grid item component={Card} xs={12} md={3} className="card deaths">
                    <CardContent>
                        <Typography color="textSecondary" gutterBottom>Số ca tử vong</Typography>
                        <Typography variant="h5">
                            {!data ? <Skeleton animation="wave" /> : <CountUp
                                start={0}
                                end={data.deaths.value}
                                separator=","
                            />
                            }
                        </Typography>
                        <Typography color="textPrimary">{!data ? <Skeleton animation="wave" /> : new Date(data.lastUpdate).toLocaleDateString('vi-VN')}</Typography>
                        <Typography variant="body2">Số ca tử vong bởi COVID19</Typography>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}

Cards.propTypes = {
    data: PropTypes.object
}

export default Cards;
