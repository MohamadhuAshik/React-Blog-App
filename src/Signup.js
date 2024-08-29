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

const Signup = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [UserName, setUserName] = useState("")
    const [mailId, setMailId] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState(false)
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
    const postData = async (UserName, mailId, password) => {
        const data = {
            name: UserName,
            mailId: mailId,
            password: password
        }

        ApiServices.signUp(data).then((res) => {
            console.log(res)
            if (res.response_code === 200) {
                navigate("/")
            }
        });
    };

    return (

        <div style={{ height: "100vh" }} className='d-flex  flex-column align-items-center justify-content-center'>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <TextField
                    id="outlined-basic"
                    label="UserName"
                    variant="outlined"
                    value={UserName}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <TextField
                    id="outlined-basic"
                    label="MailId"
                    variant="outlined"

                    value={mailId}
                    onChange={(e) => setMailId(e.target.value)}
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <TextField
                    id="outlined-basic"
                    label="Confirm-Password"
                    variant="outlined"
                    value={confirmPassword}

                    error={confirmPasswordError}
                    helperText={confirmPasswordError ? "Error" : ""}
                    onChange={(e) => confirmPassChange(e)}
                />
            </FormControl>
            <Button onClick={() => postData(UserName, mailId, password)} variant="contained" size="medium">
                signup
            </Button>
            <br />
            <Button onClick={() => navigate("/")} size="medium">
                Login
            </Button>
        </div>

    )
}

export default Signup