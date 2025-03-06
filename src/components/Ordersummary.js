import { useContext, useEffect, useState } from "react";
import { Link} from "react-router-dom";
import { toast } from "react-toastify";
import mycontext from "../UserContext";
import axios from "axios";
const Ordersummary = () => {
    const {userinfo} = useContext(mycontext)
    
    const [orderinfo,setorderinfo] = useState({})
    const [orderitems,setorderitems] = useState([])

    const fetchorderdetails=async()=>
    {
        try
        {
            const apiresp = await axios.get(`${process.env.REACT_APP_APIURL}/api/fetchorderdetails?un=${userinfo.username}`)
            if(apiresp.status===200)
            {
                if(apiresp.data.code===1)
                {
                    setorderinfo(apiresp.data.orderdet)
                    setorderitems(apiresp.data.orderdet.items)
                }
                else
                {
                    toast.error("No order details found")
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
        if(userinfo!==null)
        {
            fetchorderdetails();
        }
    },[userinfo])

    return (
        <>
           <div className="breadcrumbs">
		<div className="container">
			<ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
				<li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
				<li className="active">Order Summary</li>
			</ol>
		</div>
	</div>
            <div className="login">
                <div className="container">
                    <h2>Order Summary</h2><br/>
                    Thanks for shopping on our website. Your order number is {orderinfo._id}<br/>
                    Your order status is {orderinfo.status}<br/><br/>
                    Order Items:-
                    {
                        orderitems.length>0?
                        <>
                        <table className="timetable_sub">
                        <tbody>
                        <tr>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Total Cost</th>
                        </tr>
                        {
                            orderitems.map((data,i)=>
                            <tr key={i}>
                            <td><img src={`uploads/${data.picture}`} height='75'/></td>
                            <td>{data.prodname}</td>
                            <td>₹{data.rate}/-</td>
                            <td>{data.qty}</td>
                            <td>₹{data.totalcost}/-</td>
                            </tr>
                            )
                        }
                        </tbody>
                        </table>
                        </>:null
                    }
                </div>
            </div>
        </>
    )
}
export default Ordersummary;