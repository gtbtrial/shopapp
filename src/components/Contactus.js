import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Contactus = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);

//   useEffect(() => {
//     const loadRecaptcha = () => 
// 	{
//       if (window.grecaptcha && window.grecaptcha.render) 
// 		{
//         window.grecaptcha.render("recaptcha-container", 
// 		{
//           sitekey: "6LfZidkqAAAAACfhgnj9ViCxdo2r2-XsoVkqp46x", // Replace with your actual site key
//           callback: (token) => setCaptchaToken(token),
//         });
//       } 
// 	  else 
// 	  {
//         setTimeout(loadRecaptcha, 500); // Retry after 500ms if not loaded
//       }
//     };

//     // Check if reCAPTCHA script is already loaded
//     if (!window.grecaptcha) 
// 	{
//       const script = document.createElement("script");
//       script.src = "https://www.google.com/recaptcha/api.js";
//       script.async = true;
//       script.defer = true;
//       script.onload = loadRecaptcha; // Ensure reCAPTCHA loads before calling render
//       document.body.appendChild(script);
//     } 
// 	else 
// 	{
//       loadRecaptcha();
//     }
//   }, []);

useEffect(() => {
    // Ensure reCAPTCHA is loaded
    if (window.grecaptcha) 
	  {
      window.grecaptcha.render("recaptcha-container", 
	    {
        sitekey: "6LfZidkqAAAAACfhgnj9ViCxdo2r2-XsoVkqp46x", // Your site key
        callback: (token) => setCaptchaToken(token),
      });
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please complete the reCAPTCHA.");
      return;
    }

    try {
      const apidata = { name, phone, email, msg: message, captchaToken };
      const apiresp = await axios.post(`${process.env.REACT_APP_APIURL}/api/contactus`, apidata);

      if (apiresp.status === 200) {
        toast.info(apiresp.data.message);
      } else {
        toast.error("Some error occurred, try again");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <div className="breadcrumbs">
        <div className="container">
          <ol className="breadcrumb breadcrumb1 animated wow slideInLeft" data-wow-delay=".5s">
            <li><Link to="/"><span className="glyphicon glyphicon-home" aria-hidden="true"></span>Home</Link></li>
            <li className="active">Contact Us</li>
          </ol>
        </div>
      </div>
      <div className="login">
        <div className="container">
          <h2>Contact Us</h2>
          <div className="login-form-grids animated wow slideInUp" data-wow-delay=".5s">
            <form name="form1" onSubmit={onSubmit}>
              <input type="text" placeholder="Name" name="pname" required onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder="Phone" name="phone" required onChange={(e) => setPhone(e.target.value)} />
              <input type="email" placeholder="Email Address" name="em" required onChange={(e) => setEmail(e.target.value)} />
              <br />
              <textarea name="msg" className="form-control" placeholder="Message" onChange={(e) => setMessage(e.target.value)}></textarea>
              <br />
              {/* reCAPTCHA Widget */}
              <div id="recaptcha-container"></div>
              <br />
              <input type="submit" name="btn" value="Submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactus;
