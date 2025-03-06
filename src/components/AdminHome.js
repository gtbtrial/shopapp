import { Link } from "react-router-dom";

const AdminHome = () => {
    return (
        <>
            <div className="login">
                <div className="container">
                    <h2>Welcome Admin</h2>
                    <Link to="/searchuser">Search User</Link><br/>
                    <Link to="/listofMembers">List of Members</Link><br/>
                    <Link to="/createadmin">Create Admin</Link><br/>
                    <Link to="/managecategory">Manage Category</Link><br/>
                    <Link to="/managesubcategory">Manage Sub Category</Link><br/>
                </div>
            </div>
        </>
    )
}
export default AdminHome;