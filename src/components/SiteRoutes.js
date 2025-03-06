import { Route, Routes } from "react-router-dom";
import Login from './Login';
import Signup from "./Signup";
import Home from "./Home";
import Thanks from "./Thanks";
import SearchUser from "./SearchUser";
import ListofUsers from "./ListofUsers";
import AdminHome from "./AdminHome";
import CreateAdmin from "./CreateAdmin";
import ManageCategory from "./ManageCategory";
import ManageSubCategory from "./ManageSubCategory";
import ManageProduct from "./ManageProduct";
import ChangePassword from "./ChangePassword";
import Categories from "./Categories";
import SubCategories from "./SubCategories";
import Products from "./Products";
import Details from "./Details";
import ShowCart from "./ShowCart";
import Checkout from "./Checkout";
import Ordersummary from "./Ordersummary";
import SearchProds from "./SearchProds";
import ViewOrders from "./ViewOrders";
import OrderItems from "./OrderItems";
import UpdateStatus from "./UpdateStatus";
import OrderHistory from "./OrderHistory";
import ListofMembs from "./ListofMembs";
import ViewPosts from "./ViewPosts";
import PostDetails from "./PostDetails";
import ViewComments from "./ViewComments";
import Weather from "./Weather";
import Contactus from "./Contactus";
import ForgotPass from "./ForgotPass";
import ResetPassword from "./ResetPassword";
import Cookies from "universal-cookie";
import MyCookies from "./MyCookies";
import UserRoutesProtector from "./UserRoutesProtector";
var SiteRoutes=()=>
{
    return(
        <>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/thanks" element={<Thanks/>}/>
            <Route path="/searchuser" element={<SearchUser/>}/>
            <Route path="/listofmembers" element={<ListofUsers/>}/>
            <Route path="/adminhome" element={<AdminHome/>}/>
            <Route path="/createadmin" element={<CreateAdmin/>}/>
            <Route path="/managecategory" element={<ManageCategory/>}/>
            <Route path="/managesubcategory" element={<ManageSubCategory/>}/>
            <Route path="/manageproduct" element={<ManageProduct/>}/>
            <Route path='/changepassword' element={<UserRoutesProtector CompName={ChangePassword}/>}/>
            <Route path="/categories" element={<Categories/>}/>
            <Route path="/subcategories" element={<SubCategories/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/details" element={<Details/>}/>
            <Route path="/showcart" element={<ShowCart/>}/>
            <Route path="/checkout" element={<Checkout/>}/>
            <Route path="/ordersummary" element={<Ordersummary/>}/>
            <Route path="/searchresults" element={<SearchProds/>}/>
            <Route path="/vieworders" element={<ViewOrders/>}/>
            <Route path="/orderitems" element={<OrderItems/>}/>
            <Route path="/updatestatus" element={<UpdateStatus/>}/>
            <Route path="/orderhistory" element={<OrderHistory/>}/>
            <Route path="/listofusers" element={<ListofMembs/>}/>
            <Route path="/viewposts" element={<ViewPosts/>}/>
            <Route path="/postdetails" element={<PostDetails/>}/>
            <Route path="/viewcomments" element={<ViewComments/>}/>
            <Route path="/weather" element={<Weather/>}/>
            <Route path="/contactus" element={<Contactus/>}/>
            <Route path="/forgotpassword" element={<ForgotPass/>}/>
            <Route path="/resetpassword" element={<ResetPassword/>}/>
            <Route path="/cookies" element={<MyCookies/>}/>
        </Routes>
        </>
    )
}
export default SiteRoutes;