import React, { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaymentsIcon from '@mui/icons-material/Payments';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Typography from '@mui/material/Typography';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import {  Col, Row } from 'react-bootstrap';
import moment from 'moment/moment';
import { Card, CardContent } from '@mui/material';
import OutGoingInsert from 'components/outgoing/outgoing-insert';
import axios from 'axios';

const Outgoing = () => {
  const [gelirToplam,setGelirToplam] = useState(0);
  const [nakit,setNakitToplam] = useState(0);
  const [pos,setPosToplam] = useState(0);
  const [show, setShow] = useState(false);
  const [rowData,setRowData] = useState([]);
  const [refresh, setRefresh] = useState(null);




  const outGoingList = async () => {
    try{
      const apiUrl = `http://72.167.148.55:35627/api/Financial/outGoing/list`;
        const response = await axios.get(apiUrl, {
          withCredentials: true,
            headers: {
             Accept:'*/*',
             'Content-Type': 'application/json'
            }
        })
        setRowData(response.data)
        setGelirToplam(response.data.reduce((total, item) => total + item.amount, 0))
        setNakitToplam(response.data.filter((item) => item.paymentType === "Nakit").reduce((total, item) => total + item.amount, 0))
        setPosToplam(response.data.filter((item) => item.paymentType === "Pos").reduce((total, item) => total + item.amount, 0))
      }catch(err){
      console.log(err)
    }
  };

  useEffect(() => {
    outGoingList();
  }, [refresh]);

  const columnDefs = [
    {
      field: 'type',
      headerName: 'Gider Türü',
    },
    {
      field: 'description',
      headerName: 'Gider Notu',
    },
    {
      field: 'amount',
      headerName: 'Tutar',
    },
    {
      field: 'paymentType',
      headerName: 'Ödeme Tipi',
    },
    {
      field: 'date',
      headerName: 'Gider Tarihi',
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
      flex: 1,
    };
  }, []);

  return (
    <div>
     
     <Row className='d-flex justify-content-between mb-3'>
     <Col>
     <Card>
        <CardContent className='d-flex justify-content-between'>
        <Typography variant="h4">
      Giderler Toplam: {gelirToplam}    
     
      </Typography>
      <AccountBalanceWalletIcon color='primary'/>
        </CardContent>
      </Card></Col>
      <Col>
     <Card>
        <CardContent  className='d-flex justify-content-between'>
        <Typography variant="h4">
          
       Nakit: {nakit}   
      </Typography>
      <PaymentsIcon color='primary'/>
        </CardContent>
      </Card></Col>
      <Col>
     <Card>
        <CardContent  className='d-flex justify-content-between'>
        <Typography variant="h4">
       Pos: {pos}
      </Typography>
      <CreditCardIcon color='primary'/>
        </CardContent>
      </Card></Col>
      </Row>
      
    
      
      {/* Burada müşteri listesini göstermek için kullanılan kısım */}
      <Row className='d-flex justify-content-between mb-3'>
      
     
     
<Col className=' d-flex justify-content-end'>
        <Button color="secondary" variant="contained" onClick={() => setShow(true)}>
          Yeni Gider Ekle
        </Button></Col>
        </Row>

      <div className="ag-theme-quartz" style={{ height: 580 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={false}
        />
      </div>
      <OutGoingInsert show={show} setShow={setShow} setRefresh={setRefresh} />
    </div>
  );
};

export default Outgoing;
