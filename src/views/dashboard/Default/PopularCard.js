import PropTypes from 'prop-types';


// material-ui

import {   CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports

import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets


// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
 



  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">Bugünün Popüler Ürünleri/Satış Adedi</Typography>
                  </Grid>
                 
                </Grid>
              </Grid>
             
              <Grid item xs={12}>
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Bajaj Finery
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="#1E88E5">
                              10 Adet
                            </Typography>
                          </Grid>
                          
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                 
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          TTML
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="#1E88E5">
                              8 Adet
                            </Typography>
                          </Grid>
                          
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                 
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Reliance
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="#1E88E5">
                              6 Adet
                            </Typography>
                          </Grid>
                          
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          TTML
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="#1E88E5">
                             5 Adet
                            </Typography>
                          </Grid>
                          
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  
                </Grid>
                <Divider sx={{ my: 1.5 }} />
                <Grid container direction="column">
                  <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                      <Grid item>
                        <Typography variant="subtitle1" color="inherit">
                          Stolon
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                          <Grid item>
                            <Typography variant="subtitle1" color="#1E88E5">
                              4 Adet
                            </Typography>
                          </Grid>
                          
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                 
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          
          
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
