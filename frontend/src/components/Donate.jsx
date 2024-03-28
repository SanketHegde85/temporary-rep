import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Card, CardContent } from "@mui/material";
import { API } from "../apiServices";
import './donate.css'

function Donate(props) {
    const [ breed, setBreed ] = useState('')
    const [ species, setSpecies ] = useState('')
    const [ petName, setPetName ] = useState('')
    const [ age, setAge ] = useState()
    const [ price, setPrice ] = useState()
    const [ category, setCategory ] = useState([])
    const [ userName, setUserName] = useState([])
    const [ donateSuccess, setDonateSuccess ] = useState(false)
    // const navigate=useNavigate()
    useEffect(() => {
        API.getCategory().then(res => setCategory(res))
    }, [])

    const handleDonateClicked = () => {
        setUserName(props.userName)
        console.log(userName)
        API.postPetDetails({ petName, age, price, breed, species, userName: props.userName})
        // navigate('/logged_in')
        setDonateSuccess(true)
        props.donationDone()
        // window.location.href = '/'
    }

    return (
        <> 
            <Button sx={{m:2}} variant="contained" onClick={() => props.donationDone()}>Back</Button>
            <Card className='donationCard' sx={{ maxWidth: 500, bgcolor: '#BBE2EC'}}>
                <CardContent>
                    <Box className="donationForm" component="form">
                        <h1>Donation Form</h1>
                        <TextField sx={{my:1}} required label="User Name" value={props.userName} InputProps={{readOnly: true}} onChange={() => setUserName(props.userName)}/><br/>
                        <TextField sx={{my:1}} required label="Breed" onChange={evt => setBreed(evt.target.value)}/><br/>
                        <TextField sx={{my:1}} required label="Species" onChange={evt => setSpecies(evt.target.value)}/><br/>
                        <TextField sx={{my:1}} required label="Pet Name" onChange={evt => setPetName(evt.target.value)}/><br/>
                        <TextField sx={{my:1}} required label="Age" type="number" onChange={evt => setAge(evt.target.value)}/><br/>
                        <TextField sx={{my:1}} required label="Price" type="number" onChange={evt => setPrice(evt.target.value)}/><br/>
                        <Button variant="contained" type="submit" onClick={() => handleDonateClicked()}>Donate</Button><br/>
                    </Box> 
                </CardContent>
            </Card>
            {donateSuccess && <p>Donation Successful</p>}
        </>
    )
}

export default Donate