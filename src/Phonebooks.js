import React, { useEffect, useState } from "react";
import Axios from 'axios';
import './App.css';
import Tablesdata from './Tablesdata.js'
import {
    Input, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';
import {  Row, Col } from 'reactstrap';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';



export default function Phonebooks() {
  const dataTB =[
    { Header: 'Name', accessor: 'name' },
    { Header: 'Organization', accessor: 'organization' },
    { Header: 'Mobilenumber', accessor: 'mobilenumber' },
    { Header: 'Homephone', accessor: 'homephone' },
    { Header: 'Officenumber', accessor: 'officenumber' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Image', accessor: 'image' },
    { Header: '', accessor: '' },
    { Header: '', accessor: '' },
  ]

    const [datasvalue, setdatasvalue] = useState([]);
    const [openAdd, setOpenAdd] = useState(false);
    const [dataAdd, setdataAdd] = useState([]);
    const [name, setName] = useState();
    const [org, setOrg] = useState();
    const [mobile, setMobile] = useState();
    const [phone, setPhone] = useState();
    const [office, setOffice] = useState();
    const [email, setEmail] = useState();
    const [alertS, setAlertS] = useState();
    const [alertE, setAlertE] = useState();
    const [openalertS, setOpenAlertS] = useState(false);
    const [openalertE, setOpenAlertE] = useState(false);


    const AddData = () => {
     
        let data = {
            "name": name ? name :null,
            "organization": org ? org : null,
            "mobilenumber": mobile ? mobile : null,
            "homephone": phone ? phone : null,
            "officenumber": office ? office : null,
            "email": email ? email : null

        }
   
        Axios.post('https://test-frontend-api.nayoo.co/api/Nayoo/1702/store',data).then(function (response) {
            var datas = response['data']['data'];
            if (datas) {
                setOpenAdd(false);
                setAlertS('Sucess');
                setOpenAlertS(true);

            } else {
                setAlertE('Error');
                setOpenAlertE(true);

            }
        })
    }
    const OpendialogAdd = () => {
        setOpenAdd(true);

    }
    const handleCloseAdd = () => {
        setOpenAdd(false);
    }

    const ContentADD = () => {
        return <div><Row>
            <Col><p>Name</p>
            <Input
            autoFocus
            margin="dense"
            id="name"
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                /></Col>
            <Col><p>Organization</p>
            <Input
                autoFocus
                margin="dense"
                id="org"
                label="Organization"
                    onChange={(e) => setOrg(e.target.value)}
                fullWidth
                /></Col>
            <Col><p>Mobilenumber</p>
            <Input
                autoFocus
                margin="dense"
                id="mobile"
                label="Mobilenumber"
                    onChange={(e) => setMobile(e.target.value)}
                fullWidth
                /></Col>
            <Col><p>Homephone</p>
            <Input
                autoFocus
                margin="dense"
                id="homephoe"
                label="Homephone"
                    onChange={(e) => setPhone(e.target.value)}
                fullWidth
                /></Col>
            <Col><p>Officenumber</p>
                <Input
                    autoFocus
                    margin="dense"
                    id="office"
                    label="Officenumber"
                    onChange={(e) => setOffice(e.target.value)}
                    fullWidth
                /></Col>
          <Col><p>Email</p>
            <Input
                autoFocus
                margin="dense"
                id="email"
                label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                fullWidth
                /></Col>
        </Row></div>
    }

    return <div>
         <p className="h1">Phone Book</p>
        <Collapse in={openalertS}><Alert action={
            <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    setOpenAlertS(false);
                }} >
                <CloseIcon fontSize="inherit" />
            </IconButton>
          }><AlertTitle>{alertS}</AlertTitle>
          </Alert>
        </Collapse>
        <Collapse in={openalertE}><Alert severity="error"
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpenAlertE(false);
                    }}  ><CloseIcon fontSize="inherit" />
                </IconButton>
            }>
            <AlertTitle>{alertE}</AlertTitle>
             </Alert>
        </Collapse>
        <div style={{ marginLeft: '10%', marginRight: '10%', marginBottom:'1%' }}>
         
            <Button variant="contained" color="primary" onClick={() => { OpendialogAdd() }}>
                ADD
            </Button>
        </div>
        <div style={{ marginLeft: '10%', marginRight: '10%',marginBottom: '10%'  }}>
            <Tablesdata dataTB={dataTB} />
        </div>

        <Dialog open={openAdd} onClose={handleCloseAdd} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">ADD DATA</DialogTitle>
            <DialogContent style={{ width:"500px" }}>
                { ContentADD()}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseAdd} style={{ color:"#EA3324" }}>
                    Cancel
                </Button>
                <Button onClick={()=>AddData()} style={{ color: "#0C9E14" }}>
                    ADD
                </Button>
            </DialogActions>
        </Dialog>
      </div>
}