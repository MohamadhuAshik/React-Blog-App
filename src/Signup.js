import React, { useState } from 'react'
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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const Signup = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [UserName, setUserName] = useState("")
    const [mailId, setMailId] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
    const [userNameError, setUserNameError] = useState(false)
    const [mailIdError, setMailIdError] = useState(false)
    const [passwordError, setPasswordNameError] = useState(false)
    const confirmPassChange = (e) => {
        setConfirmPassword(e.target.value)
        if (e.target.value === password) {
            setConfirmPasswordError(false)
        } else {
            setConfirmPasswordError(true)
        }
    }

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
        navigate("/")
    };

    const handleErrorClose = () => {
        setErrorOpen(false)
    }

    const postData = async (UserName, mailId, password) => {
        setUserNameError(false)
        setMailIdError(false)
        setPasswordNameError(false)
        if (UserName === "") {
            setUserNameError(true)
            return
        }
        if (mailId === "") {
            setMailIdError(true)
            return
        }
        if (password === "") {
            setPasswordNameError(true)
            return
        }
        const data = {
            name: UserName,
            mailId: mailId,
            password: password
        }

        ApiServices.signUp(data).then((res) => {
            console.log(res)
            if (res.response_code === 200) {
                setOpen(true)
            }
        }).catch((err) => {
            if (err) {
                setErrorOpen(true)
                setErrorMsg(err.data.errors)
            }
        });
    };

    return (
        <div style={{ height: "100vh" }} className='d-flex justify-content-center align-items-center'>
            <Card className='shadow' sx={{ maxWidth: 345 }}>
                <CardContent>
                    <Typography className='mb-5' gutterBottom variant="h5" component="div">
                        SIGN UP
                    </Typography>

                    <FormControl className='mb-4' sx={{ width: '100%' }} variant="outlined">
                        <TextField
                            id="outlined-basic"
                            label="UserName"
                            variant="outlined"
                            error={userNameError}
                            helperText={userNameError ? "userName Rquired" : ""}
                            value={UserName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl className='mb-4' sx={{ width: '100%' }} variant="outlined">
                        <TextField
                            id="outlined-basic"
                            label="MailId"
                            variant="outlined"
                            error={mailIdError}
                            helperText={mailIdError ? "Mailid Required" : ""}
                            value={mailId}
                            onChange={(e) => setMailId(e.target.value)}
                        />
                    </FormControl>
                    <FormControl className='mb-4' sx={{ width: '100%' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            error={passwordError}
                            helperText={passwordError ? "Password Required" : ""}
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
                    <FormControl className='mb-4' sx={{ width: '100%' }} variant="outlined">
                        <TextField
                            id="outlined-basic"
                            label="Confirm-Password"
                            variant="outlined"
                            value={confirmPassword}

                            error={confirmPasswordError}
                            helperText={confirmPasswordError ? "Password Does't match" : ""}
                            onChange={(e) => confirmPassChange(e)}
                        />
                    </FormControl>
                    <Button className='w-100 rounded-2' onClick={() => postData(UserName, mailId, password)} variant="contained" size="large">
                        signup
                    </Button>
                    <Typography className='text-center mt-2'>
                        Already have a account? <span style={{ cursor: "pointer" }} onClick={() => navigate("/")}>Login Here</span>
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
                        Signup Success
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
        </div>

    )
}

export default Signup