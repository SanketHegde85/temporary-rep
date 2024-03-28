import React from "react";
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material'
import Login from "./login";

function NavBar(props) {
    
    const handleDonateClicked = () => {
        // window.location.href = '/donate_pet'
        props.donateClicked()
    }

    const handleLogoutClick = () => {
        window.location.href = '/'
    }

    return (
        <Box>
            <AppBar position="static">
                <Toolbar className='navBar'>
                    <Typography varient="h6" component = "div">
                        Pet Adoption
                    </Typography>
                    <div>
                        <Button color="inherit" style={{marginLeft:10, marginRight:10}} onClick={() => handleDonateClicked()}>Donate</Button>
                        <Button color='inherit' style={{marginLeft:10, marginRight:10}} onClick={() => handleLogoutClick()}>Logout</Button>
                        <b style={{marginLeft:50, marginRight:50}} disabled>{props.userName}</b>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavBar