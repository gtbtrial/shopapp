import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mycontext from "../UserContext";
var UserRoutesProtector=(props)=>
{
    const {userinfo} = useContext(mycontext)
    const mynavigate = useNavigate();
    useEffect(()=>
    {
        if(userinfo===null)
        {
            mynavigate("/login");
        }
    },[])

    return(
        <>
            <props.CompName/>
        </>
    )
}
export default UserRoutesProtector;