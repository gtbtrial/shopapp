import axios from "axios";
import { useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import api from "./Api";
const SearchUser=()=>
{
	const [uname,setuname] = useState();
	const [pdata,setpdata] = useState({});
	const onsearch=async(e)=>
	{
		e.preventDefault();
		try
		{
			const apiresp = await api.get(`/api/searchuser?un=${uname}`)
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
                    setpdata(apiresp.data.membdata)
				}
				else
				{
					toast.error("Incorrect Username")
					setpdata({});
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
				<li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Search User</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Search User</h2>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" onSubmit={onsearch}>
					<input type="email" placeholder="Email Address" name="em" required=" " onChange={(e)=>setuname(e.target.value)} />
					<input type="submit" name="btn" value="Search"/><br/>
					{
					Object.keys(pdata).length>0?
					<>
						<b>Name:- </b> {pdata.name}<br/>
						<b>Phone:- </b> {pdata.phone}<br/>
					</>:null
					}

				</form>
			</div>
		</div>
	</div>
        </>
    )
}
export default SearchUser;