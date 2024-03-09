import { Button, Card, CardContent, Grid, TextField, Typography } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Select from 'react-select'
import { FileUpload } from 'primereact/fileupload';
import { Howl } from 'howler';
import { useEffect } from 'react';
import soundPath from '../../assets/stop-13692.mp3'
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
export default function ProductInsert(props) {
const [sound,setSound] = useState(null)

const [salesPrice, setSalesPrice] = useState('');
  const [buyingPrice, setBuyingPrice] = useState('');
const [product,setProduct] = useState({
    productName:'',
    stock:0,
    criticalStock:0,
    salesPrice:0,
    buyingPrice:0,
    spread:0,
    kdv:0,
    view:'',
    Unit:'Adet',
    variant:'',
    pictures:'',
    tenant:'KasamYanimda'

})
const onUploadHandler = (event) => {
    // Yüklemenin başarılı olduğu durumda çalışacak fonksiyon
    const response = event.xhr.response // Sunucudan dönen yanıtı çözümle

   
    handleInputChange('pictures',response)
  };
    const unitList = [
        { label: "Adet", value: "1" },
        { label: "Gram", value: "2" },
        { label: "Kasa 20'li", value: "3" },
        { label: "Kasa 24'lü", value: "4" },
        { label: "Kilogram", value: "5" },
        { label: "Koli 12'li", value: "1" },
        { label: "Koli 16'li", value: "1" },
        { label: "Koli 8'li", value: "1" },
        { label: "Paket", value: "1" },
        { label: "Paket 12'li", value: "1" },
        { label: "Paket 6'lı", value: "1" },



    ]

    const handleSave = async () => {

        try {
            const apiUrl = `https://localhost:44344/api/Product/register`;
            await axios.post(apiUrl, product, {
                withCredentials: true,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                }
            })

            toast.success("Ürün başarıyla kaydedildi")
            setTimeout(() => {
                props.setRefresh(uuidv4())
                props.setShow(false)
            }, 1000)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        
      
    
        // Ses dosyasını yükleyip bir Howl nesnesi oluşturun
        setSound( new Howl({
          src: [soundPath],
        }))
    
       
     
      }, [])

       // Input değeri değiştiğinde sesi çal
       const playSound = () => {
        sound.play();
      };

      const handleInputChange = (field,value) => {
        if (field === 'salesPrice') {
            setSalesPrice(value);
          } else if (field === 'buyingPrice') {
            setBuyingPrice(value);
          }
          
        setProduct((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleRadioChange = (e) => {
        const { value } = e.target;
        setProduct((prevType) => ({
            ...prevType,
            view: value
        }));}

    const calculateProfitMargin = () => {
        // product state'i burada güncellenmiş olacaktır
        const sales = parseFloat(salesPrice);
        const buying = parseFloat(buyingPrice);
    
        if (!isNaN(sales) && !isNaN(buying) && buying !== 0) {
          const margin = ((sales - buying) / buying) * 100;
          handleInputChange('spread',margin.toFixed(2));
        } 
      };
    
      useEffect(() => {
        calculateProfitMargin();
      }, [salesPrice,buyingPrice]);
  
    return (
        <div hidden={!props.show}>
            <Row className='mb-3'>
                <Col className='d-flex justify-content-start'>
                    <Card>
                        <CardContent>
                            <QrCode2Icon sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: '40px' }} />
                            <TextField id="barcode" label="Barkod" variant="standard" onChange={(e)=>{playSound();handleInputChange('barcode',e.target.value)}}/>
                        </CardContent>
                    </Card>
                </Col>
                <Col className='d-flex justify-content-end py-4'>
                    <Button color="secondary" variant="contained" onClick={() => props.setShow(false)}>Listeye Dön</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={8}>
                    <Card sx={{ height: "340px" }}>

                        <CardContent >
                            <Grid item>
                                <Typography variant="h4">Ürün Bilgileri</Typography>
                            </Grid>
                            <Row className='mt-4'>
                                <Col >
                                    <div className='p-2'>
                                        <TextField
                                            id="productName"
                                            label="Ürün Adı"
                                            variant="outlined"
                                            fullWidth
                                            onChange={(e)=> handleInputChange('productName',e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div className='p-2'>
                                        <TextField
                                            id="stock"
                                            type='number'
                                            label="Stok"
                                            variant="outlined"
                                            onChange={(e)=> handleInputChange('stock',e.target.value)}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div className='p-2'>
                                        <TextField
                                            id="criticalStock"
                                            type='number'
                                            label="Kritik Stok"
                                            variant="outlined"
                                            onChange={(e)=> handleInputChange('criticalStock',e.target.value)}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row >
                                <Col>
                                    <div className='p-2'>
                                        <TextField
                                            id="salesPrice"
                                            label="Satış Fiyatı"
                                            type='number'
                                            variant="outlined"
                                            onChange={(e)=> handleInputChange('salesPrice',e.target.value)}
                                        />
                                    </div>
                                </Col>

                                <Col>
                                    <div className='p-2'>
                                        <TextField
                                            id="buyingPrice"
                                            type='number'
                                            label="Alış Fiyatı"
                                            variant="outlined"
                                            onChange={(e)=> handleInputChange('buyingPrice',e.target.value)}
                                        />
                                    </div>
                                </Col>

                                <Col>
                                    <div className='p-2'>
                                        <TextField
                                            id="spread"
                                            type='number'
                                            label="Kar Oranı (%)"
                                            variant="outlined"
                                            value={product.spread}
                                            disabled
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div className='p-2'>
                                        <TextField
                                            id="kdv"
                                            type='number'
                                            label="KDV Oranı (%)"
                                            variant="outlined"
                                            onChange={(e)=> handleInputChange('kdv',e.target.value)}
                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row >
                                <Col >
                                    <div className='p-2'>
                                        <FormControl>
                                            <FormLabel>Satış ekranında gösterilsin mi ? </FormLabel>
                                            <RadioGroup
                                                row
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={product.view}
                                                onChange={handleRadioChange}
                                            >
                                                <FormControlLabel value="visible" control={<Radio />} label="Evet" />
                                                <FormControlLabel value="unvisible" control={<Radio />} label="Hayır" />

                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </Col>
                                <Col>
                                    <div className='p-2'>
                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            placeholder="Varyasyon"
                                            isClearable
                                            isSearchable
                                            name="unit"
                                            options={unitList}
                                            onChange={(e)=> handleInputChange('variant',e.label)}
                                            styles={{
                                                menu: provided => ({
                                                    ...provided,
                                                    zIndex: 9999,

                                                    maxHeight: '100px',


                                                }),
                                                menuList: (provided) => ({
                                                    ...provided,
                                                    maxHeight: '80px', // Açılan menüde görüntülenen seçenek sayısını sınırlayacak yükseklik
                                                }),
                                            }}

                                        />

                                    </div>

                                </Col>
                            </Row>
                           
                        </CardContent>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardContent>
                            <Grid item>
                                <Typography variant="h4">Ürün Resmi</Typography>
                            </Grid>
                            <Row className='mt-4'>
                                <Col>
                                <FileUpload name="file" url={'https://localhost:44344/api/Files'}  accept="image/*" maxFileSize={1000000} emptyTemplate={<p className="m-0">Resmi sürükleyip bırakarak da yükleyebilirsiniz.</p>} onUpload={onUploadHandler} />
                                </Col>
                            </Row>
                        </CardContent>
                    </Card>
                   <div className='mt-4 d-flex justify-content-end'>
                   <Button color="secondary" variant="contained" onClick={()=>{handleSave()}} >Kaydet</Button>
                   </div>
                           
                      

                </Col>
            </Row>
        </div>
    )
}
