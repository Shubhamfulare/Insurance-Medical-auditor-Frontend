// import { getUserInfo } from "../utility";
import axios from "axios";
// import Cookies from "js-cookie";
import { useState } from "react";



const API_URL = import.meta.env.VITE_API_URL;



let baseURL;
let baseUrlGps;

baseURL = API_URL;


const header = {
  // Authorization: Cookies.get("token"),
};




const redirectToLogin = (message, setShowPopup, setPopupMessage) => {
  setPopupMessage(message);
  setShowPopup(true);

  setTimeout(() => {
    localStorage.clear();
    // Cookies.remove("token");
    // Cookies.remove("refresh_token");
    // window.location.href = URL_MAPPING.LOGIN;
    // setShowPopup(false);
  }, 2000);
};

const instance = axios.create({
  baseURL: baseURL,
  headers: header,
});

const instanceGps = axios.create({
  baseURL: baseUrlGps,
  headers: header,
});

// instance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log(error.response, "res");
//     if (
//       error?.response?.status === 401 &&
//       error.response?.data?.detail?.error_code === "invalid_token"
//     ) {
//       redirectToLogin();
//     }
//     if (
//       error?.response?.status === 403 &&
//       error.response?.data?.detail?.error_code === "forbidden"
//     ) {
//       redirectToLogin();
//     }
//     if (error?.response?.status === 500) {
//       alert("Something went wrong. Please try again.");
//     }
//     return Promise.reject(error);
//   }
// );


const useAxiosInstance = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [title, setTitle] = useState('Error');
  const [popupMessage, setPopupMessage] = useState('');

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // const token =  Cookies.get('token')
      // if(!token){
      //   return Promise.reject(error);
      // }
      setTitle('Error')
      if (
        error?.response?.status === 401 &&
        error.response?.data?.detail?.error_code === "invalid_token"
      ) {
        redirectToLogin("Authorization Failed! You have been logged out", setShowPopup, setPopupMessage);
      }
      if (
        error?.response?.status === 403 &&
        error.response?.data?.detail?.error_code === "forbidden"
      ) {
        setTitle('Multiple Device Error')
        // redirectToLogin(`Hi ${getUserInfo()?.name_eng}, It seems that you have recently logged into the same account on another device. Please continue the session there`, setShowPopup, setPopupMessage);
      }
      if (error?.response?.status === 500) {
        setPopupMessage("Something went wrong. Please try again.");
        setShowPopup(true);
      }
      return Promise.reject(error);
    }
  );

  return { instance, instanceGps, showPopup, popupMessage, setShowPopup, title };
};

export default instance;
export { instanceGps, useAxiosInstance };
