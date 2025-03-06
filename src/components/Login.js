import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import mycontext from "../UserContext";
import Cookies from "universal-cookie";
import api from './Api';
const Login=()=>
{
	const [uname,setuname] = useState();
	const [pass,setpass] = useState();
	const [rembme,setrembme] = useState();
	const navigate = useNavigate();
	const {setuserinfo} = useContext(mycontext)
	const cobj = new Cookies();
	const onlogin=async(e)=>
	{
		e.preventDefault();
		try
		{
			const apidata = {uname,pass}
			const apiresp = await api.post(`/api/login`,apidata)
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
					if(apiresp.data.membdata.isActivated===true)
					{
						setuserinfo(apiresp.data.membdata);
						sessionStorage.setItem("userdata", JSON.stringify(apiresp.data.membdata))
						// console.log("Cookies After Login:", document.cookie);
						// // sessionStorage.setItem("jtoken",apiresp.data.jstoken)
						
						if(apiresp.data.membdata.usertype==="admin")
						{
							navigate("/adminhome")
						}
						else
						{
							if(rembme===true)
							{
								cobj.set("ucookie",apiresp.data.membdata.id,{ maxAge: 60*60*24*7 })
							}
							navigate("/")
						}
					}
					else
					{
						toast.error("Your account is not activated. Please check your mail and activate your account.")
					}
				}
				else
				{
					toast.error("Incorrect Username/Password")
				}
			}
			else
			{
				toast.error("Some error occured, try again")
			}
		}
		catch(e)
		{
			toast.error(e.message)
		}
	}
    return(
        <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Login Page</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Login Form</h2>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" onSubmit={onlogin}>
					<input type="email" placeholder="Email Address" name="em" required=" " onChange={(e)=>setuname(e.target.value)} />
					<input type="password" placeholder="Password" name="pass" required=" " onChange={(e)=>setpass(e.target.value)}/><br/>
					<label><input type="checkbox" name="staylogged" onChange={(e)=>setrembme(e.target.checked)}/> Stay Logged In</label>
					<div class="forgot">
						<Link to="/forgotpassword">Forgot Password?</Link>
					</div>
					<input type="submit" name="btn" value="Login"/>
				</form>
			</div>
		</div>
	</div>
        </>
    )
}
export default Login;