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
import Select from 'react-select'
import { useEffect } from 'react';
export default function OutGoingInsert(props) {
    const [outGoing, setOutGoing] = useState({
        type: "",
        description: "",
        amount: "",
        paymentType: "",
        date: "",
        tenant: "KasamYanimda"

    })
    const [typeList,setTypeList] = useState([])
    const handleClose = () => props.setShow(false);
    const handleSave = async () => {

        try {
            const apiUrl = `http://72.167.148.55:35627/api/Financial/register/OutGoing`;
             await axios.post(apiUrl,outGoing, {
                withCredentials: true,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                }
            })
            
            toast.success("Gider başarıyla kaydedildi")
            setTimeout(()=> {
                props.setRefresh(uuidv4())
                props.setShow(false)
            },1000)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getTypeList()
            },[])

            const getTypeList = async () => {
                try{ 
                    
                    const apiUrl = `http://72.167.148.55:35627/api/Financial/type/list`;
                const response = await axios.get(apiUrl, {
                  withCredentials: true,
                    headers: {
                     Accept:'*/*',
                     'Content-Type': 'application/json'
                    }
                })
                setTypeList(response.data
                    .filter(item => item.type === "0") // type değeri "0" olanları filtrele
                    .map(item => ({
                      label: item.typeName,
                      value: item.id
                    }))
                  );
            
                }catch(err){
                    console.log(err)
                }
            }

            const handleInputChange = (field,value) => {
        
                setOutGoing((prev) => ({
                    ...prev,
                    [field]: value
                }));
            };
    return (

        <Dialog open={props.show} onClose={handleClose}>
        <DialogTitle fontSize={20}>Yeni Gider Ekle</DialogTitle>
        <DialogContent>
                <Row>
                    <Col>
                        <div className='p-2'>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Tür"
                                isClearable
                                isSearchable
                                name="type"
                                options={typeList}
                                styles={{
                                    menu: provided => ({
                                        ...provided,
                                        zIndex: 9999, // İstediğiniz z-index değerini burada belirleyebilirsiniz
                                    }),
                                }}
                                onChange={(selectedOption) => handleInputChange('type', selectedOption.label)}
                            />
                        </div>
                       
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='p-2'>
                            <TextField
                                id="amount"
                                label="Tutar"
                                variant="outlined"
                                onChange={(selectedOption) => handleInputChange('amount', selectedOption.target.value)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className='p-2'>
                            <TextField
                                id="paymentType"
                                label="Ödeme Türü"
                                variant="outlined"
                                onChange={(selectedOption) => handleInputChange('paymentType', selectedOption.target.value)}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>

                    <Col>
                        <div className='p-2'>
                            <TextField
                                label="Gider Tarihi"
                                type="date"
                                onChange={(selectedOption) => handleInputChange('date', selectedOption.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            />
                        </div>
                    </Col>
                    <Col>
                            <div className='p-2'>
                                <TextField
                                    id="description"
                                    label="Gider Notu"
                                    variant="outlined"
                                    onChange={(selectedOption) => handleInputChange('description', selectedOption.target.value)}
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
