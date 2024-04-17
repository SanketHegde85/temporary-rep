import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { API } from "../apiServices";
import Adoption from "./adoption";

function PetDisplay(props) {

    const [ petDetails, setPetDetails ] = useState([])
    const [ adoptions, setAdoptions ] = useState([])
    const [ updated, setUpdated] = useState(true)
    const [isClicked, setIsClicked] = useState(false)
    const [pet, setPet] = useState('')


    useEffect(() => {
        API.getPetDetails().then(res => setPetDetails(res))
        // console.log(petDetails)
        API.getAdoptions().then(res => setAdoptions(res))
        // console.log(adoptions)
    }, [updated])



    const petHeadCells = [ 
        {
            id: 1,
            numeric: false,
            disablePadding: true,
            label: 'SPECIES'
        },
        {
            id: 2,
            numeric: false,
            disablePadding: true,
            label: 'BREED'
        },
        {
            id: 3,
            numeric: false,
            disablePadding: true,
            label: 'NAME'
        },
        {
            id: 4,
            numeric: true,
            disablePadding: true,
            label: 'AGE'
        },
        {
            id: 5,
            numeric: true,
            disablePadding: true,
            label: 'PRICE'
        },
        {
            id: 6,
            numeric: false,
            disablePadding: true,
            label: 'ADOPT PET'
        },
        {
            id: 7,
            numeric: false,
            disablePadding: true,
            label: 'DELETE PET'
        },
        {
            id: 8,
            numeric: false,
            disablePadding: true,
            label: 'DONATOR'
        }
    ]

    const adoptHeadCells = [ 
        {
            id: 1,
            numeric: false,
            disablePadding: true,
            label: 'SPECIES'
        },
        {
            id: 2,
            numeric: false,
            disablePadding: true,
            label: 'BREED'
        },
        {
            id: 3,
            numeric: false,
            disablePadding: true,
            label: 'PET NAME'
        },
        {
            id: 4,
            numeric: true,
            disablePadding: true,
            label: 'PET AGE'
        },
        {
            id: 5,
            numeric: true,
            disablePadding: true,
            label: 'PRICE'
        },
        {
            id: 6,
            numeric: false,
            disablePadding: true,
            label: 'DATE'
        },
        {
            id: 7,
            numeric: false,
            disablePadding: true,
            label: 'ADOPTED BY'
        }
    ]

    const deleteClicked = (id) => {
        API.deletePetDetails({id}).then(() => setUpdated(!updated))
    }

    const adoptClicked = () => {
        setIsClicked(true)
    }

    const adoptionDone = () => {
        setUpdated(!updated)
        setIsClicked(false)
    }
    

    return (
        <>
            {isClicked ? <Adoption pet={pet} userName={props.userName} adoptionDone={adoptionDone}/> : (
                <>
                    <h1 style={{textAlign: "center", marginTop: "30px"}}>Available Pets</h1>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {petHeadCells.map((headCell) => (
                                    <TableCell key={headCell.id}>
                                        <b style={{color: "grey"}}>{headCell.label}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        
                        <TableBody>
                            {petDetails.length > 0 && petDetails.map( (pet) => (
                                (! pet.is_adopted && 
                                <TableRow>
                                    <TableCell>{pet.species}</TableCell>
                                    <TableCell>{pet.breed}</TableCell>
                                    <TableCell>{pet.name}</TableCell>
                                    <TableCell>{pet.age}</TableCell>
                                    <TableCell>{pet.price}</TableCell>
                                    { props.userName === pet.donator ? 
                                        <TableCell><Button disabled>Adopt</Button></TableCell> :
                                        <TableCell><Button onClick={() => {setPet(pet); adoptClicked()}}>Adopt</Button></TableCell> 
                                    }
                                    { props.userName === pet.donator ? 
                                        <TableCell><Button onClick={() => deleteClicked(pet.id)}>Delete</Button></TableCell> :
                                        <TableCell><Button disabled>Delete</Button></TableCell>
                                    }
                                    <TableCell>{pet.donator}</TableCell>
                                </TableRow>)
                            ))}
                        </TableBody>
                    </Table>

                    <h1 style={{textAlign: "center", marginTop: "50px"}}>Adopted Pets</h1>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {adoptHeadCells.map((headCell) => (
                                    <TableCell key={headCell.id}>
                                        <b  style={{color: "grey"}}>{headCell.label}</b>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {adoptions.length > 0 && adoptions.map( (adp) => (
                                (adp.adopter === props.userName &&
                                    <TableRow>
                                        <TableCell>{adp.species}</TableCell>
                                        <TableCell>{adp.breed}</TableCell>
                                        <TableCell>{adp.petName}</TableCell>
                                        <TableCell>{adp.petAge}</TableCell>
                                        <TableCell>{adp.price}</TableCell>
                                        <TableCell>{adp.date}</TableCell>
                                        <TableCell>{adp.adopter}</TableCell>
                                    </TableRow> 
                                )
                            ))}
                        </TableBody>
                    </Table>
                </>)
            }
        </>
    )           
}

export default PetDisplay;