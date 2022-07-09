import React ,{useState} from "react"
import styled from "styled-components"
import axios from "axios";
import swal from "sweetalert";
import styles from "../Login/styles.module.css"
import {useNavigate } from "react-router-dom";
import style from "./reset.css"
import Back2 from "../Background/Back2";



export default function Reset(){
    const navigate = useNavigate();
    let [password, setPassword] = useState("");
    let [cPassword, setCPassword] = useState("");

    let data = {
      
        email:localStorage.getItem("email"),
        password: password
        
       
    }
    async function handleSubmit(e) {
        e.preventDefault();
        var today = new Date();
        var timeStamp=today.getHours() + ":" + (today.getMinutes()+15) + ":" + today.getSeconds();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // if (time > timeStamp) {
        //     swal("OTP Expired!", "Please try again by entering new OTP", "error");
        // }
       /*  else if (otp !== verifyOtp) {
            // alert("Invalid otp");
            swal("Invalid OTP!", "Please check the OTP and try again.", "error"); 
        }*/
            if (password === cPassword) {
                // axios.post("http://localhost:8080/api/resetpassword",data)
                axios.post("/api/resetpassword",data)
                    .then((response) => {
                          
                        swal("OTP Changed", "Please try logging in with new password", "success");
                        navigate("/login");
                        
                        // console.log(response.data.password);
                        
                        /* if (response.data.status === 200) {
                            swal("Registered!", "Your account has been registered.", "success")
                        }else if(response.data.status===409){
                            swal("Already exists!", "This email is already registered please log in.", "error")
                        } else {
                            swal("Error", "An error occurred, please try again.", "error")
                        } */
                    });
            } else {
                // alert("Password do not match");
                swal("Passwords do not match!", "Please check the password and try again.", "error");
            }
        
    }

    return(
        <div className={styles.login_container}>
            {/* <Back2/> */}
        <div className={styles.login_form_container}>
            <div className={styles.left}>
        <form className="form">

        <h1>
            Now Reset your password
        </h1>
            <ResetPassword>
            <input
                        type="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        
                        className="inp"
                        value={password}
                        placeholder="New Password"
                        required
                    />

                    <input
                        type="password"
                        onChange={(e) => {
                            setCPassword(e.target.value);
                        }}
                        className="inp"
                        value={cPassword}
                        placeholder="Confirm Password"
                        required
                    />
         <button className={styles.black_btn} onClick={handleSubmit} style={{ "width": "50%" }} >SET</button>


                {/* <a href="/">Login Now</a> */}
            </ResetPassword>
        </form>

        </div>
        </div>
        </div>
    )

}
const ResetPassword= styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    padding-top:5px;
    margin-top:10px;
`