import { useMemo, useTable } from 'react-table'
import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Row, Col } from 'reactstrap';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import Axios from 'axios';
import {
    Input, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, 
    InputLabel, Select, MenuItem, FormControl
} from '@material-ui/core';
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function Tablesdata(props) {
    const [datasvalue, setdatasvalue] = useState([]);
    const [dataEdit, setdataEdit] = useState([]);
    const [dataAll, setdataAll] = useState([]);
    const [dataShowID, setdataShowID] = useState([]);
    const [openEdit, setopenEdit] = useState(false);
    const [openRemove, setopenRemove] = useState(false);
    const [openShowID, setopenShowID] = useState(false);
    const [name, setName] = useState();
    const [org, setOrg] = useState();
    const [mobile, setMobile] = useState();
    const [phone, setPhone] = useState();
    const [office, setOffice] = useState();
    const [email, setEmail] = useState();
    const [dataID, setdataID] = useState();
    const [alertS, setAlertS] = useState();
    const [alertE, setAlertE] = useState();
    const [openalertS, setOpenAlertS] = useState(false);
    const [openalertE, setOpenAlertE] = useState(false);

   useEffect(() => {
       getdataValue()
   }, [])

    useEffect(() => {
        showData();
    }, [datasvalue, alertS])

    const getdataAll = () => {
        Axios.get('https://test-frontend-api.nayoo.co/api/Nayoo/1702/index').then(function (response) {
            var datas = response['data']['data'];
            if (datas.length > 0) {
                setdatasvalue(datas)
            } else {


            }
        })
    }


    const getdataValue = () => {
        Axios.get('https://test-frontend-api.nayoo.co/api/Nayoo/1702/index').then(function (response) {
            var datas = response['data']['data'];
            if (datas.length > 0) {
                datas.forEach((item, idx) => {
                    datasvalue.push(item);
                })
                setdatasvalue([...datasvalue])
            } else {


            }
        })
    }

    const Headdata = (data) => {
        return data.map((item, idx) => {
            return < StyledTableCell >
                {item['Header']}

            </StyledTableCell >
        })
    }

    const editData = (id) => {
        Axios.get('https://test-frontend-api.nayoo.co/api/Nayoo/1702/show/' + id).then(function (response) {
            if (response['data']) {
                setdataID(id);
                setdataEdit(response['data']['data']);
                setopenEdit(true);
            }
        })
    }

    const getdataShowID = () => {
        setopenShowID(true)

    }

    const ContentEdit = () => {
        return <div><Row>
            <Col><p>Name</p>
                <Input
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    defaultValue={dataEdit['name']}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                /></Col>
            <Col><p>Organization</p>
                <Input
                    autoFocus
                    margin="dense"
                    id="org"
                    label="Organization"
                    defaultValue={dataEdit['organization']}
                    onChange={(e) => setOrg(e.target.value)}
                    fullWidth
                /></Col>
            <Col><p>Mobilenumber</p>
                <Input
                    autoFocus
                    margin="dense"
                    id="mobile"
                    label="Mobilenumber"
                    defaultValue={dataEdit['mobilenumber']}
                    onChange={(e) => setMobile(e.target.value)}
                    fullWidth
                /></Col>
            <Col><p>Homephone</p>
                <Input
                    autoFocus
                    margin="dense"
                    id="homephoe"
                    label="Homephone"
                    defaultValue={dataEdit['homephone']}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                /></Col>
            <Col><p>Officenumber</p>
                <Input
                    autoFocus
                    margin="dense"
                    id="office"
                    label="officenumber"
                    defaultValue={dataEdit['Org']}
                    onChange={(e) => setOffice(e.target.value)}
                    fullWidth
                /></Col>
            <Col><p>Email</p>
                <Input
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    defaultValue={dataEdit['email']}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                /></Col>
        </Row></div>

    }

    const contentDataShowID = () => {
        return datasvalue.map((item, idx) => {
            return <div> <MenuItem value={item['id']}>
                {item['id']}</MenuItem></div>
        })
                
     

    }

    const SubmitShowID = () => { 
        Axios.get('https://test-frontend-api.nayoo.co/api/Nayoo/1702/show/' + dataID).then(function (response) {
            var datas = response['data']['data'];
            if (datas) {
                setdatasvalue([datas])
                setopenShowID(false);
            } else {
            }
        })
    }


    const SubmitEditData = () => {
        let data = {
            "name": name ? name : dataEdit['name'],
            "organization": org ? org : dataEdit['organization'],
            "mobilenumber": mobile ? mobile : dataEdit['mobilenumber'],
            "homephone": phone ? phone : dataEdit['homephone'],
            "officenumber": office ? office : dataEdit['officenumber'],
            "email": email ? email : dataEdit['email']

        }
        Axios.put('https://test-frontend-api.nayoo.co/api/Nayoo/1702/update/' + dataID, data).then(function (response) {
            var datas = response['data']['data'];
            if (datas) {
                setAlertS(response['data']['message'])
                setopenEdit(false);
                setOpenAlertS(true);

            } else {
                setAlertE(response['data']['message'])
                setOpenAlertE(true);

            }
        })

    }

    const SubmitRemoveData = () => {
        Axios.delete('https://test-frontend-api.nayoo.co/api/Nayoo/1702/destroy/' + dataID).then(function (response) {
            if (response) {
                setAlertS('success')
                setopenRemove(false);
                setOpenAlertS(true);

            } else {
                setAlertE('error')
                setOpenAlertE(true);

            }
        })

    }
    const removeData = (id) => {
        setdataID(id);
        setopenRemove(true);  
    }
    const handleCloseEdit = () => {
        setopenEdit(false);
    }
    const handleCloseRemove = () => {
        setopenRemove(false);
    }
    const handleCloseShowID = () => {
        setopenShowID(false);
    }
    const showData = () => {
        console.log(datasvalue);
        return datasvalue.map((item, idx)=>{
            return <StyledTableRow >
                <StyledTableCell>{item['name']}</StyledTableCell>
                <StyledTableCell>{item['organization']}</StyledTableCell>
                <StyledTableCell>{item['mobilenumber']}</StyledTableCell>
                <StyledTableCell>{item['homephone']}</StyledTableCell>
                <StyledTableCell>{item['officenumber']}</StyledTableCell>
                <StyledTableCell>{item['email']}</StyledTableCell>
                <StyledTableCell>{item['image']}</StyledTableCell>
                <StyledTableCell><Button style={{ backgroundColor: "#EBE711" }}
                    onClick={() => { editData(item['id']) }}
                > Edit </Button></StyledTableCell>
                <StyledTableCell><Button style={{ backgroundColor: "#F24812" }}
                    onClick={() => { removeData(item['id']) }}
                >Remove </Button></StyledTableCell >
             
            </StyledTableRow>
        })

    }

    return <>
        <Button style={{ color: "#E09E12" }} onClick={() => { getdataAll() }}>
            Show All
        </Button>
        <Button style={{ color: "#12D8E0" }} onClick={() => { getdataShowID() }}>
            Show BY ID
        </Button>
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
        } > <AlertTitle>{alertS}</AlertTitle>
        </Alert></Collapse>
        <Collapse in={openalertE}><Alert severity="error"
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpenAlertE(false);
                    }} >
                    <CloseIcon fontSize="inherit" />
                </IconButton>} >
            <AlertTitle>{alertE}</AlertTitle>
        </Alert></Collapse>

             <TableContainer component={Paper} >
            <Table >
                <TableHead>
                    <TableRow>
                        {Headdata(props.dataTB)}
                    </TableRow>  
            </TableHead>
                <TableBody>
                    {showData()}
                </TableBody>
            </Table>
        </TableContainer>
        <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">ADD DATA</DialogTitle>
            <DialogContent style={{ width: "500px" }}>
                {ContentEdit()}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseEdit} style={{ color: "#EA3324" }}>
                    Cancel
                </Button>
                <Button onClick={() => SubmitEditData()} style={{ color: "#0C9E14" }}>
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={openRemove} onClose={handleCloseRemove} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">ADD DATA</DialogTitle>
            <DialogContent style={{ width: "500px" }}>
                <p>Are you sure want to delete data id = {dataID}?</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseRemove} style={{ color: "#EA3324" }}>
                    Cancel
                </Button>
                <Button onClick={() => SubmitRemoveData()} style={{ color: "#0C9E14" }}>
                    Remove
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog open={openShowID} onClose={handleCloseShowID} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Show ID</DialogTitle>
            <DialogContent style={{ width: "200px" }}>
                <FormControl >
                    <p >ID Data</p>
                    <Select style={{ width: "200px" }}
                        value={dataID}
                        onClick={(e) => { setdataID(e.target.value) }}
                    >{contentDataShowID()}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseRemove} style={{ color: "#EA3324" }}>
                    Cancel
                </Button>
                <Button onClick={() => SubmitShowID()} style={{ color: "#0C9E14" }}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    
        </>
    
}