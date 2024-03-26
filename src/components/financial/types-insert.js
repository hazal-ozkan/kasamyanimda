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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


export default function TypesInsert(props) {
    const [type, setType] = useState({
        typeName: "",
        type: "",
        tenant:"KasamYanimda"

    })
    const handleClose = () => props.setShow(false);
    const handleSave = async () => {

        try {
            const apiUrl = `http://72.167.148.55:35627/api/Financial/register`;
             await axios.post(apiUrl,type, {
                withCredentials: true,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                }
            })
            
            toast.success("Tür başarıyla kaydedildi")
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
        setType((prevType) => ({
            ...prevType,
            [id]: value
        }));
    };

    const handleRadioChange = (e) => {
        const { value } = e.target;
        setType((prevType) => ({
            ...prevType,
            type: value
        }));
    };
    return (

        <Dialog open={props.show} onClose={handleClose}>
        <DialogTitle fontSize={20}>Yeni Tür Ekle</DialogTitle>
        <DialogContent>
            <Row>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="typeName"
                            label="Tür Adı"
                            variant="outlined"
                            onChange={handleInputChange}
                        />
                    </div>
                </Col>
                <Col>
                <FormControl>
     
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={type.type}
        onChange={handleRadioChange}
      >
        <FormControlLabel value="1" control={<Radio />} label="Gelir" />
        <FormControlLabel value="0" control={<Radio />} label="Gider" />
       
      </RadioGroup>
    </FormControl>
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
