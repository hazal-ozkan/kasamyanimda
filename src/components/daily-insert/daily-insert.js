import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function CustomerInsert(props) {
    const [customer, setCustomer] = useState({
        customerName: "",
        phone: "",
        email: "",
        address: "",
        tax: "",
        taxNo: "",
        tenant: "KasamYanimda"

    })
    const handleClose = () => props.setShow(false);
    const handleSave = async () => {

        try {
            const apiUrl = `http://72.167.148.55:35627/register`;
             await axios.post(apiUrl,customer, {
                withCredentials: true,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                }
            })
            
            toast.success("Müşteri başarıyla kaydedildi")
            setTimeout(()=> {
                props.setRefresh(uuidv4())
                props.setShow(false)
            },1000)
        } catch (err) {
            console.log(err)
        }
    }
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [id]: value
        }));
    };
    return (

        <Dialog open={props.show} onClose={handleClose}>
        <DialogTitle fontSize={20}>Yeni Müşteri Ekle</DialogTitle>
        <DialogContent>
            <Row>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="customerName"
                            label="Müşteri"
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>
                </Col>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="phone"
                            label="Telefon Numarası"
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>
                </Col>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="address"
                            multiline
                            maxRows={4}
                            label="Adres"
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="tax"
                            label="Vergi Dairesi"
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>
                </Col>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="taxNo"
                            label="Vergi No"
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>
                </Col>
            </Row>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Kapat
            </Button>
            <Button onClick={handleSave} color="primary">
                Kaydet
            </Button>
        </DialogActions>
    </Dialog>
    )
}
