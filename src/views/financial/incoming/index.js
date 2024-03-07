import React, { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import CustomerInsert from 'components/customer/incoming-insert';

const Incoming = () => {
  const [gelirToplam, setGelirToplam] = useState(0);
  const [nakit, setNakit] = useState(0);
  const [pos, setPos] = useState(0);
  const [baslangicTarihi, setBaslangicTarihi] = useState('');
  const [bitisTarihi, setBitisTarihi] = useState('');
  const [gelirTuru, setGelirTuru] = useState('');
  const [gelirListesi, setGelirListesi] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);

 
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleYeniGelirEkle = () => {
    const yeniGelir = {
      miktar: parseInt(nakit),
      posMiktar: parseInt(pos),
      tarih: new Date().toLocaleDateString(),
      tur: gelirTuru,
    };

    // Yeni geliri ekleyerek toplam geliri güncelle
    setGelirListesi((prevList) => [...prevList, yeniGelir]);
    setGelirToplam((prevToplam) => prevToplam + yeniGelir.miktar + yeniGelir.posMiktar);

    // Popover'ı kapat
    handlePopoverClose();
  };

  const handleListele = () => {
    // Filtrelenmiş gelir listesini al
    const filtrelenmisListe = gelirListesi.filter(
      (gelir) =>
        gelir.tarih >= baslangicTarihi && gelir.tarih <= bitisTarihi && (!gelirTuru || gelir.tur === gelirTuru)
    );

    // Filtrelenmiş gelir listesini konsola yazdır
    console.log(filtrelenmisListe);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [show, setShow] = useState(false);
  const [rowData] = useState([]);
  const [refresh, setRefresh] = useState(null);

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
    },
    {
      field: 'type',
      headerName: 'Gelir Turu',
    },
    {
      field: 'incomingNote',
      headerName: 'Gelir Notu',
    },
    {
      field: 'amount',
      headerName: 'tutar',
    },
    {
      field: 'paymentType',
      headerName: 'Odeme Tipi',
    },
    {
      field: 'incomingDate',
      headerName: 'Gelir Tarihi',
    },{
        field: 'incomingHour',
        headerName: 'Saat',
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
      <Typography variant="h4">
        Gelirler Toplam: {gelirToplam} Nakit: {nakit} Pos: {pos}
      </Typography>

      <Box display="flex" marginTop={2}>
        <TextField
          label="Başlangıç Tarihi"
          type="date"
          value={baslangicTarihi}
          onChange={(e) => setBaslangicTarihi(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginRight: '10px' }}
        />

        <TextField
          label="Bitiş Tarihi"
          type="date"
          value={bitisTarihi}
          onChange={(e) => setBitisTarihi(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginRight: '10px' }}
        />

        <TextField
          label="Gelir Türü"
          value={gelirTuru}
          onChange={(e) => setGelirTuru(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" onClick={handleListele} style={{ marginLeft: '10px' }}>
          Listele
        </Button>
        
      </Box>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box p={2}>
          {/* Popover içeriği */}
          <Typography variant="h6">Yeni Gelir Girişi</Typography>

          <TextField
            label="Miktar (₺)"
            type="number"
            value={nakit}
            onChange={(e) => setNakit(e.target.value)}
            fullWidth
            margin="normal"
          />

          <TextField
            label="Pos Miktarı (₺)"
            type="number"
            value={pos}
            onChange={(e) => setPos(e.target.value)}
            fullWidth
            margin="normal"
          />

          <Button variant="contained" onClick={handleYeniGelirEkle}>
            Ekle
          </Button>
        </Box>
      </Popover>

      {/* Burada müşteri listesini göstermek için kullanılan kısım */}
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button color="secondary" variant="contained" onClick={() => setShow(true)}>
          Yeni Gelir Ekle
        </Button>
      </Box>

      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          suppressRowClickSelection={true}
          pagination={true}
          paginationPageSize={500}
          paginationPageSizeSelector={[200, 500, 1000]}
        />
      </div>
      <CustomerInsert show={show} setShow={setShow} setRefresh={setRefresh} />
    </div>
  );
};

export default Incoming;
