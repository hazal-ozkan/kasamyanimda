import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';

// third-party
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import axios from 'axios';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({ isLoading }) => {
  const [chartData, setChartData] = useState(null);
const [totalSales,setTotalSales] = useState(0)
  const productList = async () => {
    try {
      const apiUrl = `http://72.167.148.55:35627/api/Product/sales/list`;
      const response = await axios.get(apiUrl, {
        withCredentials: true,
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });

      const monthlyTotalSales = calculateMonthlyTotalSales(response.data);
      const monthLabels = getMonthLabels();
setTotalSales(calculateYearlyTotalSales(response.data))
      setChartData({
        type: 'bar',
        xaxis: {
          categories: monthLabels,
        },
        series: [
          {
            name: 'Toplam Satış Tutarı',
            data: monthlyTotalSales,
          },
        ],
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    productList();
  }, []);


  const calculateYearlyTotalSales = (salesData) => {
    let yearlyTotalSales = 0;
  
    salesData.forEach((sale) => {
      const saleTotalPrice = parseFloat(sale.totalPrice.toFixed(2));
      yearlyTotalSales += saleTotalPrice;
    });
  
    return yearlyTotalSales.toFixed(2);
  };
  const getMonthLabels = () => {
    const monthLabels = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(0);
      date.setUTCMonth(i);
      const monthName = date.toLocaleString('default', { month: 'long' });
      monthLabels.push(monthName);
    }
    return monthLabels;
  };

  const calculateMonthlyTotalSales = (salesData) => {
    const monthlyTotalSales = Array.from({ length: 12 }, () => 0); // Ay başına sıfır ile başlat
  
    salesData.forEach((sale) => {
      const saleDate = new Date(sale.saleDate);
      const saleMonth = saleDate.getMonth();
      const saleTotalPrice = parseFloat(sale.totalPrice.toFixed(2)); // Virgülden sonra en fazla 2 rakamı dahil eder
  
      monthlyTotalSales[saleMonth] += saleTotalPrice;
    });
  
    return monthlyTotalSales;
  };
  


  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">Satış Grafiği</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">{totalSales}₺</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
            {chartData && (
  <Chart
    options={{
      ...chartData,
      tooltip: {
        y: {
          formatter: function (val) {
            return val.toFixed(2) + "₺";
          },
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val.toFixed(2);
          },
        },
      },
      dataLabels: {
        enabled: false, // Sütunların üstünde herhangi bir şey göstermeyecek şekilde devre dışı bırakıldı
      },
    }}
    series={chartData.series}
    type={chartData.type}
    height="300px"
  />
)}

            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalGrowthBarChart;
