import { Box, Button, Card, CardContent, Checkbox, FormControlLabel, TextField, Typography} from "@mui/material";
import './adoption.css'
import { API } from "../apiServices";
import { useState } from "react";

function Adoption(props) {

    const [ isCheck, setIsCheck ] = useState(false)

    const paymentClicked = () => {
        // console.log("******************************", props)
        API.postAdoptionDetails({pet: props.pet, userName: props.userName}).then(() => props.adoptionDone())
    }

    return (
        <>
            <Button sx={{m:2}} variant="contained" onClick={() => props.adoptionDone()}>Back</Button>
            <Card className="adoptionCard" sx={{ maxWidth: 500, bgcolor: '#BBE2EC'}}>
                <CardContent>
                    <Box className="adoptionForm" component="form">
                        <h1>Adoption Details</h1>
                        <TextField sx={{my:1}} required label="User Name" value={props.userName} InputProps={{readOnly: true}}/><br/>
                        <FormControlLabel
                            control={<Checkbox onChange={() => setIsCheck(!isCheck)}/>}
                            label={
                                <Typography variant="body2">
                                  I understand that by checking this box, I'm confirming my readiness to adopt.
                                </Typography>
                              }
                        />
                        { isCheck ? 
                            <Button variant="contained" onClick={() => paymentClicked()}>Pay {props.pet.price}</Button> :
                            <Button variant="contained" onClick={() => paymentClicked()} disabled>Pay {props.pet.price}</Button>
                        }<br/>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}

export default Adoption