
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import CustomerInsert from 'components/customer/customer-insert';
import React, {  useMemo,useState} from 'react';
import { useEffect } from 'react';





const Customers = () => {
  const [show,setShow] = useState(false)
  const [rowData,setRowData]=useState([])
  const [refresh,setRefresh] = useState(null)

  const customerList = async () => {
    
    try{
      const apiUrl = `https://localhost:44344/customer`;
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
    customerList()
  },[refresh])
  const columnDefs = [
    {
      field: 'customerName',
      headerName:'Müşteri'
    },
    {
      field: 'email',
      headerName:'Mail Adresi'
    },
    {
      field: 'phone',
      headerName:'Telefon Numarası'
    },
    {
      field: 'address',
      headerName:'Adresi'
    },
    {
      field: 'tax',
      headerName:'Vergi Dairesi'
    },
    {
      field: 'taxNo',
      headerName:'Vergi Numarası'
    },
    
  ];

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    };
  }, []);

  return (
   <Grid>
    <Box display="flex" justifyContent="flex-end" marginBottom={2}>
      <Button color="secondary" variant="contained" onClick={()=>setShow(true)}>Yeni Müşteri Ekle </Button>
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
    <CustomerInsert show={show} setShow={setShow} setRefresh={setRefresh}/>
  </Grid>);
}

export default  Customers;