'use strict';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useEffect } from 'react';
import Select from 'react-select'
import { Row,Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Users = () => {
  const [open, setOpen] = useState(false);
  const [roleList,setRoleList] = useState([]);
  const [refresh,setRefresh] =useState(null);
  const [departmentList,setDepartmanList] = useState([]);
  const [newUserData, setNewUserData] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    role: '',
    email: '',
    phone: '',
    company: '',
    deparment: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const userList = async () => {
    
    try{
      const apiUrl = `https://localhost:44344/api/Auth/usersCase`;
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

  const handleInputChange = (field, value) => {
    setNewUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const getDepartman = async () => {
    try{
      const apiUrl = `https://localhost:44344/departments`;
        const response = await axios.get(apiUrl, {
          withCredentials: true,
            headers: {
             Accept:'*/*',
             'Content-Type': 'application/json'
            }
        })
        setDepartmanList(response.data.map(item => ({
          label: item.departmenName,
          value: item.id
        })))
    }catch(err){
      console.log(err)
    }
  }
 

  const handleConfirm = async () => {
    try {
      const apiUrl = `https://localhost:44344/api/Auth/userCase/register`;
       await axios.post(apiUrl,newUserData, {
          withCredentials: true,
          headers: {
              Accept: '*/*',
              'Content-Type': 'application/json'
          }
      })
      
      toast.success("Kullanıcı başarıyla kaydedildi")
      setTimeout(()=> {
          setRefresh(uuidv4())
          handleClose();
      },1000)
  } catch (err) {
      console.log(err)
  }
    
  };


  const getroleList = async () => {
    
    try{
      const apiUrl = `https://localhost:44344/roles`;
        const response = await axios.get(apiUrl, {
          withCredentials: true,
            headers: {
             Accept:'*/*',
             'Content-Type': 'application/json'
            }
        })
        setRoleList(response.data.map(item => ({
          label:item.roleName,
          value:item.id
        })))
    }catch(err){
      console.log(err)
    }
  }

useEffect(()=> {
getroleList()
userList()
getDepartman()
},[refresh])

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '600px', width: '100%' }), []);
  const [rowData, setRowData] = useState([])
  const [columnDefs] = useState([
    {
      field: 'name',
      headerName: 'Adı',
      
    },
    { field: 'surname', headerName: 'Soyadi' },
    { field: 'username', headerName: 'Kullanıcı Adı' },
    { field: 'password', headerName: 'Şifre' },
    { field: 'role', headerName: 'Rolu' },
    { field: 'email', headerName: 'Mail Adresi' },
    { field: 'phone', headerName: 'Telefon Numarası' },
    { field: 'company', headerName: 'Şirket' },
    { field: 'deparment', headerName: 'Departman' },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    };
  }, []);
  const rowClassRules = useMemo(() => {
    return {
      // apply red to Ford cars
      'rag-red': (params) => params.data.kullanciadi === 'Ford',
    };
  }, []);
  const paginationPageSizeSelector = useMemo(() => {
    return [200, 500, 1000];
  }, []);

  return (
    <div style={containerStyle}>
      <div>
        <Box display="flex" justifyContent="flex-end" marginBottom={2}>
          <Button
            disableElevation
            size="small"
            variant="contained"
            color="secondary"
            onClick={handleOpen}
          >
            Yeni kullanıcı ekle +
          </Button>
        </Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle fontSize={20}>Yeni Kullanıcı Ekle</DialogTitle>
         
          <DialogContent>
  <Row>
    <Col>
      <div className='p-2'>
        <TextField
          id="name"
          label="Adı"
          variant="outlined"
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </div>
    </Col>
    <Col>
      <div className='p-2'>
        <TextField
          id="surname"
          label="Soyadı"
          variant="outlined"
          onChange={(e) => handleInputChange('surname', e.target.value)}
        />
      </div>
    </Col>
  </Row>
  <Row>
    <Col>
      <div className='p-2'>
        <TextField
          id="username"
          label="Kullanıcı Adı"
          variant="outlined"
          onChange={(e) => handleInputChange('username', e.target.value)}
        />
      </div>
    </Col>
    <Col>
      <div className='p-2'>
        <TextField
          id="password"
          label="Şifre"
          variant="outlined"
          onChange={(e) => handleInputChange('password', e.target.value)}
        />
      </div>
    </Col>
  </Row>
  <Row>
    <Col>
      <div className='p-2'>
        <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Rol"
          isClearable
          isSearchable
          name="role"
          options={roleList}
          onChange={(selectedOption) => handleInputChange('role', selectedOption.label)}
          styles={{
            menu: provided => ({
                ...provided,
                zIndex: 9999, // İstediğiniz z-index değerini burada belirleyebilirsiniz
            }),
        }}
        />
      </div>
    </Col>
    <Col>
      <div className='p-2'>
        <TextField
          id="email"
          label="Mail Adresi"
          variant="outlined"
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
      </div>
    </Col>
  </Row>
  <Row>
    <Col>
      <div className='p-2'>
        <TextField
          id="phone"
          label="Telefon Numarası"
          variant="outlined"
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
      </div>
    </Col>
    <Col>
      <div className='p-2'>
        <TextField
          id="company"
          label="Şirket"
          variant="outlined"
          onChange={(e) => handleInputChange('company', e.target.value)}
        />
      </div>
    </Col>
  </Row>
  <Row>
    <Col>
      <div className='p-2'>
      <Select
          className="basic-single"
          classNamePrefix="select"
          placeholder="Departman"
          isClearable
          isSearchable
          name="deparment"
          options={departmentList}
          onChange={(selectedOption) => handleInputChange('deparment', selectedOption.label)}
         
        />
       
      </div>
    </Col>
  </Row>
</DialogContent>


          <DialogActions>
            <Button onClick={handleClose} color="primary">
              İptal
            </Button>
            <Button onClick={handleConfirm} color="primary">
              Kaydet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div
        style={gridStyle}
        className={
          "ag-theme-quartz"
        }
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowClassRules={rowClassRules}
          rowSelection="multiple"
          pagination={true}
          paginationPageSize={500}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};
export default Users