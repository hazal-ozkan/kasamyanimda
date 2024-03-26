
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';


import moment from 'moment';
import React, {  useMemo,useState} from 'react';
import { useEffect } from 'react';





const SalesList = (props) => {
  
  const [rowData,setRowData]=useState([])
  

  const stockEntryList = async () => {
    
    try{
      const apiUrl = `http://72.167.148.55:35627/api/Product/sales/list`;
        const response = await axios.get(apiUrl, {
          withCredentials: true,
            headers: {
             Accept:'*/*',
             'Content-Type': 'application/json'
            }
        })
        setRowData(response.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    stockEntryList()
  },[props.refresh])
  const columnDefs = [
    {
      field: 'id',
      headerName:'SatışNo'
    },
    {
      field: 'totalPrice',
      headerName:'Toplam Tutar'
    },
 
    {
      field: 'customerName',
      headerName:'Müşteri'
    },
 
    {
      field: 'employeeName',
      headerName:'Satışı Gerçekleştiren'
    },
    {
        
        headerName:'Ürün Miktarı',
        cellRenderer:(params) => {
            // params.data.items dizisindeki her öğenin quantity özelliğini toplamak
            const totalQuantity = params.data.items.reduce((total, item) => total + item.quantity, 0);
    
            // Toplam miktarı döndür
            return totalQuantity;
        }
      },
     
     
    {
      field: 'salesDate',
      headerName:'Satış Tarihi',
      cellRenderer: (params) => {
        return moment(params.data.saleDate).format("DD-MM-YYYY")
      },
      filter: 'agDateColumnFilter'
    },
 
 
    
  ];

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      flex:1
    };
  }, []);

  return (
    <>
   <Grid hidden={!props.show}>
    <Box display="flex" justifyContent="flex-end" marginBottom={2}>
      <Button color="secondary" variant="contained" onClick={()=>props.setShow(false)}>Satış Ekranına Git</Button>
    </Box>
     
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={500}
        paginationPageSizeSelector={[200, 500, 1000]}
      />
    </div>
    
  </Grid>
 
  </>);
}

export default SalesList;