import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { API } from '../apiServices';
import './login.css'
import App from '../App'

function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState()
    const [isLoginView, setIsLoginView] = useState(true)
    const [LoggedIn, setLoggedIn] = useState(false)
    const [isError, setIsError] = useState(false)
    const [newPassword, setNewPassword]= useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [notReg, setNotReg] = useState(false)
    const [forgot, setForgot] = useState(false)
    const [ confirmFailed, setConfirmFailed ] = useState(false)
    const [ regFail, setRegFail ] = useState(false)
    // useEffect(() => {
    //     if(LoggedIn) window.location.href = '/logged_in'
    // }, [LoggedIn])
    

    const loginClicked = () => {
        API.getLoginDetails()
        .then(loginData => loginData.forEach(data => {
            if (data && data.name === userName && data.password === password) {
                setLoggedIn(true)
            }
            else{
                setIsError(true);
            }
        }))
    }

    const registerClicked = () => {
        API.postLoginDetails({userName, password, phoneNumber}).then(res => {
            console.log(res)
            if(res == 'Registration Successfull') {
                loginClicked()
                // console.log('successsssssssss')
            }
            else {  
                setRegFail(true)
                // console.log('failllllllllll')
            }
        })
    }

    const resetClicked = () => {
        if (confirmPassword === newPassword) {
            API.putLoginDetails({phoneNumber, newPassword})
            .then(resp=>{
                if(resp.status == 404){
                    setNotReg(true)
                }
                else{
                    // console.log(resp.userName)
                    setUserName(resp.userName)
                    setNotReg(false)
                    setForgot(false)
                }
            })
        }
        else setConfirmFailed(true)
    }

    return (
        <>
        { LoggedIn ? <App userName={userName} /> :
        <div className='login-background'>
            <Typography sx={{textAlign: 'center', py: 2, bgcolor: 'primary.main', color: 'white', my:2, mx: 5, borderRadius: 4}} variant='h5'>Pet Adoption Application</Typography>
            <Card className='loginCard' sx={{ maxWidth: 500 }}>
                <CardContent className='loginCardContent'>

                    <Box component='div' className='loginForm'>
                        <div className='heading'>
                            {isLoginView ? 
                                <h1>Login</h1> :
                                <h1>Register</h1>
                            }
                        </div>
                        <div className='body'>
                            <TextField sx={{my:1}} className='inputField' required id='outline-required' value={userName} onChange={ evt => setUserName(evt.target.value)} label='User Name' /><br/>
                            <TextField sx={{my:1}} required id='outline-required' type='password'onChange={ evt => setPassword(evt.target.value)} label='Password'/><br/>
                            { !(isLoginView) &&
                                <TextField sx={{my:1}} required id='outline-required' onChange={ evt => setPhoneNumber(evt.target.value)} label='Phone Number'/>
                            }<br/>
                            { regFail && <p style={{fontSize:'10px',color:'red'}}>User Name or Phone Number already exists !!</p>}
                            { isLoginView ? 
                                <Button sx={{my:1}} variant='contained' onClick={() => loginClicked()}>Login</Button> :
                                <Button sx={{my:1}} variant='contained' onClick={() => registerClicked()}>Register</Button>
                            }<br/>
                            {isLoginView && isError && <><p style={{fontSize:'10px',color:'red'}}>Wrong username or password!!</p> <a style={{color:'blue'}} onClick={() => {setForgot(true); setIsError(!isError);}}>Forgot password</a></>}
                            { isLoginView ?
                                <p>You don't have an account?<a style={{color:'blue'}} onClick={() => setIsLoginView(false)}>Register</a></p> :
                                <p>You already have an account?<a style={{color:'blue'}} onClick={() => {setIsLoginView(true); setRegFail(false);}}>Login</a></p>
                            }<br/>
                            {forgot && <>
                                {/* <TextField sx={{my:1}} className='inputField' required id='outline-required' onChange={ evt => setUserName(evt.target.value)} label='User Name' /><br/> */}
                                <TextField sx={{my:1}} className='inputField' type='number' required id='outline-required' onChange={ evt => setPhoneNumber(evt.target.value)} label='Phone Number' /><br/>
                                <TextField sx={{my:1}} className='inputField' type='password' required id='outline-required' onChange={ evt => setNewPassword(evt.target.value)} label='New Password' /><br/>
                                <TextField sx={{my:1}} className='inputField' type='password' required id='outline-required' onChange={ evt => setConfirmPassword(evt.target.value)} label='Confirm Password' /><br/>
                                <Button sx={{my:1}} variant='contained' onClick={() => resetClicked()}>Reset Password</Button>
                                {confirmFailed && <p style={{fontSize:'10px',color:'red'}}>Confirmation Failed</p>}
                                {notReg &&<p style={{fontSize:'10px',color:'red'}}>Username is wrong Not registered yet!!</p>}
                                </>
                            }
                        </div>
                    </Box>
                </CardContent>
            </Card>
        </div>
    }
    </>
    )
}

export default Login;