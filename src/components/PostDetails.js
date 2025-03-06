import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const PostDetails = () => {

    const [params] = useSearchParams();
    const postid=params.get("pid");
    const [pdetails,setpdetails] = useState({})
    const getpostdetails=async()=>
    {
        try
        {
            const apiresp = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postid}`)
            if(apiresp.status===200)
            {
                setpdetails(apiresp.data)
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
        getpostdetails();
    })
    return (
        <>
            <div className="login">
                <div className="container">
                    <p>{pdetails.id}</p>
                    <p>{pdetails.title}</p>
                    <p>{pdetails.body}</p>

                </div>
            </div>
        </>
    )
}
export default PostDetails;