import { Button, Card, CardContent, Grid,  TextField, Typography } from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import QrCode2Icon from '@mui/icons-material/QrCode2';
import Select from 'react-select'
export default function ProductInsert(props) {

    const unitList = [
        {label:"Adet",value:"1"},
        {label:"Gram",value:"2"},
        {label:"Kasa 20'li",value:"3"},
        {label:"Kasa 24'lü",value:"4"},
        {label:"Kilogram",value:"5"},
        {label:"Koli 12'li",value:"1"},
        {label:"Koli 16'li",value:"1"},
        {label:"Koli 8'li",value:"1"},
        {label:"Paket",value:"1"},
        {label:"Paket 12'li",value:"1"},
        {label:"Paket 6'lı",value:"1"},



    ]
    return (
        <div hidden={!props.show}>
            <Row className='mb-3'>
                <Col className='d-flex justify-content-start'>
                    <Card>
<CardContent>
<QrCode2Icon sx={{ color: 'action.active', mr: 1, my: 0.5 ,fontSize:'40px'}} />
        <TextField id="barcode" label="Barkod" variant="standard" />
</CardContent>
                    </Card>
                </Col>
                <Col className='d-flex justify-content-end py-4'>
                    <Button color="secondary" variant="contained" onClick={() => props.setShow(false)}>Listeye Dön</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={8}>
                    <Card > 

                        <CardContent >
                            <Grid item>
                                <Typography variant="h4">Ürün Bilgileri</Typography>
                            </Grid>
                            <Row className='p-3'>
                                <Col >
                                    <div className='p-2'>
                                        <TextField
                                            id="productName"
                                            label="Ürün Adı"
                                            variant="outlined"
                                            fullWidth
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

                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className='p-3'>
                                <Col>
                                    <div className='p-2'>
                                        <TextField
                                            id="salesPrice"
                                            label="Satış Fiyatı"
                                            type='number'
                                            variant="outlined"

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

                                        />
                                    </div>
                                </Col>
                            </Row>
                            <Row className='p-3'>
                                <Col >
                                <div className='p-2'>
                                    <FormControl>
<FormLabel>Satış ekranında gösterilsin mi ? </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            
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
                                placeholder="Ürün Birimi"
                                isClearable
                                isSearchable
                                name="unit"
                                options={unitList}
                                styles={{
                                    menu: provided => ({
                                        ...provided,
                                        zIndex: 9999,
                                      
                                        
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
                            Test
                        </CardContent>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
