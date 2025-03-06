import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL}`, // Adjust if your backend runs on a different port
  withCredentials: true, // Allows cookies to be sent with requests
});

export default api;