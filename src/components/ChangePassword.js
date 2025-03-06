
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import mycontext from "../UserContext";
import api from './Api';
const ChangePassword=()=>
{
	const [currpass,setcurrpass] = useState();
	const [newpass,setnewpass] = useState();
	const [cnewpass,setcnewpass] = useState();
	const navigate = useNavigate();
	const {userinfo,setuserinfo} = useContext(mycontext)

    // useEffect(()=>
    // {
    //     if(userinfo===null)
    //     {
    //         toast.info("Please login to change password");
    //         navigate("/login");
    //     }
    // },[])

	const handlesubmit=async(e)=>
	{
		e.preventDefault();
		try
		{
            if(newpass===cnewpass)
            {
                const apidata = {currpass,newpass,uname:userinfo.username}
                console.log("Cookies in browser:", document.cookie);

                const apiresp = await api.put(`/api/changepass`,apidata)

                if(apiresp.status===200)
                {
                    if(apiresp.data.code===1)
                    {
                        toast.success("Password changed successfully");
                        toast.info("You have been logged out, login with new password");
                        setuserinfo(null);
                        sessionStorage.clear();
                        navigate("/")
                        
                    }
                    else if(apiresp.data.code===2)
                    {
                        toast.error("Current Password Incorrect")
                    }
                    else if(apiresp.data.code===0)
                    {
                        toast.error("Error while changing password, try again")
                    }
                }
                else
                {
                    toast.error("Some error occured, try again")
                }
            }
            else
            {
                toast.warn("New Password and confirm new password doesn't  match")
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
				<li className="active">Change Password</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Change Password</h2>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
		<form name="form1" onSubmit={handlesubmit}>
		<input type="password" placeholder="Current Password" name="cpass" required=" " onChange={(e)=>setcurrpass(e.target.value)}/>
		<input type="password" placeholder="New Password" name="npass" required=" " onChange={(e)=>setnewpass(e.target.value)}/>
		<input type="password" placeholder="Confirm New Password" name="cnpass" required=" " onChange={(e)=>setcnewpass(e.target.value)}/>
		<input type="submit" name="btn" value="Change Password"/>
		</form>
			</div>
		</div>
	</div>
        </>
    )
}
export default ChangePassword;