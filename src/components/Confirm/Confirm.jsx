import React,{useState} from "react"
import axios from "axios";
import swal from "sweetalert";
import styles from "../Login/styles.module.css"

import Back2 from '../Background/Back2';
import { Link, useNavigate} from "react-router-dom";



export default function Confirm(){

    let history= useNavigate();

 
let [email, setEmail] = useState("");
let [otp, setOtp] = useState("");
let [verifyOtp, setVerifyOtp] = useState("");

let data = {
  
    email,
    otp,

}

 verifyOtp= localStorage.getItem("otp") ;





async function handleSubmit(e) {
    e.preventDefault();
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var timeStamp = today.getHours() + ":" + (today.getMinutes()+15 )+ ":" + today.getSeconds();
    // if (time > timeStamp) {
    //     swal("OTP Expired!", "Please try again by entering new OTP", "error");
    // }
     if (otp !== verifyOtp) {
        // alert("Invalid otp");
        swal("Invalid OTP!", "Please check the OTP and try again.", "error");
    } else {
        history("/reset");
        return 0;

       
    }
}

    return(
        <div className={styles.login_container}>
            {/* <Back2/> */}
        <div className={styles.login_form_container}>
            <div className={styles.left}>
        <h1>
            Type OTP
        </h1>
             <input
                        style ={{textAlign:"center"}}
                        className={styles.input}
                        type="text"
                        onChange={(e) => {
                            setOtp(e.target.value);
                        }}
                        value={otp}
                        placeholder="Enter OTP"
                        required
                    />
                    <button className={styles.black_btn} onClick={handleSubmit}  >Confirm</button>

        </div>
        </div>
        </div>
    )

}