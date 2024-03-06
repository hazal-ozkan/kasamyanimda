
import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import { Card, CardContent, Grid, Typography } from '@mui/material';
export default function PersonalPieChart() {
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
    series={[
      {
        data: [
          { id: 0, value: 10, label: 'Yunus Kırbaş' },
          { id: 1, value: 15, label: 'Yıldıray Erdem' },
          { id: 2, value: 20, label: 'Semih Apdik' },
        ],
      },
    ]}
    width={400}
    height={200}
  /></CardContent></Card>
   
  )
}
