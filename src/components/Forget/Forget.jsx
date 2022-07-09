import React,{useState} from "react"
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate} from "react-router-dom";
import styles from "../Login/styles.module.css"
import Back2 from "../Background/Back2";

export default function Forget(){

    let history= useNavigate();
    const navigate = useNavigate();


   
    let [email, setEmail] = useState("");
    let [otp, setOtp] = useState("");
    let [verifyOtp, setVerifyOtp] = useState("");
    let [timeStamp, setTimeStamp] = useState("");
    let data = {
     
        email,
        otp,
      
    }

 /*    async function handleSubmit(e) {
        e.preventDefault();
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        if (time > timeStamp) {
            swal("OTP Expired!", "Please try again by entering new OTP", "error");
        }
        else if (otp !== verifyOtp) {
            // alert("Invalid otp");
            swal("Invalid OTP!", "Please check the OTP and try again.", "error");
        } else {
            if (password === cPassword) {
                axios.post("http://localhost:5000/createuser", data)
                    .then((response) => {
                        console.log(response.data);
                        if (response.data.status === 200) {
                            swal("Registered!", "Your account has been registered.", "success")
                        }else if(response.data.status===409){
                            swal("Already exists!", "This email is already registered please log in.", "error")
                        } else {
                            swal("Error", "An error occurred, please try again.", "error")
                        }
                    });
            } else {
                // alert("Password do not match");
                swal("Passwords do not match!", "Please check the password and try again.", "error");
            }
        }
    }
 */

    async function handleOtp() {
        /* e.preventDefault(); */
            
            if(email){
            //   axios.post("http://localhost:8080/api/handleotp", { email })
              axios.post("/api/handleotp", { email })
         .then((response) => {
            console.log(response.data);
            setVerifyOtp(response.data.otp);
            setTimeStamp(response.data.timeStamp);
            localStorage.setItem("otp",response.data.otp);
            localStorage.setItem("email", email);         

        });
        navigate("/confirm");
    }
    // else{
    //     swal("Field is empty", "Please enter your email", "error");
    // }
    }
    
    

/* const axiosData=handleOtp();
console.log("api data" +axiosData); */
    const [ user, setUser] = useState({
        email:""
    })

    const handleChange = e => {
       setEmail(e.target.value);
    }

    return(

        <div className={styles.login_container}>
            {/* <Back2/> */}
        <div className={styles.login_form_container}>
            <div className={styles.left}>
        <form className={styles.form_container}>

        
          <h1>
              Send OTP
          </h1>
            <input style ={{textAlign:"center"}} className={styles.input} type="text" name="email" value={email} placeholder="Enter your Email" onChange={ handleChange } required ></input>
         
         {/* <Link to ="/confirm"> */}
         <button className={styles.black_btn} onClick={handleOtp} > Send OTP</button>
         {/* </Link> */}
         
            </form>

        </div>
        </div>
        </div>
    )
}
