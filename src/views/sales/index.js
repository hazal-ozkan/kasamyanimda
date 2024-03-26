import { Button, Chip, TextField, Tooltip } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import soundPath from '../../assets/stop-13692.mp3';
import { Howl } from 'howler';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Select from 'react-select';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { v4 as uuidv4 } from 'uuid';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PercentIcon from '@mui/icons-material/Percent';
import { toast } from 'react-toastify';
import CustomerInsert from 'components/customer/customer-insert';
import SectionalSale from 'components/sales/sectional-sale';
import SalesList from 'components/sales/sales-list';
import ReturnSale from 'components/sales/return-sale';
const Sales = () => {
  const [sound, setSound] = useState(null);
  const [inputChange, setInputChange] = useState(false)
  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState(null)
  const [productList, setProductList] = useState([])
  const [payment, setPayment] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [changePrice, setChangePrice] = useState(0)
  const [barcode, setBarcode] = useState('');
  const [iskonto, setIskonto] = useState(0);
  const [employeeId, setEmployeeId] = useState('')
  const [employeeName, setEmployeeName] = useState('')
  const [viewProduct, setViewProduct] = useState([])
const [show,setShow] = useState(false)
const [refresh,setRefresh] = useState(null)
const [sectionalShow,setSectionalShow] = useState(false)
const [salesListShow,setSalesListShow] = useState(false)
const [returnShow,setReturnShow] = useState(false)

  useEffect(() => {
    setSound(new Howl({
      src: [soundPath],
    }));
  }, []);

  const playSound = () => {
    sound.play();
  };


  const maxLength = 30;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setEmployeeId(parseJwt(token).sub);
      setEmployeeName(parseJwt(token).unique_name)
    }
  }, [localStorage.getItem('token')]);


  const handleSave = async (type) => {
    try {
     
      const updatedSaleData = {
        customerId: customer?.value,
        customerName: customer?.label,
        employeeName:employeeName,
        employeeId: employeeId,
        totalPrice: totalPrice,
        saleDate: new Date().toISOString().split('T')[0],
        cash:0,
        pos:0,
        items: productList,
        discount: iskonto,
        tenant:'KasamYanimda'
      } 

      if(type === 'Nakit'){
        updatedSaleData.cash = totalPrice;
      }else if(type === 'Pos'){
        updatedSaleData.pos = totalPrice;
      }else{
        updatedSaleData.cash = type.cash;
        updatedSaleData.pos = type.pos;
      }
     

      const apiUrl = `http://72.167.148.55:35627/api/Product/saleProduct`;
      await axios.post(apiUrl, updatedSaleData, {
        withCredentials: true,
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });

      toast.success("Satış başarıyla kaydedildi");
      setTimeout(() => {
        resetValues();
        setRefresh(uuidv4())
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const resetValues = () => {

    setProductList([])
    setPayment(0)
    setTotalPrice(0)
    setChangePrice(0)
    setCustomer({label:null,value:null})
    setEmployeeId('')
    setIskonto(0)
    setBarcode('')

  }


  const getProduct = async () => {
    try {
      const apiUrl = `http://72.167.148.55:35627/api/Product/product/list`;
      const response = await axios.get(apiUrl, {
        withCredentials: true,
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      const product = response.data.filter(item => item.view === 'visible')

      setViewProduct(product);


    } catch (err) {
      console.log(err);
    }

  }

  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));

    const parsedData = JSON.parse(jsonPayload);

    // Rol bilgisini "http://schemas.microsoft.com/ws/2008/06/identity/claims/role" anahtarı üzerinden çıkart
    const role = parsedData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    // Yeni bir nesne oluşturup rol bilgisini ekleyerek döndür
    return { ...parsedData, role };
  }

  const getProductByBarcode = async (barcode) => {
    try {
      const apiUrl = `http://72.167.148.55:35627/api/Product/GetProductByBarcode?barcode=${barcode}`;
      const response = await axios.get(apiUrl, {
        withCredentials: true,
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      const existingProductIndex = productList.findIndex(item => item.barcode === barcode);

      if (existingProductIndex !== -1) {
        // Eğer aynı barkodlu ürün zaten listede varsa, miktarını artır
        const updatedList = [...productList];
        updatedList[existingProductIndex].quantity += 1;
  
        setProductList(updatedList);
      } else {
        // Aynı barkodlu ürün listede yoksa, yeni ürünü ekle
        const product = {
          barcode: response.data[0].barcode,
          productId: response.data[0].id,
          productName: response.data[0].productName,
          unitPrice: response.data[0].salesPrice,
          quantity: 1
        };
  
        setProductList((prev) => {
          const updatedList = [...prev, product];
          playSound(); // state ataması bittiğinde playSound fonksiyonunu çağır
          return updatedList;
        });
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteAction = (index) => {
    const updatedList = [...productList];
    updatedList.splice(index, 1);
    setProductList(updatedList);
  };

  const handleDecreaseQuantity = (index) => {
    // state'in kopyasını al
    const updatedProductList = [...productList];

    // Belirli indeksteki ürünün quantity'sini azalt
    if (updatedProductList[index].quantity > 0) {
      updatedProductList[index].quantity -= 1;

      // state'i güncelle
      setProductList(updatedProductList);
    }
  };


  const change = () => {
    if (payment < totalPrice) {
      setChangePrice(0)
    } else {
      setChangePrice(payment - totalPrice)
    }

  }




  const totalPriceFunc = () => {
    // productList içindeki her ürünün quantity * unitPrice değerlerini topla
    const total = productList.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

    setTotalPrice(total)
  };

  const truncateProductName = (productName, maxLength) => {
    if (productName.length <= maxLength) {
      return productName;
    } else {
      // Belirli bir karakter sınırından sonra üç nokta ekleyerek kısalt
      return productName.substring(0, maxLength) + '...';
    }
  };
  

  const handleIncreaseQuantity = (index) => {
    // state'in kopyasını al
    const updatedProductList = [...productList];

    // Belirli indeksteki ürünün quantity'sini artır
    updatedProductList[index].quantity += 1;

    // state'i güncelle
    setProductList(updatedProductList);
  };

  useEffect(() => {
    totalPriceFunc()
  }, [productList])


  useEffect(() => {
    change()
  }, [payment])

  const getCustomerList = async () => {
    try {
      const apiUrl = `http://72.167.148.55:35627/customer`;
      const response = await axios.get(apiUrl, {
        withCredentials: true,
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      setCustomerList(response.data.map(item => ({
        label: item.phone + `(${item.customerName})`,
        value: item.id
      })))
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCustomerList()
    getProduct()
  }, [refresh])


  return (
    <>
    <div hidden={salesListShow || returnShow}>
      <Row className=' mb-1'>
        <Col className='d-flex justify-content-center'>
          <p><Chip sx={{ marginTop: "10px" }} color='primary' label="Tutar" /></p> <TextField id="total" type="number" value={totalPrice} variant="outlined" disabled />
        </Col>
        <Col className='d-flex justify-content-center'>
          <p><Chip sx={{ marginTop: "10px" }} color='primary' label="Ödeme" /></p> <TextField id="payment" type="number" value={payment} variant="outlined" onChange={(e) => setPayment(e.target.value)} />
        </Col>
        <Col className='d-flex justify-content-center'>
          <p><Chip sx={{ marginTop: "10px" }} color='primary' label="Para Üstü" /></p> <TextField id="change" type="number" value={changePrice} variant="outlined" disabled />
        </Col>
        <Col className='d-flex justify-content-center'>
          <p><Chip sx={{ marginTop: "10px" }} color='primary' label="İskonto" /></p> <TextField id="change" type="number" value={iskonto} variant="outlined" onChange={(e) => { setIskonto(e.target.value); setTotalPrice(totalPrice - ((totalPrice * e.target.value) / 100)) }} />


          <PercentIcon sx={{ my: 1, fontSize: '30px' }} color='primary' />


        </Col>
        <Col className='mt-1'>
          <Button color="success" sx={{ color: '#fff' }} variant="contained" onClick={() => { handleSave('Nakit') }}> Nakit </Button>
          <Button color="success" sx={{ color: '#fff' }} variant="contained" onClick={() => { handleSave('Pos') }}> Pos </Button>
          <Button color="success" sx={{ color: '#fff' }} variant="contained" onClick={() => { setSectionalShow(true)}}> Parçalı</Button>

        </Col>

      </Row>
      <Row className='p-3'>
        <Col className='d-flex justify-content-between custom-col'>



          {!inputChange ? (
            <>

              <Tooltip title="Ürün Adı ile Giriş Yap">
                <IconButton onClick={() => setInputChange(true)}>
                  <LocalMallIcon sx={{ my: 0.5, fontSize: '40px' }} color='primary' />
                </IconButton>
              </Tooltip>


              <TextField fullWidth sx={{ marginBottom: "15px" }} id="barcode" value={barcode} label="Barkod giriniz.." variant="standard" onChange={(e) => {  setBarcode(e.target.value); getProductByBarcode(e.target.value) }} />

            </>
          ) : (
            <>

              <Tooltip title="Barkod ile Giriş Yap">
                <IconButton onClick={() => setInputChange(false)}>
                  <QrCode2Icon sx={{ my: 0.5, fontSize: '40px' }} color='primary' />
                </IconButton>
              </Tooltip>

              <TextField fullWidth sx={{ marginBottom: "15px" }} id="productName" label="Ürün adı giriniz.." variant="standard" />

            </>
          )}



        </Col>
        <Col className='d-flex justify-content-begin custom-col'>
          <div className='mt-2 mr-2'>
            <PersonSearchIcon sx={{ my: 0.5, fontSize: '40px' }} color='primary' /></div>
          <div className='mr-2 mt-3 mb-1'>
            <Select
              className="basic-single"
              classNamePrefix="select"
              placeholder="Müşteri Seçimi Yapınız......."
              isClearable
              isSearchable
              name="exitReason"
              options={customerList}
              onChange={(e) => {if(e === null){setCustomer({label:null,value:null})}else{setCustomer(e)}}}
              value={customer?.value === null ? null : customerList.find(item => item.value === customer?.value) }
              styles={{
                control: (provided) => ({
                  ...provided,
                  width: '100%',
                  minWidth:'200px' // Genişlik ayarı
                }),
              }}

            /></div>
        </Col>
        <Col xs={5} className='d-flex justify-content-between custom-col p-3'>
          <Button color="success" sx={{ color: '#fff' }} variant="contained" onClick={()=>setShow(true)}> Müşteri Ekle</Button>
          <Button color="error" variant="contained" onClick={()=>setReturnShow(true)} > İade Oluştur</Button>
          <Button color="primary" variant="contained" onClick={()=>setSalesListShow(true)}> Satış Listesine Git</Button>
          <Button color="warning" sx={{ color: '#fff' }} variant="contained"> Yazdır</Button>
        </Col>




      </Row>

      <Row>
        <Col xs={8} className=' custom-col p-3'>
          <Row>
            <Col>
              <strong>Ürünler:{productList.length}</strong>
            </Col>
          </Row>
          <Row className='p-3'>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Barkod</th>
                  <th>Ürün Adı</th>
                  <th>Miktar</th>
                  <th>Fiyat(Adet)</th>
                  <th>Fiyat(Toplam)</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.barcode}</td>
                    <td>{item.productName}</td>
                    <td>
                      <IconButton onClick={() => handleDecreaseQuantity(index)}>
                        <RemoveCircleIcon sx={{ my: 0.5, fontSize: '20px' }} color='error' />
                      </IconButton>
                      {item.quantity}
                      <IconButton onClick={() => handleIncreaseQuantity(index)}>
                        <AddCircleIcon sx={{ my: 0.5, fontSize: '20px' }} color='success' />
                      </IconButton>
                    </td>
                    <td>{item.unitPrice}</td>
                    <td>{item.unitPrice * item.quantity}</td>
                    <td>
                      <IconButton onClick={() => handleDeleteAction(index)}>
                        <DeleteForeverIcon color='error' />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </Col>
        <Col className=' custom-col p-3'>
        <Row>
  {viewProduct.map((item, index) => (
    <React.Fragment key={index}>
      <Col className='d-flex justify-content-center'>
        <Button variant="outlined" onClick={() => getProductByBarcode(item.barcode)}>
        {truncateProductName(item.productName, maxLength)}
        </Button>
      </Col>
      {(index + 1) % 2 === 0 && <div className="w-100"></div>}
    </React.Fragment>
  ))}
</Row>



        </Col>
      </Row></div>
      <CustomerInsert show={show} setShow={setShow} setNewCustomerId={setCustomer} setRefresh={setRefresh}/>
      <SectionalSale totalPrice={totalPrice} sectionalShow={sectionalShow} setSectionalShow={setSectionalShow} handleSave={handleSave}/>
      <SalesList show={salesListShow} setShow={setSalesListShow} refresh={refresh}/>
      <ReturnSale returnShow={returnShow} setReturnShow={setReturnShow}/>
    </>
  )
}

export default Sales;