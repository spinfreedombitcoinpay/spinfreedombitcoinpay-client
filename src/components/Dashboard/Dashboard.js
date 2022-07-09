import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Dashboard.css"
import Back from "../Background/Back";
import styles from "../Login/styles.module.css";
import {FacebookShareButton,WhatsappShareButton} from "react-share";
import {FacebookIcon,WhatsappIcon} from "react-share";
import Back2 from '../Background/Back2';
import whatsappImg from "../../Assets/whatsappShare.png"


function Dashboard(){
//   let email = localStorage.getItem("email");
//   console.log(email);
const location = useLocation();
// console.log(location);

const [myUniqueCode,setMyUniqueCode]= useState("");
const [myInvitedFriends,setMyInvitedFriends]= useState(0);
const [myEmail,setMyEmail]= useState("");
// let prizeArray = [];
const prizeref = useRef();
const navigate= useNavigate();

const myemail = localStorage.getItem("email");
// axios({
//     method: "get",
//     // url: "http://localhost:8080/api/auth/Dashboard",
//     url: "/api/auth/Dashboard",
//     // headers: {
//     //   "Content-type": "application/json",
//     //   "x-auth-token": `${localStorage.getItem(TOKEN_ID)}`,
//     // },
//   })
//     .then((result) => {
//       if (result.data.success) {
//         setMyUniqueCode(result.data.data.userReferralCode);
//         setMyInvitedFriends(result.data.data.referredCount);
//         setMyEmail(result.data.data.email);
//         // console.log(result.data.data.prizes);
//         prizeref.current.innerHTML= result.data.data.prizes;
//         // console.log(prizeArray);

//         // console.log("finally got orders");
//         // console.log(result.data);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
    
fetch("/api/auth/Dashboard",{
  method:"POST",
  headers:{
    'Content-type':"application/json"
  },
  // body:JSON.stringify(data)
  body:JSON.stringify({email:myemail })
}).then(res=>res.json()).then((data) =>{
  // console.log(data)
    if(data.success){
    setMyUniqueCode(data.data.userReferralCode);
    setMyInvitedFriends(data.data.referredCount);
    setMyEmail(data.data.email);
    prizeref.current.innerHTML= data.data.prizes;
}
})
     
const handleLogout = () =>{
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  // window.location.reload();
  // axios({
  //   method: "POST",
  //   url: "http://localhost:8080/api/auth/Dashboard",
  // })   
}

   
    return(
        <div className='invite'>
         {/* <Back2/> */}
        <div >
            <div >      
        <div className="boxes"> 

   {/*      <div>
        <h1>     
   Congrats!!! You have won <strong><span ref={prizeref}></span></strong></h1> </div>
        <div>
            You have to invite 10 friends to claim your prize. Once they have registered, you can successfully withdraw your rewards.
        </div>
        <div>
            Your referral link:  
            <b>
                
                http://localhost:3000/wheel?referral={myUniqueCode}
  
            </b>
        </div>
        <div>
            Currently you have invited <b>{myInvitedFriends}</b> friends.
        </div>
        <div>
            Your email : {myEmail}
        </div>
 */}
 <h1>
 Congrats!!! You have won <span ref={prizeref}></span>
            <div>
            You need to invite 10 friends and after they join, you can withdraw your funds.
            </div>
                  
           <div>
           <br/>
           Your referral link:
           <br/>
           <a>
           http://www.trustedbitcoinwallet.com/wheel?referral={myUniqueCode} 
            </a>

            {/* <FacebookShareButton url={`http://localhost:3000/wheel?referral=${myUniqueCode}`}> */}
            {/* <FacebookShareButton url={`https://bitcoinwheel.herokuapp.com/wheel?referral=${myUniqueCode}`}> */}
            {/* <FacebookShareButton url={`http://www.trustedbitcoinwallet.com/wheel?referral=${myUniqueCode}`}>
            <FacebookIcon size={32} iconFillColor='white' round={true}/>
            </FacebookShareButton> */}
            {/* <WhatsappShareButton title="Spin and Win 1000$ Bitcoin" url={`https://bitcoinwheel.herokuapp.com/wheel?referral=${myUniqueCode}`}> */}
            <WhatsappShareButton title="Spin and Win 1000$ Bitcoin" url={`http://www.trustedbitcoinwallet.com/wheel?referral=${myUniqueCode}`}>
              {/* <WhatsappIcon size={32} iconFillColor='white' round={true}/> */}
              <img id="watsimg" src={whatsappImg} alt="share to whatsapp" />
            </WhatsappShareButton>
           </div>
           

            <div>
              {/* <WhatsAppIcon fontSize='small'/> */}
            Currently you have invited {myInvitedFriends} friends 
            </div>
            <div>
            Your email : {myEmail}
            </div>
          <div className='flexer'>
          <Link to = "/wheel">
          <button className='golden_button'>        
          Spin again!         
        </button>
        </Link>

        <Link to = "/login">
        <button className="golden_button" onClick={handleLogout}>         
          Log out         
        </button>
        </Link>
          </div>
          
        </h1>

        
        </div>
        </div>
        </div>
        
        </div>
    )
}

 export default Dashboard;
 