import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';


export default function SectionalSale(props) {
   const [cash,setCash] = useState(0)
   const [pos,setPos] = useState(0)
    const [sectionalSale, setSectionalSale] = useState({
        cash: 0,
        pos: 0,
        kalan:0
      })
    const handleClose = () => props.setSectionalShow(false);
    const handleSave = async () => {

        
        props.handleSave(sectionalSale)
        props.setSectionalShow(false)
    }
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setSectionalSale((prevSectionalSale) => {
            const updatedSectionalSale = {
                ...prevSectionalSale,
                [id]: value   // parseFloat, input'tan alınan değeri sayıya çevirir
            };
    
            return updatedSectionalSale;
        });
    };
    return (

        <Dialog open={props.sectionalShow} onClose={handleClose}>
        <DialogTitle fontSize={20}>Parçalı Satış</DialogTitle>
        <DialogContent>
            <Row>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="cash"
                            type="number"
                            label="Nakit"
                            variant="outlined"
                            onChange={(e)=>{setCash(e.target.value);handleInputChange(e)}}
                        />
                    </div>
                </Col>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="pos"
                            type="number"
                            label="Pos"
                            
                            variant="outlined"
                            onChange={(e)=>{console.log(e.target);handleInputChange(e);setPos(e.target.value)}}
                        />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="totalPrice"
                            type='number'
                            label="Tutar"
                            variant="outlined"
                            disabled
                            value={props.totalPrice}
                        />
                    </div>
                </Col>
                <Col>
                    <div className='p-2'>
                        <TextField
                            id="kalan"
                            label="Kalan"
                            variant="outlined"
                            disabled
                            value={props.totalPrice - (parseFloat(cash)+parseFloat(pos))}

                        />
                    </div>
                </Col>
            </Row>
           
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Vazgeç
            </Button>
            <Button onClick={handleSave} color="primary">
                Satış Yap
            </Button>
        </DialogActions>
    </Dialog>
    )
}
