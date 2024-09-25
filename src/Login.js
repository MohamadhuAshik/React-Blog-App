import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ApiServices } from './api/api_services';
import DataContext from './context/DataContext';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Loder from './component/Loder';
import { requestFcmToken } from "./utils/fireBaseUtils";


const Login = () => {
    const { setIsLogin } =
        useContext(DataContext);
    const [showPassword, setShowPassword] = React.useState(false);
    const [mailId, setMailId] = useState("")
    const [password, setPassword] = useState("")
    const [fcmToken, setFcmToken] = useState("")
    const fetchFcmToken = async () => {
        try {
            const getfcmToken = await requestFcmToken()
            setFcmToken(getfcmToken)
            console.log("fcmToken", getfcmToken)
        } catch (err) {
            console.log("Error getting FCM Token:", err)
        }
    }
    useEffect(() => {
        fetchFcmToken()
    }, [])
    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const [open, setOpen] = useState(false);

    const [errorOpen, setErrorOpen] = useState(false)
    const [errMsg, setErrorMsg] = useState("")


    const handleClose = () => {
        setOpen(false);
        window.location.replace("/")
    };

    const handleErrorClose = () => {
        setErrorOpen(false)
    }

    const LoginUser = async (mailId, password, fcmToken) => {
        const data = {
            mailId: mailId,
            password: password,
            fcmToken: fcmToken
        }
        ApiServices.Login(data).then((res) => {
            console.log(res)
            if (res.response_code === 200) {
                localStorage.setItem("token", res.token)
                localStorage.setItem("name", res.userName)
                setIsLogin(true)
                setOpen(true)
            }
        }).catch((err) => {
            if (err) {
                setErrorOpen(true)
                setErrorMsg(err.data.message)
            }
        })
    }
    return (


        <div style={{ height: "100vh" }} className='d-flex justify-content-center align-items-center' >
            <Card className='shadow' sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography className='mb-5' gutterBottom variant="h5" component="div">
                        LOGIN
                    </Typography>

                    <FormControl className='mb-4' sx={{ width: '100%' }} variant="outlined">
                        <TextField
                            id="outlined-basic"
                            value={mailId}
                            onChange={(e) => setMailId(e.target.value)}
                            label="MailId"
                            variant="outlined"
                        />
                    </FormControl>
                    <FormControl className='mb-4' sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button className='w-100 rounded-2' onClick={() => LoginUser(mailId, password, fcmToken)} variant="contained" size="large">
                        Login
                    </Button>
                    <Typography className='text-center mt-2'>
                        Don't have account? <span style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>Create account</span>
                    </Typography>

                </CardContent>
            </Card>

            <Dialog
                maxWidth="xs"
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className='d-flex justify-content-center' id="alert-dialog-title">
                    {/* <CheckCircleTwoToneIcon style={{ fontSize: "80px", color: 'primary' }} /> */}
                </DialogTitle>
                <DialogContent className='d-flex justify-content-center'>
                    <DialogContentText fontSize={20} id="alert-dialog-description">
                        Login Success
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <Button variant="contained" size="large" onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>


            <Dialog
                maxWidth="xs"
                fullWidth
                open={errorOpen}
                onClose={handleErrorClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className='d-flex justify-content-center' id="alert-dialog-title">
                    {/* <CheckCircleTwoToneIcon style={{ fontSize: "80px", color: 'primary' }} /> */}
                </DialogTitle>
                <DialogContent className='d-flex justify-content-center'>
                    <DialogContentText fontSize={20} id="alert-dialog-description">
                        {errMsg}
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='d-flex justify-content-center'>
                    <Button variant="contained" size="large" onClick={handleErrorClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div >



    )
}

export default Login