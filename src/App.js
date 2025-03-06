import HeaderNav from './components/HeaderNav'
import Footer from './components/Footer'
import SiteRoutes from './components/SiteRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import mycontext from './UserContext';
import AdminHeaderNav from './components/AdminHeaderNav';
import Cookies from 'universal-cookie';
import api from './components/Api';
const cobj = new Cookies();
function App() {
  const [userinfo,setuserinfo] = useState(null);
  const [uid,setuid] = useState("");
  useEffect(()=>
  {
      if(sessionStorage.getItem("userdata")!==null)
      {
        setuserinfo(JSON.parse(sessionStorage.getItem("userdata")))
      }

      if(cobj.get("ucookie"))
      {
        setuid(cobj.get("ucookie"));
      }

  },[])

  useEffect(()=>
  {
    if(uid!=="")
    {
      fetchudetails();
    }
  },[uid])

  async function fetchudetails()
  {
    const apiresp = await api.get(`/api/fetchudetailsbyid?id=${uid}`)
      if(apiresp.status===200)
      {
        if(apiresp.data.code===1)
        {
          setuserinfo(apiresp.data.membdata);
          sessionStorage.setItem("userdata", JSON.stringify(apiresp.data.membdata))
        }
      }
  }
  return (
    <div className="App">
      <ToastContainer theme='colored'/>
      <mycontext.Provider value={{userinfo,setuserinfo}}>        
        {
          userinfo===null?<HeaderNav/>
          :userinfo.usertype==="admin"?<AdminHeaderNav/>
          :userinfo.usertype==="normal"?<HeaderNav/>
          :null
        }
        
        <SiteRoutes/>
        <Footer/>
      </mycontext.Provider>

    </div>
  );
}
export default App;
