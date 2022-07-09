import {
   Routes,Route,Navigate
} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Forget from "./components/Forget/Forget";
import Confirm from "./components/Confirm/Confirm";
import Reset from "./components/Reset/Reset";
import Wheel from "./components/Wheel/wheel";
import Dashboard from "./components/Dashboard/Dashboard";


function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Wheel />} />}
			<Route path="/wheel" exact element ={<Wheel/>}/>
			<Route path="/signup"  element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/forget" exact element={<Forget />} />
			<Route path="/confirm" exact element={<Confirm />} />
			<Route path="/Reset" exact element={<Reset />} />
			<Route path="/Dashboard" element={<Dashboard />} />
			<Route path="/" element={<Navigate replace to="/wheel" />} />
		</Routes>
	);
}

export default App;
