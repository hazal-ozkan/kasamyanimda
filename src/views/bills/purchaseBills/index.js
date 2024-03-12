import React, { useState, useEffect, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { Col, Row } from 'react-bootstrap';
import { Button } from '@mui/material';
import BillInsert from 'components/financial/bill-insert';
import axios from 'axios';

const PurchaseBills = () => {
  const [refresh,setRefresh] = useState(null);
  const [rowData,setRowData] = useState([]);
  const [show,setShow] = useState(false)

  const billList = async () => {
    try{
      const apiUrl = `https://localhost:44344/api/Financial/bill/list`;
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
  };

  useEffect(() => {
    billList();
  }, [refresh]);

  const columnDefs = [
   
    {
      field: 'invoiceNumber',
      headerName: 'Fatura Numarası',
    },
    {
      field: 'invoiceType',
      headerName: 'Fatura Türü',
    },
    
    {
      field: 'company',
      headerName: 'Firma',
    },
    {
      field: 'date',
      headerName: 'Oluşturulma Tarihi',
    },
    {
      field: 'paymentType',
      headerName: 'Ödeme Tipi',
    },
    {
      headerName: 'Toplam Ürün',
      cellRenderer: (params) => {
        const totalQuantity = params.data?.products.reduce((acc, product) => acc + product.quantity, 0);
        return totalQuantity;
      }
    },
    
    {
      headerName: 'Toplam Tutar',
      cellRenderer: (params) => {
        const totalPrice = params.data?.products.reduce((acc, product) => acc + product.totalPrice, 0);
        return totalPrice;
      }
    }
  ];

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    };  }, []);

  

  return (
    <>
    <div hidden={show}>
      <Row>
        <Col className='d-flex justify-content-end'>
            <Button color="secondary" variant="contained" onClick={()=>  setShow(true)}>Yeni Fatura Oluştur</Button>
        </Col>
      </Row>
      <div className="ag-theme-quartz" style={{ height: '250px', marginTop: '25px' }}>
        {/* Ag-Grid tablo component'ı */}
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={50}
          paginationPageSizeSelector={50}
          domLayout='autoHeight'
          suppressHorizontalScroll={true}
          suppressVerticalScroll={true}
        />
      </div>
    </div>
    <BillInsert show={show} setShow={setShow} setRefresh={setRefresh}/>
    </>
  );
};

export default PurchaseBills;
