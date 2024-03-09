
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';

import VariantInsert from 'components/products/variant-insert';
import React, {  useMemo,useState} from 'react';
import { useEffect } from 'react';





const VariantList = () => {
  const [show,setShow] = useState(false)
  const [rowData,setRowData]=useState([])
  const [refresh,setRefresh] = useState(null)

  const variantList = async () => {
    
    try{
      const apiUrl = `https://localhost:44344/api/Product/variant/list`;
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
    variantList()
  },[refresh])
  const columnDefs = [
   
    {
      field: 'variantName',
      headerName:'Varyasyon Adı'
    },
    {
      field: 'description',
      headerName:'Açıklama'
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
   <Grid >
    <Box display="flex" justifyContent="flex-end" marginBottom={2}>
      <Button color="secondary" variant="contained" onClick={()=>setShow(true)}>Yeni Varyasyon Ekle </Button>
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
  <VariantInsert show={show} setShow={setShow} setRefresh={setRefresh}/></>);
}

export default  VariantList;
