
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import ProductInsert from 'components/products/product-insert';
import React, {  useMemo,useState} from 'react';
import { useEffect } from 'react';





const ProductList = () => {
  const [show,setShow] = useState(false)
  const [rowData,setRowData]=useState([])
  const [refresh,setRefresh] = useState(null)

  const productList = async () => {
    
    try{
      const apiUrl = `https://localhost:44344/api/Product/product/list`;
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
    productList()
  },[refresh])
  const columnDefs = [
    {
      field: 'picture',
      headerName:'Resim'
    },
    {
      field: 'barcode',
      headerName:'Barkod'
    },
    {
      field: 'productName',
      headerName:'Ürün Adı'
    },
    {
      field: 'salesPrice',
      headerName:'Satış Fiyatı'
    },
    {
      field: 'stock',
      headerName:'Stok'
    },
    {
      field: 'criticalStock',
      headerName:'Kritik Stok'
    },
    
  ];

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    };
  }, []);

  return (
    <>
   <Grid hidden={show}>
    <Box display="flex" justifyContent="flex-end" marginBottom={2}>
      <Button color="secondary" variant="contained" onClick={()=>setShow(true)}>Yeni Ürün Ekle </Button>
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
  <ProductInsert show={show} setShow={setShow} setRefresh={setRefresh}/></>);
}

export default  ProductList;