
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import TypesInsert from 'components/financial/types-insert';
import React, {  useMemo,useState} from 'react';
import { useEffect } from 'react';





const Types = () => {
  const [show,setShow] = useState(false)
  const [rowData,setRowData]=useState([])
  const [refresh,setRefresh] = useState(null)

  const customerList = async () => {
    
    try{
      const apiUrl = `http://72.167.148.55:35627/api/Financial/type/list`;
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
      field: 'typeName',
      headerName:'Tür Adı'
    },
    {
      field: 'type',
      headerName:'Gelir/Gider',
      cellRenderer: (params) => {
        if(params.data.type === "1"){
          return "Gelir"
        }
        if(params.data.type === "0"){
          return "Gider"
        }
      }
    }
   
    
  ];

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      flex:1
    };
  }, []);

  return (
   <Grid>
    <Box display="flex" justifyContent="flex-end" marginBottom={2}>
      <Button color="secondary" variant="contained" onClick={()=>setShow(true)}>Yeni Tür Ekle </Button>
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
    <TypesInsert show={show} setShow={setShow} setRefresh={setRefresh}/>
  </Grid>);
}

export default  Types;