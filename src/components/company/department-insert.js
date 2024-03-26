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
export default function DepartmentInsert(props) {
    const [users,setUsers] = useState([])
    const [department, setDepartment] = useState({
        departmenName: "",
        bossName: "",
        bossPhone: "",
        bossMail: "",

    })
    const handleClose = () => props.setShow(false);
    useEffect(()=>{
        userList()
    },[])
    const userList = async () => {
    
        try{
          const apiUrl = `http://72.167.148.55:35627/api/Auth/usersCase`;
            const response = await axios.get(apiUrl, {
              withCredentials: true,
                headers: {
                 Accept:'*/*',
                 'Content-Type': 'application/json'
                }
            })
            setUsers(response.data.filter(item => item.role === 'Müdür').map(item => ({
                label: item.name+item.surname,
                value:item.id
            })))
        }catch(err){
          console.log(err)
        }
      }
    const handleSave = async () => {

        try {
            const apiUrl = `http://72.167.148.55:35627/api/Auth/department/register`;
            await axios.post(apiUrl, department, {
                withCredentials: true,
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json'
                }
            })

            toast.success("Departman başarıyla kaydedildi")
            setTimeout(() => {
                props.setRefresh(uuidv4())
                props.setShow(false)
            }, 1000)
        } catch (err) {
            console.log(err)
        }
    }
    const handleInputChange = (field,value) => {
        
        setDepartment((prev) => ({
            ...prev,
            [field]: value
        }));
    };
    return (

        <Dialog open={props.show} onClose={handleClose}>
            <DialogTitle fontSize={20}>Yeni Departman Ekle</DialogTitle>
            <DialogContent>
                <Row>
                    <Col>
                        <div className='p-2'>
                            <TextField
                                id="departmentName"
                                label="Departman Adı"
                                variant="outlined"
                                onChange={(e) => handleInputChange('departmenName', e.target.value)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className='p-2'>
                            <Select
                                className="basic-single"
                                classNamePrefix="select"
                                placeholder="Müdür"
                                isClearable
                                isSearchable
                                name="bossName"
                                options={users}
                                onChange={(e) => handleInputChange('bossName', e.label)}
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
                <Row>
                    <Col>
                        <div className='p-2'>
                            <TextField
                                id="bossPhone"
                                label="Müdür Telefon Numarası"
                                variant="outlined"
                                onChange={(e) => handleInputChange('bossPhone', e.target.value)}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className='p-2'>
                            <TextField
                                id="bossMail"
                                label="Müdür Mail Adresi"
                                variant="outlined"
                                onChange={(e) => handleInputChange('bossMail', e.target.value)}
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
