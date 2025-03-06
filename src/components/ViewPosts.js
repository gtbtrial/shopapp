import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const ViewPosts=()=>
{
    const [postsdata,setpostsdaa] = useState([]);
	const fetchusers=async()=>
	{
		try
		{
			const apiresp = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
			if(apiresp.status===200)
			{
				setpostsdaa(apiresp.data)
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
                postsdata.length>0?
                <>
                    <h2>All Posts</h2><br/>
                    <table className="timetable_sub">
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>View</th>
                            </tr>
                            {
                                postsdata.map((data,i)=>
                                    <tr key={i}>
                                        <td>{data.id}</td>
                                        <td><Link to={`/postdetails?pid=${data.id}`}>{data.title}</Link></td>
                                        <td><Link to={`/viewcomments?pid=${data.id}`}>View Comments</Link></td>
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
export default ViewPosts;