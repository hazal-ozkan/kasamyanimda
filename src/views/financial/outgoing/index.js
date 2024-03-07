import React, { useState, useEffect, useMemo } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import CustomerInsert from 'components/outgoing/outgoing-insert';
import Select from 'react-select';

const Outgoing = () => {
  const giderTuruOptions = [
    { value: 'pos', label: 'POS' },
    { value: 'nakit', label: 'Nakit' },
    { value: 'diger', label: 'Diğer' },
    // İhtiyaca göre seçenekleri ekleyebilirsiniz.
  ];
  const [giderToplam, setGiderToplam] = useState(0);
  const [nakit, setNakit] = useState(0);
  const [pos, setPos] = useState(0);
  const [baslangicTarihi, setBaslangicTarihi] = useState('');
  const [bitisTarihi, setBitisTarihi] = useState('');
  const [giderTuru, setGiderTuru] = useState(null);
  const [giderListesi, setGiderListesi] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleYeniGiderEkle = () => {
    if (giderTuru) {
      const yeniGider = {
        miktar: parseInt(nakit),
        posMiktar: parseInt(pos),
        tarih: new Date().toLocaleDateString(),
        tur: giderTuru.value, // Seçilen gider türünün değerini kullanın
      };

      // Yeni gider ekleyerek toplam gider güncelle
      setGiderListesi((prevList) => [...prevList, yeniGider]);
      setGiderToplam((prevToplam) => prevToplam + yeniGider.miktar + yeniGider.posMiktar);

      // Popover'ı kapat
      handlePopoverClose();
    } else {
      // Kullanıcı bir gider türü seçmemişse uyarı verebilirsiniz.
      console.warn('Lütfen bir gider türü seçin.');
    }
  };

  const handleListele = () => {
    // Filtrelenmiş gider listesini al
    const filtrelenmisListe = giderListesi.filter(
      (gider) =>
      gider.tarih >= baslangicTarihi && gider.tarih <= bitisTarihi && (!gider || gider.tur === gider)
    );

    // Filtrelenmiş gider listesini konsola yazdır
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
      headerName: 'Gider Turu',
    },
    {
      field: 'incomingNote',
      headerName: 'Gider Notu',
    },
    {
      field: 'amount',
      headerName: 'Tutar',
    },
    {
      field: 'paymentType',
      headerName: 'Odeme Tipi',
    },
    {
      field: 'incomingDate',
      headerName: 'Gider Tarihi',
    },
    {
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
      Gider Toplam: {giderToplam} Nakit: {nakit} Pos: {pos}
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

        <Select
          options={giderTuruOptions}
          value={giderTuru}
          onChange={(selectedOption) => setGiderTuru(selectedOption)}
          placeholder="Gider Türü Seçin"
        />

<Button
  variant="contained"
  onClick={handleListele}
  style={{ marginLeft: '10px', marginBottom: '2px', padding: '2px 10px'  }}
>
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
          <Typography variant="h6">Yeni Gider Girişi</Typography>

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

          <Button variant="contained" onClick={handleYeniGiderEkle}>
            Ekle
          </Button>
        </Box>
      </Popover>

      {/* Burada müşteri listesini göstermek için kullanılan kısım */}
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button color="secondary" variant="contained" onClick={() => setShow(true)}>
          Yeni Gider Ekle
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

export default Outgoing;
