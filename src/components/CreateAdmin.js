import axios from "axios";
import { useState } from "react";
import { Link} from "react-router-dom";
import { toast } from 'react-toastify';
const CreateAdmin=()=>
{
	const [pname,setpname] = useState();
	const [phone,setphone] = useState();
	const [uname,setuname] = useState();
	const [pass,setpass] = useState();
	const [cpass,setcpass] = useState();
	const onsignup=async (e)=>
	{
		e.preventDefault();
        if(pass===cpass)
        {
            try
            {
                var signupdata = {pname,phone,username:uname,pass}
                const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/createadmin`,signupdata,
                {headers:{authorization: `Bearer ${sessionStorage.getItem("jtoken")}`}}
                )
                if(apiresp.status===200)
                {
                    if(apiresp.data.code===1)
                    {
                        toast.success("Admin created successfully")
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
    return(
        <>
			
            <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Create Admin</li>
			</ol>
		</div>
	</div>
	<div className="register">
		<div className="container">
			<h2>Create Admin</h2>
			<div className="login-form-grids">
				<h5>profile information</h5>
				<form onSubmit={onsignup}>
					<input type="text" name="pname" placeholder="Name..." required=" " onChange={(e)=>setpname(e.target.value)} />
					<input type="text" name="phone" placeholder="Phone..." required=" " onChange={(e)=>setphone(e.target.value)}/ >
				
				<h6>Login information</h6>
					<input type="email" name="em" placeholder="Email Address(Username)" required=" " onChange={(e)=>setuname(e.target.value)}/>
					<input type="password" name="pass" placeholder="Password" required=" " onChange={(e)=>setpass(e.target.value)} />
					<input type="password" name="cpass" placeholder="Password Confirmation" required=" " onChange={(e)=>setcpass(e.target.value)}/>
					<input type="submit" value="Create Admin"/>
				</form>
			</div>
			
		</div>
	</div>
        </>
    )
}
export default CreateAdmin;