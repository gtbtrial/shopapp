import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const ListofUsers=()=>
{
    const [usersdata,setusersdata] = useState([]);

	const [currentPage, setCurrentPage] = useState(1);

    const productsPerPage = 5; // Number of products per page

	const indexOfLastProduct = currentPage * productsPerPage;//2*5=10
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;//10-5=5
    const currentProducts = usersdata.slice(indexOfFirstProduct, indexOfLastProduct);//(5,10)
	const fetchusers=async()=>
	{
		try
		{
			const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getallusers`)
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
					setusersdata(apiresp.data.membsdata)
				}
				else
				{
                    setusersdata([]);
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
    useEffect(()=>
    {
        fetchusers();
    },[])
	const ondel=async (id)=>
	{
		try
		{
			const uchoice = window.confirm("Are you sure to delete?")
			if(uchoice===true)
			{
				const apiresp = await axios.delete(`${process.env.REACT_APP_APIURL}/api/deluser?uid=${id}`)
				if(apiresp.status===200)
				{
					if(apiresp.data.code===1)
					{
						toast.success("User deleted successfully");
						fetchusers();
					}
					else
					{
						toast.error("User not deleted");
					}
				}
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
				<li className="active">List of users</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			{
                currentProducts.length>0?
                <>
                    <h2>List of Users</h2><br/>
                    <table className="timetable_sub">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Username</th>
                                <th>Delete</th>
                            </tr>
                            {
                                currentProducts.map((data,i)=>
                                    <tr key={i}>
                                        <td>{data.name}</td>
                                        <td>{data.phone}</td>
                                        <td>{data.username}</td>
                                        <td><button className="btn btn-danger" onClick={()=>ondel(data._id)}>Delete</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table><br/>
					<div>
                <button className="btn btn-primary" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span> Page {currentPage} of {Math.ceil(usersdata.length / productsPerPage)} </span>
                <button className="btn btn-primary"
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === Math.ceil(usersdata.length / productsPerPage)}
                >
                    Next
                </button>
            	</div>
                </>:<h2>No users found</h2>
            }
		</div>
	</div>
        </>
    )
}
export default ListofUsers;