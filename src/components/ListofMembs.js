import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const ListofMembs=()=>
{
    const [usersdata,setusersdata] = useState([]);
	const fetchusers=async()=>
	{
		try
		{
			const apiresp = await axios.get(`https://jsonplaceholder.typicode.com/users`)
			if(apiresp.status===200)
			{
				setusersdata(apiresp.data)
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
    useEffect(()=>
    {
        fetchusers();
    },[])

    return(
        <>
        <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/adminhome"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">List of users</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			{
                usersdata.length>0?
                <>
                    <h2>List of Users</h2><br/>
                    <table className="timetable_sub">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Username</th>
                            </tr>
                            {
                                usersdata.map((data,i)=>
                                    <tr key={i}>
                                        <td>{data.name}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.address.street}, {data.address.city}, {data.address.zipcode}</td>
                                        <td>{data.username}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </>:<h2>No users found</h2>
            }
		</div>
	</div>
        </>
    )
}
export default ListofMembs;