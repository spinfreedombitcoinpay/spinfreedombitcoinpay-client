import { useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Back from "../Background/Back"
import Back2 from "../Background/Back2";


const Login = () => {
	const location = useLocation();
	// console.log(location);
	const navigate = useNavigate();
	const [data, setData] = useState({ email: "", password: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// const url = "http://localhost:8080/api/auth";
			const url = "/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);			
			// localStorage.setItem("email", data.email);			
            localStorage.setItem("email", data.email);
			// window.location = "/";
			// navigate('/dashboard', {state:{email:data.email, prizes:location.state.prizes}});
			navigate('/dashboard');

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
		<div className={styles.login_container}>
		{/* <Back2/> */}
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
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
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}

						<button  type="submit" className={styles.black_btn}>
							 LogIn
						</button>
						<a href="/forget">Forgotten Password?</a>

					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.golden_btn}>
							SignUp
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;
