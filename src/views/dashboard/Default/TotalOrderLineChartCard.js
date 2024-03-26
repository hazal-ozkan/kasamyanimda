import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';

// assets
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import axios from 'axios';
import { useEffect } from 'react';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    background: theme.palette.primary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ==============================|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||============================== //

const TotalOrderLineChartCard = ({ isLoading }) => {
  const [mounthlyProduct,setMounthlyProduct] = useState(0)
  const [yearlyProduct,setYearlyProduct] = useState(0)
  const [chartDataMonth,setChartDataMonth] = useState([])
  const [chartDataYear,setChartDataYear] = useState([])
  const theme = useTheme();
  const productList = async () => {
    
    try{
      const apiUrl = `http://72.167.148.55:35627/api/Product/sales/list`;
        const response = await axios.get(apiUrl, {
          withCredentials: true,
            headers: {
             Accept:'*/*',
             'Content-Type': 'application/json'
            }
        })
        calculateMonthlyAndYearly(response.data)
        calculateDailySales(response.data)
        calculateDailySalesYearly(response.data)
    }catch(err){
      console.log(err)
    }
  }
  const [timeValue, setTimeValue] = useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  const calculateDailySales = (salesData) => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    
    // Günlük satışları tutacak bir obje oluştur
    const dailySales = {};
  
    salesData.forEach((sale) => {
      const saleDate = new Date(sale.saleDate);
      const saleMonth = saleDate.getMonth() + 1;
      const saleYear = saleDate.getFullYear();
      
      // Eğer satış bu ay ve bu yıl içindeyse devam et
      if (saleMonth === currentMonth && saleYear === currentYear) {
        const saleDay = saleDate.getDate();
        
        // Eğer bu gün için bir giriş yoksa oluştur, varsa topla
        dailySales[saleDay] = (dailySales[saleDay] || 0) + calculateTotalQuantity(sale.items);
      }
    });
  
    // dailySales objesini diziye çevir ve set et
    setChartDataMonth(( 
      {
      type: 'line',
      height: 90,
      options: {
        chart: {
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#fff'],
        fill: {
          type: 'solid',
          opacity: 1
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        yaxis: {
          min: 0,
          max: 100
        },
        tooltip: {
          theme: 'dark',
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: 'Satılan Ürün Adedi'
          },
          marker: {
            show: false
          }
        }
      },
    series: [
      {
        name: 'Satılan Ürün Adedi',
        data: Object.entries(dailySales)// Yearly product değerini buraya ekleyin
      }
    ]
  }));
  };
  const calculateDailySalesYearly = (salesData) => {
    const currentYear = new Date().getFullYear();
    
    // Günlük satışları tutacak bir obje oluştur
    const dailySalesYearly = {};
  
    salesData.forEach((sale) => {
      const saleDate = new Date(sale.saleDate);
      const saleYear = saleDate.getFullYear();
      
      // Eğer satış bu yıl içindeyse devam et
      if (saleYear === currentYear) {
        const saleDay = saleDate.getDate();
        
        // Eğer bu gün için bir giriş yoksa oluştur, varsa topla
        dailySalesYearly[saleDay] = (dailySalesYearly[saleDay] || 0) + calculateTotalQuantity(sale.items);
      }
    });
  
    // dailySalesYearly objesini diziye çevir ve set et
    setChartDataYear( {
      type: 'line',
      height: 90,
      options: {
        chart: {
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#fff'],
        fill: {
          type: 'solid',
          opacity: 1
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        yaxis: {
          min: 0,
          max: 100
        },
        tooltip: {
          theme: 'dark',
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: 'Satılan Ürün Adedi'
          },
          marker: {
            show: false
          }
        }
      },
    series: [
      {
        name: 'Satılan Ürün Adedi',
        data: Object.entries(dailySalesYearly)// Yearly product değerini buraya ekleyin
      }
    ]
  })}
  
  const calculateTotalQuantity = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateMonthlyAndYearly = (salesData) => {
    const currentMonth = new Date().getMonth() + 1; // JavaScript'te aylar 0'dan başladığı için +1 ekliyoruz
    const currentYear = new Date().getFullYear();
  
    let monthlyTotal = 0;
    let yearlyTotal = 0;
  
    salesData.forEach((sale) => {
      const saleDate = new Date(sale.saleDate);
      const saleMonth = saleDate.getMonth() + 1;
      const saleYear = saleDate.getFullYear();
  
      sale.items.forEach((item) => {
        const quantity = item.quantity;
  
        // Belirtilen ay içinde olan satışlara ait miktarları topla
        if (saleMonth === currentMonth && saleYear === currentYear) {
          monthlyTotal += quantity;
        }
  
        // Belirtilen yıl içinde olan satışlara ait miktarları topla
        if (saleYear === currentYear) {
          yearlyTotal += quantity;
        }
      });
    });
  
    setMounthlyProduct(monthlyTotal);
    setYearlyProduct(yearlyTotal);
  };



  
useEffect(()=>{
  productList()
},[])



  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: theme.palette.primary[800],
                        color: '#fff',
                        mt: 1
                      }}
                    >
                      <LocalMallOutlinedIcon fontSize="inherit" />
                    </Avatar>
                  </Grid>
                  <Grid item>
                    <Button
                      disableElevation
                      variant={timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, true)}
                    >
                      Aylık
                    </Button>
                    <Button
                      disableElevation
                      variant={!timeValue ? 'contained' : 'text'}
                      size="small"
                      sx={{ color: 'inherit' }}
                      onClick={(e) => handleChangeTime(e, false)}
                    >
                      Yıllık
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 0.75 }}>
                <Grid container alignItems="center">
                  <Grid item xs={6}>
                    <Grid container alignItems="center">
                      <Grid item>
                        {timeValue ? (
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{mounthlyProduct}</Typography>
                        ) : (
                          <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>{yearlyProduct}</Typography>
                        )}
                      </Grid>
                     
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: theme.palette.primary[200]
                          }}
                        >
                          Satılan Ürün Adedi
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6}>
  {timeValue ? (
    chartDataMonth && chartDataMonth.options && chartDataMonth.series ? (
      <Chart
        options={chartDataMonth.options}
        series={chartDataMonth.series}
        type="line"
        height="90"
      />
    ) : null
  ) : (
    chartDataYear && chartDataYear.options && chartDataYear.series ? (
      <Chart
        options={chartDataYear.options}
        series={chartDataYear.series}
        type="line"
        height="90"
      />
    ) : null
  )}
</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool
};

export default TotalOrderLineChartCard;
