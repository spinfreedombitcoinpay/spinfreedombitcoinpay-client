import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link,  useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { customAlphabet } from 'nanoid';
import Back from "../Background/Back"
import PopupOtp from "../Popup/PopupOtp";
import swal from "sweetalert";
import Back2 from "../Background/Back2";


const nanoid = customAlphabet('123456789', 7);

const Signup = () => {
	const currentLocation = useLocation();
    let referralId = new URLSearchParams(currentLocation.search).get("referral");
	// console.log(referralId);
	// const location = useLocation();
	// let referralId= location.state.referralid;
	// if(location.state.referralid == null){
	// 	referralId= "none"
	// }
	// console.log(location);
	// console.log(referralId);

    if(referralId ==null){
		referralId= "none"
	}
	const [data, setData] = useState({
		fname: "",		
		lname: "",		
		email: "",
		country: "",
		number: "",
		password: "",
		cpassword:"",
	    inviteReferralCode: referralId,
		userReferralCode:nanoid(),
		referredCount: 0,
		// prizes: location.state.prizes,
		// prizeCount:0
	});

	let [email, setEmail] = useState("");
    let [otp, setOtp] = useState("");
    let [verifyOtp, setVerifyOtp] = useState("");
    let [timeStamp, setTimeStamp] = useState("");

	const [error, setError] = useState("");
	const [isOpen,setIsOpen] = useState(true)
	const navigate = useNavigate();

	function toggle(e){
		if(data.fname && data.lname && data.email && data.country && data.password && data.cpassword){
			if(data.password==data.cpassword){
		e.preventDefault();
		setIsOpen(!isOpen);
			}else{
				e.preventDefault();
				swal("Passwords Not Matching", "Please enter same password", "error");
			}
	}
	// else{
	// 	swal("Fields are empty!", "Please fill all mandatory fields", "error");
	// }

	}

	const handleChange = ({ currentTarget: input }) => {
        setEmail(data.email);
		setData({ ...data, [input.name]: input.value });
	};

	async function handleOtp(e) {
        e.preventDefault();
		// setEmail(data.email);
            // axios.post("http://localhost:8080/api/handleotp", {email})
            axios.post("/api/handleotp", {email})
            .then((response) => {
            //    console.log(response.data);
               setVerifyOtp(response.data.otp);
               setTimeStamp(response.data.timeStamp);
			   swal("OTP Sent!", "Please check your email.", "success");
			//    console.log(email);
				var today = new Date();

			 	 timeStamp = today.getHours() + ":" + (today.getMinutes()+15 )+ ":" + today.getSeconds();
				 console.log(timeStamp);
              	 localStorage.setItem("otp",response.data.otp);
				
               
   
           });
         
             
    }

	verifyOtp= localStorage.getItem("otp") ;

	async function handleConfirm(e) {
		e.preventDefault();
		var today = new Date();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		console.log(time);
		// if (time > timeStamp) {
		// 	swal("OTP Expired!", "Please try again by entering new OTP", "error");
		// }
		if (otp !== verifyOtp) {
			// alert("Invalid otp");
			swal("Invalid OTP!", "Please check the OTP and try again.", "error");
		} else {
			if(data.password===data.cpassword){
				try {
					// const url = `http://localhost:8080/api/users/signup?referral=${referralId}`;
					// const url = `/api/users/signup?referral=${referralId}`;
					const url = "/api/users/signup";
					if (data.number== ""){data.number=0;}
					const { data: res } = await axios.post(url, data);
					swal("User Registered!", "Please Login Now", "success");
					navigate("/login");
					// console.log(res.message);
				} catch (error) {
					if (
						error.response &&
						error.response.status >= 400 &&
						error.response.status <= 500
					) {
						setError(error.response.data.message);
						console.log(error.response);
						// swal(`${error}`, "Your Password should be atleast 8 characters long and contain atleast one uppercase letter, one lower case letter, one symbol and one number.", "error");
						swal(`${error}`, `${error.response.data.message}`, "error");
					}
				}
			}
			else{
				swal("Passwords did not match", "Your Password and Confirm Password should be same", "error");
			}
	}
	}


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// const url = `http://localhost:8080/api/users/signup?referral=${referralId}`;
			// const url = `/api/users/signup?referral=${referralId}`;
			const url = "/api/users/signup";
			// const url = `http://localhost:8080/api/users/signup`;
			if (data.number== ""){data.number=0;}
			const { data: res } = await axios.post(url, data);
			// navigate("/login",{state:{email:data.email, prizes:location.state.prizes}});
			navigate("/login");
			// console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	
	return (
		<div className={styles.signup_container}>
		{/* <Back2/> */}
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.golden_btn}>
							LogIn
						</button>
					</Link>
				</div>
				<div className={styles.right}>
			{isOpen?<form className={styles.form_container} >			{/* onSubmit={handleSubmit} */}  {/* {()=>setIsOpen(true)} */}
						<h1>Create account</h1>
						<input
							type = "text"
							placeholder = "First Name"
							name = "fname"
							onChange = {handleChange}
							value = {data.fname}
							required
							className = {styles.input}
						/>

                        <input
							type = "text"
							placeholder = "Last Name"
							name = "lname"
							onChange = {handleChange}
							value = {data.lname}
							required
							className = {styles.input}
						/>
					
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Country"
							name="country"
							onChange={handleChange}
							value={data.country}
							required
							className={styles.input}
						/>
							<input
							type="text"
							placeholder="WhatsApp Number(Optional)"
							name="number"
							onChange={handleChange}
							value={data.number}
							
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
							<input
							type="password"
							placeholder="Confirm Password"
							name="cpassword"
							onChange={handleChange}
							value={data.cpassword}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button  onClick={toggle}
							className={styles.black_btn}>
							SignUp
						</button>
					
					</form>: <PopupOtp 
							handleClose={toggle}
							content={
								<div className={styles.right}>
								<h2>
									Press this button to send OTP
								</h2>
								<button onClick={handleOtp} className={styles.black_btn}>
											Send OTP
										</button>
									<input
											style ={{textAlign:"center",width:"50%"}}
											className={styles.input}
											type="text"
											onChange={(e) => {
												setOtp(e.target.value);
											}}
											value={otp}
											placeholder="Enter OTP"
											required
										/>
									
										<button onClick={handleConfirm} className={styles.black_btn}>
											Confirm OTP
										</button>
								</div>
							}
						/> 
													}
						
				</div>
			</div>
		</div>
	);
};

export default Signup;
