import React, { useState, useEffect, useMemo } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const cardContents = [
  {
    title: 'Kart 1 Başlık',
    amount: '100.00',
    details: {
      line1: 'Nakit satış: 114.00 TL',
      line2: 'Parçalı nakit satış: 0.00 TL',
      line3: 'Kasa açılış: 0.00 TL (Toplama dahil değildir)',
      line4: 'Nakit iade: 0.00 TL (Toplama dahil değildir)',
    },
  },
  {
    title: 'Kart 2 Başlık',
    amount: '200.00',
    details: {
      line1: 'Nakit satış: 150.00 TL',
      line2: 'Kredi kartı satış: 50.00 TL',
      line3: 'Kasa açılış: 0.00 TL (Toplama dahil değildir)',
      line4: 'Nakit iade: 20.00 TL (Toplama dahil değildir)',
    },
  },
  {
    title: 'Kart 3 Başlık',
    amount: '400.00',
    details: {
      line1: 'Nakit satış: 1500.00 TL',
      line2: 'Kredi kartı satış: 50.00 TL',
      line3: 'Kasa açılış: 0.00 TL (Toplama dahil değildir)',
      line4: 'Nakit iade: 20.00 TL (Toplama dahil değildir)',
    },
  },
  {
    title: 'Kart 4 Başlık',
    amount: '200.00',
    details: {
      line1: 'Nakit satış: 150.00 TL',
      line2: 'Kredi kartı satış: 50.00 TL',
      line3: 'Kasa açılış: 0.00 TL (Toplama dahil değildir)',
      line4: 'Nakit iade: 20.00 TL (Toplama dahil değildir)',
    },
  },
  {
    title: 'Kart 5 Başlık',
    amount: '200.00',
    details: {
      line1: 'Nakit satış: 150.00 TL',
      line2: 'Kredi kartı satış: 50.00 TL',
      line3: 'Kasa açılış: 0.00 TL (Toplama dahil değildir)',
      line4: 'Nakit iade: 20.00 TL (Toplama dahil değildir)',
    },
  },
  {
    title: 'Kart 6 Başlık',
    amount: '200.00',
    details: {
      line1: 'Nakit satış: 150.00 TL',
      line2: 'Kredi kartı satış: 50.00 TL',
      line3: 'Kasa açılış: 0.00 TL (Toplama dahil değildir)',
      line4: 'Nakit iade: 20.00 TL (Toplama dahil değildir)',
    },
  },
  {
    title: 'Kart 7 Başlık',
    amount: '200.00',
    details: {
      line1: 'Nakit satış: 150.00 TL',
      line2: 'Kredi kartı satış: 50.00 TL',
      line3: 'Kasa açılış: 0.00 TL (Toplama dahil değildir)',
      line4: 'Nakit iade: 20.00 TL (Toplama dahil değildir)',
    },
  },
  {
    title: 'Kart 8 Başlık',
    amount: '200.00',
    details: {
      line1: 'Nakit satış: 150.00 TL',
      line2: 'Kredi kartı satış: 50.00 TL',
      line3: 'Kasa açılış: 0.00 TL (Toplama dahil değildir)',
      line4: 'Nakit iade: 20.00 TL (Toplama dahil değildir)',
    },
  },
  {
    title: 'Kart 9 Başlık',
    amount: '200.00',
    details: {
      line1: 'Nakit satış: 150.00 TL',
      line2: 'Kredi kartı satış: 50.00 TL',
      line3: 'Kasa açılış: 0.00 TL (Toplama dahil değildir)',
      line4: 'Nakit iade: 20.00 TL (Toplama dahil değildir)',
    },
  },
  {
    title: 'Kart 10 Başlık',
    amount: '200.00',
    details: {
      line1: 'Nakit satış: 150.00 TL',
      line2: 'Kredi kartı satış: 50.00 TL',
      line3: 'Kasa açılış: 0.00 TL (Toplama dahil değildir)',
      line4: 'Nakit iade: 20.00 TL (Toplama dahil değildir)',
    },
  },
  {
    title: 'Kart 11 Başlık',
    amount: '200.00',
    details: {
      line1: 'Nakit satış: 150.00 TL',
      line2: 'Kredi kartı satış: 50.00 TL',
      line3: 'Kasa açılış: 0.00 TL (Toplama dahil değildir)',
      line4: 'Nakit iade: 20.00 TL (Toplama dahil değildir)',
    },
  },
  {
    title: 'Kart 12 Başlık',
    amount: '200.00',
    details: {
      line1: 'Nakit satış: 150.00 TL',
      line2: 'Kredi kartı satış: 50.00 TL',
      line3: 'Kasa açılış: 0.00 TL (Toplama dahil değildir)',
      line4: 'Nakit iade: 20.00 TL (Toplama dahil değildir)',
    },
  },
  // Diğer kartlar
];

const CustomCard = ({ title, amount, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDetailClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card sx={{ minWidth: 275, height: isExpanded ? 'auto' : '100%', marginBottom: '20px', flexBasis: 'calc(33.33% - 20px)' }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {amount} TL
        </Typography>
      </CardContent>
      <CardActions>
        <Accordion expanded={isExpanded} onChange={handleDetailClick}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography>{isExpanded ? 'Kapat' : 'Detay'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {details && (
                <div>
                  <p>{details.line1}</p>
                  <p>{details.line2}</p>
                  <p>{details.line3}</p>
                  <p>{details.line4}</p>
                </div>
              )}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardActions>
    </Card>
  );
};

const MountlyReports = () => {
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
      field: 'branch',
      headerName: 'Sube',
      width: 120,
    },
    {
      field: 'satusCode',
      headerName: 'Satus Kodu',
    },
    {
      field: 'totalProduct',
      headerName: 'toplam urun',
    },
    {
      field: 'totalAmount',
      headerName: 'Toplam Tutar',
    },
    {
      field: 'Discount',
      headerName: 'Iskonto',
    },
    {
      field: 'paymentType',
      headerName: 'Odeme Tipi',
    },
    {
      field: 'date',
      headerName: 'Tarih',
    },
    {
      field: 'personel',
      headerName: 'Personel',
    },
    {
      field: 'app',
      headerName: 'Uygulama',
    },
    {
      field: 'salesNote',
      headerName: 'Satis Notu',
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
        <h4 style={{ float: 'left', marginRight: '20px' }}>Aylik Rapor</h4>
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

      <div className="ag-theme-quartz" style={{ height: '200px', marginTop: '25px' }}>
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '150px', marginLeft: '20px', marginRight: '20px' }}>
        {cardContents.map((card, index) => (
          <CustomCard key={index} title={card.title} amount={card.amount} details={card.details} />
        ))}
      </div>
    </div>
  );
};

export default MountlyReports;
