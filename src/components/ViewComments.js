import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
const ViewComments=()=>
{
    const [commsdata,setcommsdata] = useState([]);
    const [params] = useSearchParams();
    const postid=params.get("pid");
	const fetchcomments=async()=>
	{
		try
		{
			const apiresp = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}/comments`)
			if(apiresp.status===200)
			{
				setcommsdata(apiresp.data)
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
        fetchcomments();
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
                commsdata.length>0?
                <>
                    <h2>All Posts</h2><br/>
                    <table className="timetable_sub">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Comment</th>
                            </tr>
                            {
                                commsdata.map((data,i)=>
                                    <tr key={i}>
                                        <td>{data.id}</td>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.body}</td>

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </>:<h2>No posts found</h2>
            }
		</div>
	</div>
        </>
    )
}
export default ViewComments;