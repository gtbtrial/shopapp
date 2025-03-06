import axios from "axios";
import { useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
const Weather=()=>
{
	const [city,setcity] = useState();
	const [pdata,setpdata] = useState({});
	const onsearch=async(e)=>
	{
		e.preventDefault();
		try
		{
			const apiresp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0cef9ce50886d905c871f0dd52775df4&units=metric`)

			if(apiresp.status===200)
			{
				if(apiresp.data)
				{
                    setpdata(apiresp.data)
				}
				else
				{
					toast.error("No Info Found")
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
				<li className="active">Search Weather</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Find Weather</h2>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
				<form name="form1" onSubmit={onsearch}>
					<input type="text" placeholder="City Name" name="em" required=" " onChange={(e)=>setcity(e.target.value)} />
					<input type="submit" name="btn" value="Search"/><br/>
					{
					Object.keys(pdata).length>0?
					<>
						<b>Main:- </b> {pdata.weather[0].main}<br/>
						<b>Curr Temp:- </b> {pdata.main.temp}<br/>
						<b>Wind Speed:- </b> {pdata.wind.speed}<br/>
					</>:null
					}

				</form>
			</div>
		</div>
	</div>
        </>
    )
}
export default Weather;