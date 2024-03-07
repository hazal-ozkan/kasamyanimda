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
        row: "",
        type: "",
        incomingNote: "",
        amount: "",
        paymentType: "",
        incomingDate: "",
        incomingHour: "",

        tenant: "KasamYanimda"

    })
    const handleClose = () => props.setShow(false);
    const handleSave = async () => {

        try {
            const apiUrl = `https://localhost:44344/register`;
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
                            id="row"
                            label="Sira"
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>
                </Col>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="type"
                            label="Turu"
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
                            id="incomingNote"
                            label="Gelir Notu"
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>
                </Col>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="amount"
                            multiline
                            maxRows={4}
                            label="Tutar"
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
                            id="paymentType"
                            label="Odeme turu"
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>
                </Col>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="incomingDate"
                            label="Gelir Tarihi"
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>
                </Col>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="incomingHour"
                            label="Saati"
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
