import React, { useState, useEffect, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';

const PurchaseBills = () => {
  const [refresh] = useState(null);
  const [rowData] = useState([]);

  const customerList = async () => {
    // Müşteri listesini çekmek için axios veya başka bir servis kullanabilirsiniz.
    // Örnek: const response = await axios.get(`https://localhost:44344/customer`);
    // setRowData(response.data);
  };

  useEffect(() => {
    customerList();
  }, [refresh]);

  const columnDefs = [
    {
      field: 'row',
      headerName: 'Sira',
      width: 120,
    },
    {
      field: 'billType',
      headerName: 'Fatura Turu',
    },
    {
      field: 'billNumber',
      headerName: 'Fatura Numarasi',
    },
    {
      field: 'company',
      headerName: 'Firma',
    },
    {
      field: 'waybillNumber',
      headerName: 'Irsaliye Numarasi',
    },
    {
      field: 'documentNumber',
      headerName: 'Belge Numarasi',
    },
    {
      field: 'forwardDate',
      headerName: 'Sevk Tarihi',
    },
    {
      field: 'paymentType',
      headerName: 'Odeme Tipi',
    },
    {
      field: 'sumProduct',
      headerName: 'Toplam Urun',
    },
    {
      field: 'sumAmount',
      headerName: 'Toplam Tutar',
    },{
      field: 'detail',
      headerName: 'Detay',
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    };  }, []);

  

  return (
    
    <div >
      <header style={{ backgroundColor: '#6610f2', color: '#fff', padding: '10px', textAlign: 'right', borderRadius: '10px' }}>
        <h4 style={{ float: 'left', marginRight: '20px' }}>Faturalar</h4>
        
        <button
          style={{ backgroundColor: '#2ecc71', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', margin: '10px', cursor: 'pointer' }}
        >
          Yeni Fatura Oluştur
        </button>
      </header>
      <div className="ag-theme-quartz" style={{ height: '250px', marginTop: '25px' }}>
        {/* Ag-Grid tablo component'ı */}
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={500}
          paginationPageSizeSelector={[200, 500, 1000]}
          domLayout='autoHeight'
          suppressHorizontalScroll={true}
          suppressVerticalScroll={true}
        />
      </div>
    </div>
    
  );
};

export default PurchaseBills;
