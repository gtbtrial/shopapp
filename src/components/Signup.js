import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { encryptPassword } from "../utils/encryptionUtils";

const Signup=()=>
{
	const [pname,setpname] = useState();
	const [phone,setphone] = useState();
	const [uname,setuname] = useState();
	const [pass,setpass] = useState();
	const [cpass,setcpass] = useState();
	const [terms,setterms] = useState();
	const navigate = useNavigate();

	const onsignup=async (e)=>
	{
		e.preventDefault();
		const { encryptedData, iv } = await encryptPassword(pass);
		if(terms===true)
		{
			if(pass===cpass)
			{
				try
				{
					var signupdata = {pname,phone,username:uname, pass: encryptedData, iv}
					const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/register`,signupdata)
					if(apiresp.status===200)
					{
						if(apiresp.data.code===1)
						{
							navigate("/thanks");
						}
						else if(apiresp.data.code===2)
						{
							toast.warn("Your signup is successfull, but error in sending activation mail");
						}
						else if(apiresp.data.code===0)
						{
							toast.error("Error while signing up");
						}
						else if(apiresp.data.code===-1)
						{
							toast.error("Error while signing up" + apiresp.data.errmsg);
						}
					}
					else
					{
						toast.error("Error while signing up")
					}
				}
				catch(e)
				{
					toast.error(e.message)
				}
			}
			else
			{
				toast.warning("Password and confirm password doesn't match");
			}
		}
		else
		{
			toast.error("Please accept terms & conditions");
		}
	}
    return(
        <>
			
            <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Register Page</li>
			</ol>
		</div>
	</div>
	<div className="register">
		<div className="container">
			<h2>Register Here</h2>
			<div className="login-form-grids">
				<h5>profile information</h5>
				<form onSubmit={onsignup}>
					<input type="text" name="pname" placeholder="Name..." required=" " onChange={(e)=>setpname(e.target.value)} />
					<input type="text" name="phone" placeholder="Phone..." pattern="[6789][0-9]{9}" required=" " onChange={(e)=>setphone(e.target.value)} / >
				
				<h6>Login information</h6>
					<input type="email" name="em" placeholder="Email Address(Username)" required=" " onChange={(e)=>setuname(e.target.value)}/>
			<input type="password" name="pass" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$" placeholder="Password" required=" " onChange={(e)=>setpass(e.target.value)} />
					<input type="password" name="cpass" placeholder="Password Confirmation" required=" " onChange={(e)=>setcpass(e.target.value)}/>
					<div className="register-check-box">
						<div className="check">
							<label className="checkbox"><input type="checkbox" name="termscbx" onChange={(e)=>setterms(e.target.checked)}/><i> </i>I accept the terms and conditions</label>
						</div>
					</div>
					<input type="submit" value="Register"/>
				</form>
			</div>
			
		</div>
	</div>
        </>
    )
}
export default Signup;