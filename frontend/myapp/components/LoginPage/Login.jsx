import React from 'react'
import { useRef, useState } from 'react'
import axios from 'axios';
import './Login.scss'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Login() {

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const usernamePhoneRef = useRef(null);
  const passwordRef = useRef(null);
  const [errors,setErrors] = useState({});

  const [formData,setFormData] = useState({
    Username: "",
    Password: "",
  })

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };



  const handleChange =(e)=>{
    const {name , value} = e.target;
    setFormData((prevData)=>({
      ...prevData,
      [name]: value,
    }));
  }

  const setError=(element,message)=>{
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    errorDisplay.style.fontSize = '15px';
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
   }
 
   const setSuccess=(element)=>{
     const inputControl = element.parentElement;
     const errorDisplay = inputControl.querySelector('.error'); 
     if(errorDisplay){
       errorDisplay.innerText='';
     }
     inputControl.classList.remove('error');
     inputControl.classList.add('success');
    }



    const sendOtpCode = async(email,username)=>{
      console.log('Email = '+email);
      console.log('username = '+username);
    await  axios.post(`${apiUrl}/sendOtpCode`,{email:email,username:username})
      .then((response)=>{
        console.log(response.data.answer);
        if(response.data.answer=='Success'){
          console.log('Email = '+response.data.email);
                              Swal.fire({
                                title: "Confirmation!",
                                html: `Verification code was sent to your email <span style="color: #2d87f0; font-weight: bold;">${response.data.email}</span> to confirm your account`,
                                icon: "success",
                                timer:3500,
                                customClass: {
                                  popup: 'accountVerified-swal-popup', // Custom class to center the popup
                                },
                              });
                              navigate(`/otp-verification/${email}`);
        }
        else if(response.data.answer=='Error'){
                     Swal.fire({
                       title: 'Error',
                       text: 'There was an error appeared during sending a confirmation code in your email !',
                       icon: 'error',
                       confirmButtonText:false,
                       customClass: {
                         popup: 'custom-swal-popup',
                         title: 'custom-swal-title',
                         cancelButton: 'custom-swal-cancel-button',
                         confirmButton: 'custom-swal-confirm-button',
                       },
                     })
        }
      })
      .catch((err)=>{
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: 'There was an error with the server appeared before sending you a confirmation code!',
          icon: 'error',
          confirmButtonText:false,
          customClass: {
            popup: 'custom-swal-popup',
            title: 'custom-swal-title',
            cancelButton: 'custom-swal-cancel-button',
            confirmButton: 'custom-swal-confirm-button',
          },
        })
      })
    }

    const handleConfirm = async (e)=>{
          e.preventDefault();
      const validationErrors = {};
  //    console.log(formData);
          if(formData.Username.trim()==''){
           validationErrors.username = 'You have to put your username';
           
          }
          if(formData.Password.trim()==''){
            validationErrors.password = 'please put you password';
          }
         setErrors(validationErrors);
          if(Object.keys(validationErrors).length==0){
            axios.post(`${apiUrl}/logincheck`,formData)
            .then((response)=>{
       
              if(response.data.answer===1) {
               sessionStorage.setItem('token',response.data.token);
               sessionStorage.setItem('accountId',response.data.account);
               setSuccess(usernamePhoneRef.current);
               setSuccess(passwordRef.current);
               navigate('/admin');
             }
       
            })
            .catch((err)=>{
             if(err.response) {
               console.log(err.response);
                      if(err.response.data.answer===-1){
               setError(usernamePhoneRef.current,"Wrong credentials");
            //   setError(passwordRef.current,"");
             }
             else if(err.response.data.answer===0){
               setError(usernamePhoneRef.current,"Wrong credentials");
             //  setError(passwordRef.current,"");
             }
        {/*
               else if(response.data.answer==='unverified'){
               console.log(response.data.answer);
               console.log(response.data.email);
               const emailAccount = response.data.email;
               const username = response.data.username;
                       Swal.fire({
                         title: 'Account not verified!',
                         text: 'Your account is not verified , Do you want to get a confirmation code in your Gmail',
                         icon: 'warning',
                         showCancelButton: true,
                         confirmButtonText: 'Send',
                         customClass: {
                           popup: 'custom-swal-popup',
                           title: 'custom-swal-title',
                           cancelButton: 'custom-swal-cancel-button',
                           confirmButton: 'custom-swal-confirm-button',
                         },
                         buttonsStyling: false, // To enable the custom class styling
                       }).then((result) => {
                         if (result.isConfirmed) {
                           console.log("Confirmed! Sending OTP...");
                           sendOtpCode(emailAccount, username); // Ensure the function is properly invoked here
                         } else {
                           console.log("Cancelled or dismissed.");
                         }
                       });
             }
         */}
       
             }
             else {
              Swal.fire({
                icon:'error',
                title:'Oops',
                html:'<span style="color:red">Network error,Check operation has failed Please try again Later! </span>',
                showConfirmButton:false,
                timer:4000,
              })
             }
                  
            })
          }
    }



 return (
    <div className="FatherLogin">
      <form onSubmit={handleConfirm}>
        <div className="input-groupLogin">
          <label htmlFor="Username">Admin username </label>
          <input
            type="text"
            placeholder="mohamed_07 or phone....."
            name="Username"
            ref={usernamePhoneRef}
            value={formData.Username}
            onChange={handleChange}
            autoComplete='false'
          />
          <div className="error">
            {errors.username && <span>{errors.username}</span>}
          </div>
        </div>

        <div className="input-groupLogin">
          <label htmlFor="password">Password</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              name="Password"
              ref={passwordRef}
              value={formData.Password}
              onChange={handleChange}
            />
            <span
                  style={{
                    position: "absolute",
                    right: "10%",
                    top: "45%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: showPassword ? "#007BFF" : "#888",
                  }}
            
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
          <div className="error">
            {errors.password && <span>{errors.password}</span>}
          </div>
        </div>

        <div className="forgot-password">
          <a href="/forget-password">
            Forgot Password?
          </a>
        </div>

        <div className="input-groupLogin">
          <button type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
export default Login
