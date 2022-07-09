import React, { useRef, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import button from '../../Assets/spinbutton.svg';
// import wheel from '../../Assets/spinwheel.svg';
import wheel from '../../Assets/spin.svg';
import arrow from '../../Assets/arrow.svg';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Confetti from "react-confetti";
import styles from "../Login/styles.module.css"

import Back2 from "../Background/Back2";
import Back from "../Background/Back";

import './wheel.css';
import axios from "axios";
import Signup from "../Singup";
import Sound from "react-sound";
import soundurl from "../../Assets/audio.mpeg";
import RandomVal from "./randomVal";


function Wheel() {

  //for checking isLoggedIn or not
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [myEmail, setMyEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const myemail = localStorage.getItem("email");
  // console.log(myemail);
  // axios({
  //   method: "get",
  //   // url: "http://localhost:8080/api/auth/wheel",
  //   url: "/api/auth/wheel",
  // })
  //   // .then((result) => {
  //   //   if (result.data.success) {
  //   //     setLoggedIn(true);
  //   //     setMyEmail(result.data.data.email);
  //   //     console.log(result.data.data.email)
  //   //   }
  //   //   else{
  //   //     setLoggedIn(false);
  //   //   }
  //   // })
  //   .then((result) => {
  //     if (result.data.success) {
  //       if(result.data.data.email == null){
  //         setLoggedIn(false);
  //       }else{
  //         setLoggedIn(true);
  //       }
  //       // setLoggedIn(true);
  //       setMyEmail(result.data.data.email);
  //       // console.log(result.data.data.email)
  //     }
  //     else{
  //       setLoggedIn(false);
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  //  const currentLocation = useLocation();
  // let referralId = new URLSearchParams(currentLocation.search).get("referral"); 

  const location = useLocation();
  const navigate = useNavigate();
  const wheelRef = useRef();
  const buttonRef = useRef();
  const displayRef = useRef();
  const currentLocation = useLocation();
  let referralId = new URLSearchParams(currentLocation.search).get("referral");


  const [isPlaying, setIsPlaying] = useState(false);

  const[text,setText]=useState(true);

  const [selectedItem, setSelectedItem] = useState("Spin to Win");
  const [dialogHeading, setDialogHeading] = useState("Congratulations!!!");
  const [DialogText, setDialogText] = useState("You have won!!!");
  const [claimButtonActive, setClaimButtonActive] = useState(true);
  const [SpinAgainActive, setSpinAgainActive] = useState(false);
  const spinning = selectedItem !== null ? 'spinning' : '';
  let prizes = [];
  const [prizesWon, setPrizesWon] = useState([]);

  //for popup modal
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  let deg = 0;
  let zoneSize = 22.5; // degree of one sector

  // Counter clockwise
  const symbolSegments = {
    0: "1 Bitcoin",
    1: "0 Bitcoin",
    2: "0.1 Bitcoin",
    3: "250 Dollars",
    4: "Macbook",
    5: "1000 dollars",
    6: "500 dollars",
    7: "10000 dollars",
    8: "iPhone 13 Pro Max",
    9: "0.1 Bitcoin",
    10: "0 Bitcoin",
    11: "2 Bitcoins",
    12: "250 dollars",
    13: "100 dollars",
    14: "5000 dollars",
    15: "iPhone 13 Pro Max",
    16: "1 Bitcoin"
  }

  //displaying prize
  // const handleWin = (actualDeg) => {
  //   const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
  //   displayRef.current.innerHTML = symbolSegments[winningSymbolNr];

  //   setSelectedItem(symbolSegments[winningSymbolNr]);
  //    setData({email:myEmail , prizeName:symbolSegments[winningSymbolNr] });
  //   console.log(data)

  //    fetch("http://localhost:8080/api/auth/wheel",{
  //     method:"POST",
  //     headers:{
  //       'Content-type':"application/json"
  //     },
  //     body:JSON.stringify(data)
  //   }).then(res=>res.json()).then(data=>console.log(data))

  //   if (winningSymbolNr == 1 || winningSymbolNr == 10) {
  //     setDialogHeading("Better luck next time :(");
  //     setDialogText("You didn't win anything :(");
  //     setClaimButtonActive(false);
  //   }
  //   else {
  //     // setPrizesWon(prevItems => [...prevItems, selectedItem]);
  //     setDialogHeading("Congratulations!!!");
  //     setDialogText(`You have won ${symbolSegments[winningSymbolNr]}`);
  //     setClaimButtonActive(true);
  //     // console.log(prizesWon);
  //   }

  //   setTimeout(() => {
  //     setOpen(true);
  //   }, 1000);

  // }

  // console.log(selectedItem)
  // console.log(selectedItem)
  // console.log(selectedItem)
  // prizes.push(selectedItem);

  //starts spinning on clicking button
  const startSpin = () => {
  
    setClaimButtonActive(true);
    setSpinAgainActive(false);
    // Reset display
    displayRef.current.innerHTML = "-";
    setOpen(false);
    setIsOpen(false);
    // Disable button during spin
    buttonRef.current.style.pointerEvents = 'none';
    // Calculate a new rotation between 5000 and 10 000
    deg = Math.floor(1000 + Math.random() * 1000);
    // Set the transition on the wheel
    wheelRef.current.style.transition = 'all 3s ease-out';
    // Rotate the wheel
    wheelRef.current.style.transform = `rotate(${deg}deg)`;
    // Apply the blur
    wheelRef.current.classList.add('blur');
    buttonRef.current.classList.add('blur');

  };

  //executes when spinning transition ends
  const endSpin = () => {
    // Remove blur
    wheelRef.current.classList.remove('blur');
    buttonRef.current.classList.remove('blur');
    

    //calling Confetti
    setIsOpen(true);
    /* setText(!text); */
    // Enable button when spin is over
    buttonRef.current.style.pointerEvents = 'auto';
    // Need to set transition to none as we want to rotate instantly
    wheelRef.current.style.transition = 'none';
    // Calculate degree on a 360 degree basis to get the "natural" real rotation to start the next spin from that one
    // Use modulus to get the rest value

    const actualDeg = deg % 360;


    // Set the real rotation instantly without animation
    wheelRef.current.style.transform = `rotate(${actualDeg}deg)`;
    // Calculate and display the winning symbol
    handleWin(actualDeg);
  };

  const [data, setData] = useState({ email: "", prizeName: "" });
  //displaying prize
  const handleWin = (actualDeg) => {
    const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
    displayRef.current.innerHTML = symbolSegments[winningSymbolNr];

    setSelectedItem(symbolSegments[winningSymbolNr]);

    if (winningSymbolNr == 0) {
      setOpen(false);
     window.location.reload();
      setDialogHeading("Better luck next time :(");
      setDialogText("You didn't win anything :(");
      setClaimButtonActive(false);
      setSpinAgainActive(true);
    }

    if (winningSymbolNr == 1 || winningSymbolNr == 10) {
      setDialogHeading("Better luck next time :(");
      setDialogText("You didn't win anything :(");
      setClaimButtonActive(false);
      setSpinAgainActive(true);
    }
    else {
      
      setIsPlaying(true);
      setTimeout(()=>{
          setIsPlaying(false)
      }, 5000);
      // setPrizesWon(prevItems => [...prevItems, selectedItem]);
      setDialogHeading("Congratulations!!!");
      setDialogText(`You have won ${symbolSegments[winningSymbolNr]}`);
      setClaimButtonActive(true);
      // console.log(prizesWon);
    }
    
    setTimeout(() => {
      
      setOpen(true);
      if (winningSymbolNr != 0 && winningSymbolNr != 1 && winningSymbolNr != 10){

      setData({ email: myemail, prizeName: symbolSegments[winningSymbolNr] });

      // console.log(data)

      //  fetch("http://localhost:8080/api/auth/wheel",{
        
      fetch("/api/auth/wheel", {
        method: "POST",
        headers: {
          'Content-type': "application/json"
        },
        // body:JSON.stringify(data)
        body: JSON.stringify({ email: myemail, prizeName: symbolSegments[winningSymbolNr] })
      }).then(res => res.json()).then(data => console.log(data))
    }
    }, 1000);


  }
   
   
  return (
    <div id="scr">
      {isOpen && <Confetti />}
      
    <div className="App" onLoad={() => setOpen(false)}>
      <Back2 />

      <Sound
      url={soundurl}
      playStatus={
        isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
      }
      volume={15}
      // playFromPosition={000}
    />   
   

      <div id="app">
      <h1 className="glowtext">
        Freedom Bitcoin Pay
      </h1>
      {/* <p>Spin and win 1000$ Bitcoin</p> */}
      <p><marquee>Spin and win 1000$ Bitcoin</marquee></p>
        <img src={arrow} alt='arrow' className='marker' />
        <img src={wheel} ref={wheelRef} alt='wheel' className='wheel' onTransitionEnd={() => endSpin()} />
        <img src={button} ref={buttonRef} alt='button' className='button' onClick={() => startSpin()} />

        {/* this display div box is just for testing, can be removed later if wanted */}
        <div ref={displayRef} className='display buttonClickSpin' onClick={()=>{startSpin()}} >{selectedItem}</div>
      </div>

      {/* This dialog appears after the wheel stops spnning to claim the prize */}
      <Dialog
        open={open}
       //  onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles.left}>


          <DialogTitle id="alert-dialog-title">{dialogHeading}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {DialogText}
            </DialogContentText>
          </DialogContent>
          <DialogActions className={styles.left} >

            {claimButtonActive &&
              //previous code before
              //  <Link to="/login">
              //  <Button onClick={handleClose} color="primary" autoFocus>
              //     Claim Now!
              //   </Button>
              //  </Link>

              //new code for prizes

              //  <Button onClick={()=>navigate(
              //   isLoggedIn ? '/Dashboard' : `/signup?referral=${referralId}`  ,
              //     {state:{referralid:referralId}})} color="primary">
              <button className={styles.black_btn} onClick={() => navigate(
                myemail ? '/Dashboard' : `/signup?referral=${referralId}`,
                { state: { referralid: referralId } }

              )} >
                Claim Now!
              </button>
            }
            {SpinAgainActive &&
              <button className={styles.black_btn} onClick={() => setOpen(false)}>
                Spin again
              </button>
            }



          </DialogActions>
        </div>
      </Dialog>
    </div>
    <RandomVal/>

    </div>
  );
}
/* */

export default Wheel;
