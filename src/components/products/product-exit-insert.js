import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Grid, TextField, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { Col, Row, Table } from 'react-bootstrap';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Select from 'react-select';
import { Howl } from 'howler';
import { toast } from 'react-toastify';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import soundPath from '../../assets/stop-13692.mp3';

const ProductExistInsert = (props) => {
    const [sound, setSound] = useState(null);
    const [productList, setProductList] = useState([]);
    const [actionList, setActionList] = useState([]);

    const [action, setAction] = useState({
        productId: '',
        productName: '',
        barcode: '',
        quantity: 0,
        exitReason: '',
        date: '',
        tenant: 'KasamYanimda'
    });

    const exitReasonList = [
        { label: "Çöpe atıldı", value: "1" },
        { label: "Transfer Edildi", value: "2" }
    ];

    const getProductByBarcode = async (barcode) => {
        try {
            const apiUrl = `https://localhost:44344/api/Product/GetProductByBarcode?barcode=${barcode}`;
            const response = await axios.get(apiUrl, {
                withCredentials: true,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                }
            });
            setAction((prev) => ({
                ...prev,
                barcode: response.data[0].barcode,
                productId: response.data[0].id,
                productName: response.data[0].productName,
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const getProductById = async (id) => {
      
        try {
            const apiUrl = `https://localhost:44344/api/Product/GetProductById?id=${id}`;
            const response = await axios.get(apiUrl, {
                withCredentials: true,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                }
            });
            setAction((prev) => ({
                ...prev,
                barcode: response.data[0].barcode,
                productId: response.data[0].id,
                productName: response.data[0].productName,
            }));
        } catch (err) {
            console.log(err);
        }
    };

    const ProductList = async () => {
        try {
            const apiUrl = `https://localhost:44344/api/Product/product/list`;
            const response = await axios.get(apiUrl, {
                withCredentials: true,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                }
            });
            setProductList(response.data.map((item) => ({
                label: item.productName,
                value: item.id
            })));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        ProductList();
    }, []);

    const handleDeleteAction = (index) => {
        const updatedList = [...actionList];
        updatedList.splice(index, 1);
        setActionList(updatedList);
    };

    const handleSave = async () => {
        try {
            const apiUrl = `https://localhost:44344/api/Product/stock/exit`;
            await axios.post(apiUrl, { "stockExits":actionList}, {
                withCredentials: true,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                }
            });

            toast.success("Çıkış başarıyla kaydedildi");
            setTimeout(() => {
                props.setRefresh(uuidv4());
                props.setShow(false);
            }, 1000);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setSound(new Howl({
            src: [soundPath],
        }));
    }, []);

    const playSound = () => {
        sound.play();
    };

    const handleInputChange = (field, value) => {
        if (field === 'date' && value) {
            // Seçilen tarihi ISO 8601 formatına çevir
            const isoDate = new Date(value).toISOString();
            console.log(isoDate)
            setAction((prev) => ({
                ...prev,
                [field]: isoDate,
            }));
        } 
        setAction((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddAction = () => {
        setActionList((prev) => [...prev, action]);
        setAction({
            productId: '',
            productName: '',
            barcode: '',
            quantity: 0,
            exitReason: '',
            date: '',
            tenant: 'KasamYanimda'
        });
    };

    return (
        <div hidden={!props.show}>
            <Row className='mb-3'>
                <Col className='d-flex justify-content-end py-4'>
                    <Button color="secondary" variant="contained" onClick={() => props.setShow(false)}>Listeye Dön</Button>
                </Col>
            </Row>
            <Row className='custom-row p-3 mb-3' >
                <Col className='d-flex justify-content-between'>
                    <QrCode2Icon sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: '40px' }} />
                    <TextField id="barcode" label="Barkod" variant="standard" value={action.barcode} onChange={(e) => { playSound(); handleInputChange('barcode', e.target.value);getProductByBarcode(e.target.value) }} />
                </Col>
                <Col>
                    <div className='p-2'>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Ürün Adı"
                            isClearable
                            isSearchable
                            name="productId"
                            value={productList.find(item => item.value === action.productId)}
                            options={productList}
                            onChange={(e) => {getProductById(e.value), handleInputChange('productId', e.value), handleInputChange('productName', e.label) }}
                            styles={{
                                menu: provided => ({
                                    ...provided,
                                    zIndex: 9999,
                                    maxHeight: '100px',
                                }),
                                menuList: (provided) => ({
                                    ...provided,
                                    maxHeight: '80px',
                                }),
                            }}
                        />
                    </div>
                </Col>
                <Col>
                    <div className='p-2'>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            placeholder="Çıkış Nedeni"
                            isClearable
                            isSearchable
                            name="exitReason"
                            options={exitReasonList}
                            onChange={(e) =>{handleInputChange('exitReason', e.label); console.log(action)} }
                            styles={{
                                menu: provided => ({
                                    ...provided,
                                    zIndex: 9999,
                                    maxHeight: '100px',
                                }),
                                menuList: (provided) => ({
                                    ...provided,
                                    maxHeight: '80px',
                                }),
                            }}
                        />
                    </div>
                </Col>
                <Col>
                    <div >
                        <TextField
                            id="quantity"
                            type='number'
                            label="Çıkış Adedi"
                            variant="standard"
                            onChange={(e) => handleInputChange('quantity', e.target.value)}
                        />
                    </div>
                </Col>
                <Col>
                    <div >
                        <TextField
                            label="Çıkış Tarihi"
                            type="date"
                            onChange={(selectedOption) => handleInputChange('date', selectedOption.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="standard"
                        />
                    </div>
                </Col>
                <Col xs={1}>
                    <div >
                        <Tooltip sx={{ marginLeft: '-15px' }} title="Ekle">
                            <IconButton onClick={handleAddAction}>
                                <AddCircleIcon sx={{ fontSize: '40px', marginLeft: '-15px' }} color='primary' />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col >
                    <Card sx={{ height: "340px" }}>
                        <CardContent >
                            <Grid item>
                                <Typography variant="h4">Ürün Listesi</Typography>
                            </Grid>
                            <Row className='p-3'>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Barkod</th>
                                            <th>Ürün Adı</th>
                                            <th>Çıkış Miktarı</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {actionList.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item.barcode}</td>
                                                <td>{item.productName}</td>
                                                <td>{item.quantity}</td>
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
                        </CardContent>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col className='mt-4 d-flex justify-content-end'>
                    <Button color="secondary" variant="contained" onClick={handleSave}>Kaydet</Button>
                </Col>
            </Row>
        </div>
    );
};

export default ProductExistInsert;
