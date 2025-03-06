import axios from "axios";
import { useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from 'universal-cookie';
const MyCookies=()=>
{
	const [data,setdata] = useState();
	const [data2,setdata2] = useState();
	const cobj = new Cookies();
	const onsubmit=async(e)=>
	{
		try
		{
			cobj.set("ucookie",data,{ maxAge: 60*60*24*7 })
		}
		catch(e)
		{
			toast.error(e.message)
		}
	}
	const onread=async(e)=>
	{
		try
		{
			if(cobj.get("ucookie"))
			{
				setdata2(cobj.get("ucookie"));
			}
			else
			{
				setdata2("Cookie not available");
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
				<li className="active">Cookies</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Cookies</h2>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1">
			<input type="text" placeholder="Name" name="em" required=" " onChange={(e)=>setdata(e.target.value)} />
			<input type="button" name="btn" value="Save" onClick={onsubmit}/>
			<input type="button" name="btn2" value="Read" onClick={onread}/><br/>
			{data2}
				</form>
			</div>
		</div>
	</div>
        </>
    )
}
export default MyCookies;