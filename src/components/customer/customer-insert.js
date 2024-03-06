import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import { Col, Row } from 'react-bootstrap';
export default function CustomerInsert(props) {
    
  const handleClose = () => props.setShow(false);

  return (
    
    <Dialog open={props.show} onClose={handleClose}>
        <DialogTitle fontSize={20}>Yeni Müşteri Ekle</DialogTitle>
        <DialogContent>
         <Row>
            <Col>
            <div className='p-2'>
            <TextField id="outlined-basic" label="Müşteri" variant="outlined" />
            </div>
            </Col>
            <Col>
            <div className='p-2'>
            <TextField id="outlined-basic" label="Telefon Numarası" variant="outlined" />
            </div>
            </Col>
         </Row>
         <Row>
         <Col>
            <div className='p-2'>
            <TextField id="outlined-basic" label="Email" variant="outlined" />
            </div>
            </Col>
            <Col>
            <div className='p-2'>
            <TextField multiline maxRows={4} id="outlined-basic" label="Adres" variant="outlined" />
            </div>
            </Col>
           
         </Row>
         <Row>
         <Col>
            <div className='p-2'>
            <TextField id="outlined-basic" label="Vergi Dairesi" variant="outlined" />
            </div>
            </Col>
            <Col>
            <div className='p-2'>
            <TextField  id="outlined-basic" label="Vergi No" variant="outlined" />
            </div>
            </Col>
           
         </Row>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Kapat
          </Button>
          <Button  color="primary">
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
  )
}
