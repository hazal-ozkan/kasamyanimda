
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import ProductEntryInsert from 'components/products/product-entry-insert';


import moment from 'moment';
import React, {  useMemo,useState} from 'react';
import { useEffect } from 'react';





const ProductRegistration = () => {
  const [show,setShow] = useState(false)
  const [rowData,setRowData]=useState([])
  const [refresh,setRefresh] = useState(null)

  const stockEntryList = async () => {
    
    try{
      const apiUrl = `http://72.167.148.55:35627/api/Product/stockEntry/list`;
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
  },[refresh])
  const columnDefs = [
    {
      field: 'productName',
      headerName:'Ürün Adı'
    },
    {
      field: 'barcode',
      headerName:'Barkod'
    },
 
    {
      field: 'quantity',
      headerName:'Giriş Miktarı'
    },
 
    {
      field: 'entryReason',
      headerName:'Giriş Nedeni'
    },
 
    {
      field: 'date',
      headerName:'Giriş Tarihi',
      cellRenderer: (params) => {
        return moment(params.data.date).format("DD-MM-YYYY")
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
   <Grid hidden={show}>
    <Box display="flex" justifyContent="flex-end" marginBottom={2}>
      <Button color="secondary" variant="contained" onClick={()=>setShow(true)}>Yeni Giriş Gerçekleştir </Button>
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
  <ProductEntryInsert show={show} setShow={setShow} setRefresh={setRefresh}/>
  </>);
}

export default ProductRegistration;