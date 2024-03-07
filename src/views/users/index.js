'use strict';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo, useState } from 'react';
//import { createRoot } from 'react-dom/client';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const Users = () => {
  const [open, setOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    kullanciadi: '',
    soyadi: '',
    kullaniciAdi: '',
    rol: '',
    email: '',
    telNo: '',
    departman: '',
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (field, value) => {
    setNewUserData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleConfirm = () => {
    console.log(newUserData);

    // Yeni kullanıcı eklemek için burada gerekli işlemleri yapabilirsiniz
    // Kullanıcı bilgilerine newUserData üzerinden erişebilirsiniz
    // ...
    // İşlem tamamlandıktan sonra modalı kapatın
    handleClose();
  };

  

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData] = useState([
    { kullanciadi: 'Yunus', soyadi: 'kirbas',kullaniciAdi: 'y.kirbas', rol: 'CASHIER',  email: 'yunuskirbas26@hotmail.com',telNo: 6094531508,departman: 64950  },
    { kullanciadi: 'Hazal', soyadi: 'Ozkan',kullaniciAdi: 'h.ozkan', rol: 'CASHIER',  email: 'yunuskirbas26@hotmail.com',telNo: 654654165, departman: 33850 },
    { kullanciadi: 'Yildiray', soyadi: 'Erdem',kullaniciAdi: 'y.erdem', rol: 'CASHIER',  email: 'yunuskirbas26@hotmail.com',telNo: 6546546544, departman: 29600 },
    
  
]);
const [columnDefs] = useState([
  {
    field: 'kullanciadi',
    headerName: 'Adi',
    checkboxSelection: true,
  },
  { field: 'soyadi' , headerName: 'Soyadi'},
  { field: 'kullaniciAdi' , headerName: 'Kullanici Adi'},
  { field: 'rol' , headerName: 'Rolu'},
  { field: 'email' , headerName: 'Email'},
  { field: 'telNo' , headerName: 'Telefon Numarasi'},
  { field: 'departman' , headerName: 'Departmani'},  
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
        <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
        <TextField
  label="Adı"
  variant="outlined"
  size="small"
  style={{ width: '100px', marginRight: '10px' }}
  value={newUserData.kullanciadi}
  onChange={(e) => setNewUserData({ ...newUserData, kullanciadi: e.target.value })}
/>
        <DialogContent>
          {columnDefs.map((column) => (
            
            <TextField
              key={column.field}
              margin="dense"
              id={column.field}
              label={column.headerName}
              type="text"
              style={{ width: '250px', marginRight: '20px' }}

              onChange={(e) => handleInputChange(column.field, e.target.value)}
            />
          ))}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            İptal
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Onayla
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

export default Users;