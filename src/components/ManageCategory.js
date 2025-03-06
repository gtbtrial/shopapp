import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useFetchCategories  from "./useFetchCategories";
import api from "./Api";

const ManageCategory=()=>
{
	const [catname,setcatname] = useState();
	const [catpic,setcatpic] = useState(null);
	const [disporder,setdisporder] = useState();
	const [catid,setcatid] = useState();
	const fileInputRef = useRef(null);
	const [picname,setpicname] = useState();

	// const [allcat,setallcat] = useState([]);

	const [editmode,seteditmode] = useState(false);
	const { allcat, fetchAllCat } = useFetchCategories();

	const onformsubmit=async(e)=>
	{
		if(editmode===false)
		{
			addcategory(e);
		}
		else if(editmode===true)
		{
			updatedb(e);
		}
	}

	const addcategory=async(e)=>
	{
		e.preventDefault();
		try
		{
            const myform = new FormData();
            myform.append("cname",catname)
            myform.append("disporder",disporder)
            if(catpic!==null)
            {
                myform.append("cpic",catpic)
            }

			const apiresp = await api.post(`/api/savecategory`,myform)

			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
                   toast.success("Category added successfully")
				   fetchAllCat();
					
				   clearfields();
				}
				else
				{
					toast.error("Category not added");					
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
	const clearfields=()=>
	{
		setcatname("");
		setdisporder("");
		if (fileInputRef.current) 
		{
			fileInputRef.current.value = "";//it will clear only html field
			setcatpic(null);// it will clear file from state variable
		}
		setpicname("");
		setcatid("");
	}

	// const fetchallcat=async()=>
	// {
	// 	try
	// 	{
	// 		const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/getallcat`)
	// 		if(apiresp.status===200)
	// 		{
	// 			if(apiresp.data.code===1)
	// 			{
	// 				setallcat(apiresp.data.catdata)
	// 			}
	// 			else
	// 			{
	// 				setallcat([]);
	// 			}
	// 		}
	// 		else
	// 		{
	// 			toast.error("Some error occured, try again")
	// 		}
	// 	}
	// 	catch(e)
	// 	{
	// 		toast.error(e.message)
	// 	}
	// }

	// useEffect(()=>
	// {
	// 	fetchallcat();
	// },[])

	const ondel=async(catid)=>
	{
		try
		{
			const uchoice = window.confirm("Are you sure to delete?")
			if(uchoice===true)
			{
				const apiresp = await axios.delete(`${process.env.REACT_APP_APIURL}/api/delcat?cid=${catid}`)
				if(apiresp.status===200)
				{
					if(apiresp.data.code===1)
					{
						toast.success("Category deleted successfully");
						fetchAllCat();
					}
					else
					{
						toast.error("Category not deleted");
					}
				}
			}
		}
		catch(e)
		{
			toast.error(e.message)
		}
	}

	const onupdate=(catinfo)=>
	{
		seteditmode(true);
		setcatname(catinfo.catname)
		setdisporder(catinfo.disporder)
		setpicname(catinfo.catpic);
		setcatid(catinfo._id)
	}
	const oncancel=()=>
	{
		seteditmode(false)
		clearfields();
	}

	const updatedb=async(e)=>
	{
		e.preventDefault();
		try
		{
			const formdata = new FormData();
			formdata.append("cname",catname) // either oldname or new name
			formdata.append("disporder",disporder) //either old displayorder or new
			formdata.append("oldpicname",picname) // current image name
			formdata.append("cid",catid);
			if(catpic!==null)
			{
				formdata.append("cpic",catpic) // if admin will select new image, then only new image file will be sent to api
			}

			const apiresp=await axios.put(`${process.env.REACT_APP_APIURL}/api/updatecat`,formdata)
			if(apiresp.status===200)
			{
				if(apiresp.data.code===1)
				{
					toast.success("Category updated successfully")
					oncancel();
					fetchAllCat();
				}
				else
				{
					toast.error("Category not updated")
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
				<li className="active">Manage Category</li>
			</ol>
		</div>
	</div>
	<div className="login">
		<div className="container">
			<h2>Manage Category</h2>
			<div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
		<form name="form1" onSubmit={onformsubmit}>
		<input type="text" value={catname} placeholder="Category Name" name="cname" required=" " onChange={(e)=>setcatname(e.target.value)}/><br/>

		<input type="text" value={disporder} placeholder="Display Order" name="dorder" required=" " onChange={(e)=>setdisporder(e.target.value)} /><br/>

		{editmode?
		<>
			<img src={`uploads/${picname}`} height='75' alt="CategoryImage"/>
			Choose new image if required<br/><br/>
			</>:null
		}

        <input type="file" ref={fileInputRef} name="cpic" onChange={(e)=>setcatpic(e.target.files[0])}/>

 

				{editmode===false?<input type="submit" name="btn" value="Add"/>:null}

				{
				editmode?
				<>
				<input type="submit" name="btn2" value="Update"/>
				<input type="button" onClick={oncancel} name="btn3" value="Cancel"/>
				</>:null
				}

				</form>
			</div><br/>
			{
				allcat && allcat.length > 0?
				<>
					<h2>Added Categories</h2><br/>
					<table className="timetable_sub">
						<tbody>
							<tr>
								<th>Picture</th>
								<th>Category Name</th>
								<th>Display Order</th>
								<th>Update</th>
								<th>Delete</th>
							</tr>
							{
							allcat.map((cat,index)=>
								<tr key={index}>
									<td><img alt="categorypic" src={`uploads/${cat.catpic}`} height='75'/></td>
									<td>{cat.catname}</td>
									<td>{cat.disporder}</td>
									<td><button className="btn btn-primary" onClick={()=>onupdate(cat)}>Update</button></td>
									<td><button className="btn btn-danger" onClick={()=>ondel(cat._id)}>Delete</button></td>
								</tr>
							)
							}<br/>
							{allcat.length} categories found
						</tbody>
					</table>
				</>:<h2>No Categories available</h2>
			}
			


		</div>
	</div>
        </>
    )
}
export default ManageCategory;