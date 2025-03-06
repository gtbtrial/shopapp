import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mycontext from "../UserContext";
import Cookies from "universal-cookie";
import api from './Api';
const HeaderNav = () => {
    const {userinfo,setuserinfo} = useContext(mycontext);
    const [searchtext,setsearchtext] = useState();
    const navigate = useNavigate();
    const cobj = new Cookies();
    const onlogout=async ()=>
    {
        try 
        {
            const response =  await api.post("/api/logout");
            if (response.data.code === 1) 
            {
                setuserinfo(null);
                sessionStorage.clear();
                if(cobj.get("ucookie"))
                {
                    cobj.remove("ucookie");
                }
                navigate("/")
            } 
        } 
        catch (error) 
        {
            console.error("Logout Error:", error);
        }
    }
    const gotocart=()=>
    {
        navigate("/showcart")
    }
    const searchprods=(e)=>
    {
        e.preventDefault();
        navigate(`/searchresults?s=${searchtext}`);
    }
    return (
        <>
            <div className="agileits_header">
                <div className="container">
                    <div className="w3l_offers">
                        {
                            userinfo===null?
                            <p>Welcome Guest</p>:
                            <p>Welcome {userinfo.name}</p>
                        }
                    </div>
                    <div className="agile-login">
                        <ul>
                            {
                                userinfo!==null?
                                <>
                                    <li><Link to="/orderhistory">Order History</Link></li>
                                    <li><Link to="/changepassword">Change Password</Link></li>
                                    <li><button className="btn btn-primary" onClick={onlogout}>Logout</button></li>
                                </>:
                                <>
                                 <li><Link to="/signup">Signup</Link></li>
                                 <li><Link to="/login">Login</Link></li>
                                </>
                            }

                        </ul>
                    </div>
                    <div className="product_list_header">
                        
                            <button className="w3view-cart" type="submit" name="submit" value="" onClick={gotocart}>
                                <i className="fa fa-cart-arrow-down" aria-hidden="true"></i></button>

                    </div>
                    <div className="clearfix"> </div>
                </div>
            </div>

            <div className="logo_products">
                <div className="container">
                    <div className="w3ls_logo_products_left1">
                        <ul className="phone_email">
                            <li><i className="fa fa-phone" aria-hidden="true"></i>Order online or call us : (+0123) 234 567</li>

                        </ul>
                    </div>
                    <div className="w3ls_logo_products_left">
                        <h1><Link to="/">ShoppingPoint</Link></h1>
                    </div>
                    <div className="w3l_search">
                        <form onSubmit={searchprods}>
                            <input type="search" name="Search" placeholder="Search for a Product..." required="" 
                            onChange={(e)=>setsearchtext(e.target.value)} />
                            <button type="submit" className="btn btn-default search" aria-label="Left Align">
                                <i className="fa fa-search" aria-hidden="true"> </i>
                            </button>
                            <div className="clearfix"></div>
                        </form>
                    </div>

                    <div className="clearfix"> </div>
                </div>
            </div>

            <div className="navigation-agileits">
                <div className="container">
                    <nav className="navbar navbar-default">

                        <div className="navbar-header nav_2">
                            <button type="button" className="navbar-toggle collapsed navbar-toggle1" data-toggle="collapse" data-target="#bs-megadropdown-tabs">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="bs-megadropdown-tabs">
                            <ul className="nav navbar-nav">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/categories">Products</Link></li>
                                <li><Link to="/contactus">Contact Us</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default HeaderNav;