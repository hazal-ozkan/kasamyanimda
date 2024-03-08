import React, { useState, useEffect, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';

const ProductsMoveReports = () => {
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
      field: 'type',
      headerName: 'Tur',
    },
    {
      field: 'product',
      headerName: 'Urun',
    },
    {
      field: 'processNumber',
      headerName: 'Islem Numarasi',
    },
    {
      field: 'note',
      headerName: 'Note',
    },
    {
      field: 'Date',
      headerName: 'Tarih',
    },
    {
      field: 'customer',
      headerName: 'Musteri',
    },
    {
      field: 'paymentType',
      headerName: 'Odeme Tipi',
    },
    {
      field: 'amount',
      headerName: 'Miktar',
    },
    {
      field: 'remainder',
      headerName: 'Kalan',
    },{
      field: 'unitPrice',
      headerName: 'Birim Fiyati',
    },{
      field: 'sum',
      headerName: 'Tutar',
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    };
  }, []);

  return (
    <div>
      <header style={{ backgroundColor: '#6610f2', color: '#fff', padding: '10px', textAlign: 'right', borderRadius: '10px' }}>
        <h4 style={{ float: 'left', marginRight: '20px' }}>Urun Hareket Raporu</h4>
        <button
          style={{ backgroundColor: '#2ecc71', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', margin: '10px', cursor: 'pointer' }}
        >
          Yazdır
        </button>
        <button
          style={{ backgroundColor: '#2ecc71', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', margin: '10px', cursor: 'pointer' }}
        >
          Karı Göster
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

export default ProductsMoveReports;
