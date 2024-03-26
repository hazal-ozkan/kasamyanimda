import React, { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';

export default function PersonalPieChart() {
  const [employeeSales, setEmployeeSales] = useState([]);

  const productList = async () => {
    try {
      const apiUrl = `http://72.167.148.55:35627/api/Product/sales/list`;
      const response = await axios.get(apiUrl, {
        withCredentials: true,
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });

      // Her çalışanın toplam satış miktarını hesapla
      const employeeTotals = response.data.reduce((acc, sale) => {
        sale.items.forEach((item) => {
          const employeeName = sale.employeeName;
          const quantity = item.quantity;

          if (!acc[employeeName]) {
            acc[employeeName] = quantity;
          } else {
            acc[employeeName] += quantity;
          }
        });

        return acc;
      }, {});

      // PieChart için uygun formata dönüştür
      const pieChartData = Object.entries(employeeTotals).map(([employeeName, quantity]) => ({
        id: employeeName,
        value: quantity,
        label: employeeName
      }));

      setEmployeeSales(pieChartData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    productList();
  }, []);

  return (
    <Card className='mt-4'>
      <CardContent>
        <Grid item xs={12}>
          <Grid container alignContent="center" justifyContent="space-between">
            <Grid item>
              <Typography variant="h4">Personel Satış Grafiği</Typography>
            </Grid>
          </Grid>
        </Grid>
        <PieChart
          series={[{ data: employeeSales }]}
          width={400}
          height={200}
        />
      </CardContent>
    </Card>
  );
}
