import React from 'react';
import './App.css';
import NavBar from './components/navBar';
import PetDisplay from './components/petDisplay';
import Donate from './components/Donate';
import { useState } from 'react';


function App(props) {
  const [ donateView, setDonateView ] = useState(false)
  // console.log(props.userName)

  const donateClicked = () => {
    setDonateView(true)
  }

  const donationDone = () => {
    setDonateView(false)
  }

  return (
    <>
      <NavBar userName={props.userName} donateClicked={donateClicked} />
      {donateView ?
        <Donate userName={props.userName} donationDone={donationDone}/> :
        <PetDisplay userName={props.userName}/>
      }
    </>
  ) 
}

export default App;
