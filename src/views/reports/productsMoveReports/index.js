import React, { useState, useEffect, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { Col, Row } from 'react-bootstrap';
import { Button } from '@mui/material';
import axios from 'axios';
import moment from 'moment';

const ProductsMoveReports = () => {
  const [refresh] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [stockExit, setStockExit] = useState([]);
  const [stockEntry, setStockEntry] = useState([]);

  const stockExistList = async () => {
    try {
      const apiUrl = `https://localhost:44344/api/Product/stockExist/list`;
      const response = await axios.get(apiUrl, {
        withCredentials: true,
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      setStockExit(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const stockEntryList = async () => {
    try {
      const apiUrl = `https://localhost:44344/api/Product/stockEntry/list`;
      const response = await axios.get(apiUrl, {
        withCredentials: true,
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      setStockEntry(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    stockExistList();
    stockEntryList();
  }, [refresh]);

  useEffect(() => {
    // stockEntry ve stockExit listelerini birleştirerek rowData oluştur
    const mergedData = [...stockEntry, ...stockExit].map(item => {
      return {
        ...item,
        movementType: Object.prototype.hasOwnProperty.call(item, 'exitReason') ? 'Çıkış' : 'Giriş'
      };
    });
    setRowData(mergedData);
  }, [stockEntry, stockExit]);

  const columnDefs = [
    {
      field: 'productName',
      headerName: 'Ürün Adı'
    },
    {
      field: 'barcode',
      headerName: 'Barkod'
    },
    {
      field: 'quantity',
      headerName: 'Miktar'
    },
    {
      field: 'movementType',
      headerName: 'Hareket Türü'
    },
    {
      field: 'date',
      headerName: 'Tarih',
      cellRenderer: (params) => {
        return moment(params.data.date).format('DD-MM-YYYY');
      },
      filter: 'agDateColumnFilter'
    }
  ];

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      flex: 1
    };
  }, []);

  return (
    <div>
      <Row className="custom-row-report p-3">
        <Col>
          <h5>Ürün Hareketleri Raporu</h5>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button color="warning" sx={{ color: '#fff' }} variant="contained">
            {' '}
            Yazdır{' '}
          </Button>
        </Col>
      </Row>

      <div className="ag-theme-quartz" style={{ height: '400px', marginTop: '25px' }}>
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
          domLayout="autoHeight"
          suppressHorizontalScroll={true}
          suppressVerticalScroll={true}
        />
      </div>
    </div>
  );
};

export default ProductsMoveReports;
