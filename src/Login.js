import React, { useContext, useState } from 'react'
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

const Login = () => {
    const { setIsLogin } =
        useContext(DataContext);
    const [showPassword, setShowPassword] = React.useState(false);
    const [mailId, setMailId] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const LoginUser = async (mailId, password) => {
        const data = {
            mailId: mailId,
            password: password
        }
        try {
            ApiServices.Login(data).then((res) => {
                console.log(res)
                if (res.response_code === 200) {
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("name", res.userName)
                    setIsLogin(true)
                    window.location.replace("/")
                }
            })

        } catch (err) {

        }
    }
    return (

        <div style={{ height: "100vh" }} className='d-flex h-100vh flex-column align-items-center justify-content-center'>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
                <TextField
                    id="outlined-basic"
                    value={mailId}
                    onChange={(e) => setMailId(e.target.value)}
                    label="MailId"
                    variant="outlined"
                />
            </FormControl>
            <FormControl sx={{ m: 1, width: '35ch' }} variant="outlined">
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
            <Button onClick={() => LoginUser(mailId, password)} variant="contained" size="medium">
                Login
            </Button>
            <br />
            <Button onClick={() => navigate("/signup")} size="medium">
                signup
            </Button>
        </div>

    )
}

export default Login