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
import { Button } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';

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
          {amount} 
        </Typography>
      </CardContent>
      <CardActions sx={{marginTop:'-40px'}}>
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
                </div>
              )}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardActions>
    </Card>
  );
};

const YearlyReports = () => {
  const [refresh] = useState(null);
  const [rowData, setRowData] = useState([]);
  const [inComingData, setInComingData] = useState([]);
  const [outGoingData, setOutGoingData] = useState([]);
 
  const [cashIn, setCashIn] = useState(0);
  const [posIn, setPosIn] = useState(0);
  const [cashOut, setCashOut] = useState(0);
  const [posOut, setPosOut] = useState(0);

  const calculateTotalAmounts = (data) => {
    const amounts = data.map(entry => entry.amount);
    const cash = data.filter(item => item.paymentType === "Nakit").reduce((acc, item) => acc + item.amount, 0);
    const pos = data.filter(item => item.paymentType === "Pos").reduce((acc, item) => acc + item.amount, 0);
    
    return { totalAmount: amounts.reduce((acc, amount) => acc + amount, 0), cash, pos };
  };

  const fetchData = async () => {
    try {
      const salesApiUrl = `http://72.167.148.55:35627/api/Product/sales/list`;
      const inComingApiUrl = `http://72.167.148.55:35627/api/Financial/inComing/list`;
      const outGoingApiUrl = `http://72.167.148.55:35627/api/Financial/outGoing/list`;

      const [salesResponse, inComingResponse, outGoingResponse] = await Promise.all([
        axios.get(salesApiUrl, { withCredentials: true, headers: { Accept: '*/*', 'Content-Type': 'application/json' } }),
        axios.get(inComingApiUrl, { withCredentials: true, headers: { Accept: '*/*', 'Content-Type': 'application/json' } }),
        axios.get(outGoingApiUrl, { withCredentials: true, headers: { Accept: '*/*', 'Content-Type': 'application/json' } })
      ]);

      // Bu yıl içindeki satışları filtrele
      const currentYear = new Date().getFullYear();
      const filteredSalesData = salesResponse.data.filter(item => {
        const itemDate = new Date(item.saleDate);
        return itemDate.getFullYear() === currentYear;
      });

      const filteredInComingData = inComingResponse.data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() === currentYear;
      });

      const filteredOutGoingData = outGoingResponse.data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate.getFullYear() === currentYear;
      });

      setRowData(filteredSalesData);

      const inComingTotals = calculateTotalAmounts(filteredInComingData);
      setCashIn(inComingTotals.cash);
      setPosIn(inComingTotals.pos);
      setInComingData({
        title: 'Gelirler',
        amount: inComingTotals.totalAmount,
        details: {
          line1: `Nakit Gelir: ${inComingTotals.cash} TL`,
          line2: `Pos Gelir: ${inComingTotals.pos} TL`,
        }
      });

      const outGoingTotals = calculateTotalAmounts(filteredOutGoingData);
      setCashOut(outGoingTotals.cash);
      setPosOut(outGoingTotals.pos);
      setOutGoingData({
        title: 'Giderler',
        amount: outGoingTotals.totalAmount,
        details: {
          line1: `Nakit Gider: ${outGoingTotals.cash} TL`,
          line2: `Pos Gider: ${outGoingTotals.pos} TL`,
        }
      });

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresh]);

  const columnDefs = [
    {
      field: 'tenant',
      headerName: 'Departman',
      width: 120,
    },
    {
      field: 'id',
      headerName: 'Satış Kodu',
    },
    {
      field: 'totalProduct',
      headerName: 'Toplam Ürün',
      cellRenderer: params => {
        // params.data.items dizisindeki her objenin quantity'sini topla
        const totalQuantity = params.data.items.reduce((acc, item) => acc + item.quantity, 0);

        // Toplam değeri döndür
        return <span>{totalQuantity}</span>;
      },
    },
    {
      field: 'totalPrice',
      headerName: 'Toplam Tutar',
    },
    {
      field: 'discount',
      headerName: 'İskonto',
    },
    {
      field: 'paymentType',
      headerName: 'Ödeme Tipi',
      cellRenderer: params => {
        if (params.data.cash > 0) {
          return 'Nakit';
        } else if (params.data.pos > 0) {
          return 'Pos';
        }
      },
    },
    {
      field: 'employeeName',
      headerName: 'Personel',
    },
  ];

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    };
  }, []);

  const cardContents = [
    {
      title: 'Nakit',
      amount: (cashIn - cashOut) + " TL",
      details: {
        line1: `Nakit Gelir: ${cashIn} TL`,
        line2: `Nakit Gider: ${cashOut} TL`,
      },
    },
    {
      title: 'Pos',
      amount: (posIn - posOut) + " TL",
      details: {
        line1: `Pos Gelir: ${posIn} TL`,
        line2: `Pos Gider: ${posOut} TL`,
      },
    },
    inComingData,
    outGoingData,
    {
      title: 'Ciro',
      amount: (inComingData.amount - outGoingData.amount) + " TL",
      details: {
        line1: `Gelirler: ${inComingData.amount} TL`,
        line2: `Giderler: ${outGoingData.amount} TL`,
      },
    },
    {
      title: 'Kasa Açılış/Kapanış',
      amount: '',
      details: {
        line1: `Kasa Açılış: 0 TL`,
        line2: `Kasa Kapanış: 0 TL`,
      },
    },
  ];

  return (
    <div>
      <Row className="custom-row-report p-3">
        <Col>
          <h5>Yıllık Rapor</h5>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button color="warning" sx={{ color: '#fff' }} variant="contained">
            {' '}
            Yazdır{' '}
          </Button>
        </Col>
      </Row>

      <div className="ag-theme-quartz" style={{ height: '200px', marginTop: '25px' }}>
        {/* Ag-Grid tablo component'ı */}
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={5}
          paginationPageSizeSelector={5}
          domLayout="autoHeight"
          suppressHorizontalScroll={true}
          suppressVerticalScroll={true}
        />
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '200px', marginLeft: '20px', marginRight: '20px' }}>
        {cardContents.map((card, index) => (
          <CustomCard key={index} title={card.title} amount={card.amount} details={card.details} />
        ))}
      </div>
    </div>
  );
};

export default YearlyReports;
