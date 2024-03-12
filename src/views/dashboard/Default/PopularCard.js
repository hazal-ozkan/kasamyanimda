import PropTypes from 'prop-types';


// material-ui

import {   CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports

import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import React,{ useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

// assets


// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = ({ isLoading }) => {
 const [popularProduct,setPopularProduct] = useState([])
 const productList = async () => {
  try {
    const apiUrl = `https://localhost:44344/api/Product/sales/list`;
    const response = await axios.get(apiUrl, {
      withCredentials: true,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json'
      }
    });

    if (response.data.length > 0) {
      // Tüm ürünleri ve toplam quantity'yi saklamak için bir obje oluştur
      const productTotals = {};

      // Satışları dön
      response.data.forEach((sale) => {
        // Satışın ürünlerini dön
        sale.items.forEach((item) => {
          const productId = item.productId;
          const productName = item.productName;
          const quantity = item.quantity;

          // Eğer ürün daha önce eklenmediyse ekleyerek quantity'yi set et
          if (!productTotals[productId]) {
            productTotals[productId] = { productName, quantity };
          } else {
            productTotals[productId].quantity += quantity;
          }
        });
      });

      // Toplam quantity'ye göre ürünleri sırala
      const sortedProducts = Object.values(productTotals)
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5); // En yüksek 5 ürünü al

      setPopularProduct(sortedProducts);
    }
  } catch (err) {
    console.log(err);
  }
};

  
  useEffect(() => {
    productList();
  }, []);
  

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
  {popularProduct && popularProduct.map((item, index) => (
    <React.Fragment key={index}>
      <Grid container direction="column">
        <Grid item>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="subtitle1" color="inherit">
                {item.productName}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="subtitle1" color="#1E88E5">
                    {item.quantity} Adet
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {index < popularProduct.length - 1 && <Divider sx={{ my: 1.5 }} />}
    </React.Fragment>
  ))}
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
