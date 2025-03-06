import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import mycontext from "../UserContext";
const AdminHeaderNav = () => {
    const {userinfo,setuserinfo} = useContext(mycontext);
    const navigate = useNavigate();
    const onlogout=()=>
    {
        setuserinfo(null);
        sessionStorage.clear();
        navigate("/")
    }
    return (
        <>
            <div className="agileits_header">
                <div className="container">
                    <div className="w3l_offers">
                        {
                            <p>Welcome {userinfo.name}</p>
                        }
                    </div>
                    <div className="agile-login">
                        <ul>
                        <li><Link to="/changepassword">Change Password</Link></li>
                        <li><button className="btn btn-primary" onClick={onlogout}>Logout</button></li>
                               
                        </ul>
                    </div>
                    <div className="product_list_header">

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
                        <h1><Link to="/adminhome">ShoppingPoint</Link></h1>
                    </div>
                    <div className="w3l_search">
                        <form action="#" method="post">
                            <input type="search" name="Search" placeholder="Search for a Product..." required="" />
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
                                <li className="active"><Link to="/adminhome" className="act">Home</Link></li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">Manage<b className="caret"></b></a>
                                    <ul className="dropdown-menu multi-column columns-3">
                                        <div className="row">
                                            <div className="multi-gd-img">
                                                <ul className="multi-column-dropdown">
                                                    <h6>Manage All</h6>
                                                    <li><Link to="/managecategory">Category</Link></li>
                                                    <li><Link to="/managesubcategory">Sub Category</Link></li>
                                                    <li><Link to="/manageproduct">Product</Link></li>
                                                    <li><Link to="/createadmin">Create Admin</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">View<b className="caret"></b></a>
                                    <ul className="dropdown-menu multi-column columns-3">
                                        <div className="row">
                                            <div className="multi-gd-img">
                                                <ul className="multi-column-dropdown">
                                                    <h6>View All</h6>
                                                    <li><Link to="/searchuser">Search User</Link></li>
                                                    <li><Link to="/listofmembers">List of Members</Link></li>
                                                    <li><Link to="/vieworders">Orders</Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default AdminHeaderNav;