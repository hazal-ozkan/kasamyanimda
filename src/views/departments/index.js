import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import DepartmentInsert from 'components/company/department-insert';

import React, {  useMemo,useState} from 'react';
import { useEffect } from 'react';

const Departments = () => {
  const [show,setShow] = useState(false)
  const [rowData,setRowData]=useState([])
  const [refresh,setRefresh] = useState(null)

  const departmentList = async () => {
    
    try{
      const apiUrl = `https://localhost:44344/departments`;
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
    departmentList()
  },[refresh])
  const columnDefs = [
    {
      field: 'departmenName',
      headerName:'Departman Adı'
    },
    {
      field: 'bossName',
      headerName:'Müdür Adı'
    },
    {
      field: 'bossPhone',
      headerName:'Müdür Telefon Numarası'
    },
    {
      field: 'bossMail',
      headerName:'Müdür Mail Adresi'
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
   <Grid>
    <Box display="flex" justifyContent="flex-end" marginBottom={2}>
      <Button color="secondary" variant="contained" onClick={()=>setShow(true)}>Yeni Departman Ekle </Button>
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
    <DepartmentInsert show={show} setShow={setShow} setRefresh={setRefresh}/>
  </Grid>); 
}

export default Departments;  