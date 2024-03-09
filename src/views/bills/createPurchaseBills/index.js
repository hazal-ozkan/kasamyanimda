import React, { useState, useEffect, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PurchaseBills = () => {
  const [refresh] = useState(null);
  const [rowData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  //const dateOptions = ['Seçili Tarih'];

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
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
      field: 'barcode',
      headerName: 'Barcode',
      width: 120,
    },
    {
      field: 'product',
      headerName: 'Urun',
    },
    {
      field: 'salePrice',
      headerName: 'Satis Fiyati',
    },
    {
      field: 'stock',
      headerName: 'Stok',
    },
    {
      field: 'amount',
      headerName: 'Miktar',
    },
    {
      field: 'unitPrice',
      headerName: 'Birim Fiyati',
    },
    {
      field: 'discount1',
      headerName: 'Iskonto 1',
    },
    {
      field: 'discount2',
      headerName: 'Iskonto 2',
    },
    {
      field: 'kdv',
      headerName: 'KDV',
    },
    {
      field: 'includeKdv',
      headerName: 'KDV Dahil',
    },{
      field: 'sum',
      headerName: 'Tutar',
    },
  
  ];

  const defaultColDef = useMemo(() => {
    return {
      //filter: 'agTextColumnFilter',
      floatingFilter: true,
    };
  }, []);

  const selectOptions = ['Alış Faturası', 'Satış Faturası', 'İade Faturalar'];
  const paymentOptions = ['Nakit', 'Kredi Kartı', 'Açık Hesap'];
  const accountOptions = ['Ana Hesap', 'Firmasız'];
  //const dateOptions = ['Seçili Tarih'];

  return (
    <div>
      <header style={{ backgroundColor: '#6610f2', color: '#fff', padding: '10px', textAlign: 'right', borderRadius: '10px' }}>
        <h4 style={{ float: 'left', marginRight: '20px' }}>Yeni Fatura Oluştur</h4>
        <button
          style={{ backgroundColor: '#2ecc71', color: '#fff', padding: '10px', border: 'none', borderRadius: '5px', margin: '10px', cursor: 'pointer' }}
        >
          Fatura Ekranına Geri Dön
        </button>
      </header>
      <div style={{ display: 'flex', marginTop: '20px', padding: '10px' }}>
        <div style={{ marginRight: '20px' }}>
          <label htmlFor="selectType">1. Fatura Türü</label>
          <select id="selectType" style={{ margin: '5px' }}>
            {selectOptions.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        </div>
        <div style={{ marginRight: '20px' }}>
          <label htmlFor="inputText">2. Input</label>
          <input id="inputText" type="text" style={{ margin: '5px' }} />
        </div>
        <div style={{ marginRight: '20px' }}>
         
          <div>
      {/* Diğer bileşenler ve tasarım */}
      <div style={{ marginBottom: '10px' }}>
        <label htmlFor="selectDate">3. Tarih</label>
        <DatePicker
          id="selectDate"
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
          isClearable
          placeholderText="Tarih Seçiniz"
          style={{ margin: '5px' }}
        />
      </div>
      {/* Diğer bileşenler ve tasarım */}
    </div>
        </div>
        <div style={{ marginRight: '20px' }}>
          <label htmlFor="selectPayment">4. Ödeme Tipi</label>
          <select id="selectPayment" style={{ margin: '5px' }}>
            {paymentOptions.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="selectAccount">5. Hesap</label>
          <select id="selectAccount" style={{ margin: '5px' }}>
            {accountOptions.map((option, index) => (
              <option key={index}>{option}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="ag-theme-quartz" style={{ height: '250px', marginTop: '25px', padding: '10px' }}>
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
          domLayout="autoHeight"
          suppressHorizontalScroll={true}
          suppressVerticalScroll={true}
        />
      </div>
    </div>
  );
};

export default PurchaseBills;
