import React, { useEffect } from 'react'
import Sidebar from '../sidebar/Sidebar'
import {Toaster} from 'sonner';
import { Outlet, useNavigate } from 'react-router-dom'
import {FaHandHoldingMedical } from 'react-icons/fa';
import axios  from 'axios';
function BaseLayout() {
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_API_URL;
                  
                    const token = sessionStorage.getItem('token');
  const fetchUser = async() =>{
     try {
      const response = await axios.get(`${apiUrl}/home`,{
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      })
     //      console.log(response);
           if(response.status !==201) {
            navigate('/login');
           }
     } catch(err){
      navigate('/login')
    
     }
  }

  useEffect(()=>{
      fetchUser();
  },[]);
                  
  return (
  //    token ? (
        <main className="page-wrapper">

        {/**Left side of the page  */}
        <Sidebar />
  
        <div className="content-wrapper">
        <Toaster icons={{
          duration:4000,
          info: <FaHandHoldingMedical size={25} color='#2196f3'/>,
        }}/>
          {/**Right side of the page wich is the content */}
          <Outlet />
  
        </div>
      </main>
   /*
          ) : (
        navigate('/login')
      )
    */
  )
}

export default BaseLayout
