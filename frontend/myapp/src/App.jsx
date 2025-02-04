import { useEffect, useRef } from 'react'
import SignUp from '../components/SignUpPage/SignUp'
import Login from '../components/LoginPage/Login'
import ForgetPassword from '../components/ForgetPassword/ForgetPassword'
import ResetPassword from '../components/ResetPassword/ResetPassword'
import HomePage from '../components/HomePage/HomePage'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import BaseLayout from '../components/Admin/layout/BaseLayout'
import AdminHome from '../components/Admin/sidebarPages/adminHomePage/AdminHome'
import Appointments from '../components/Admin/sidebarPages/appointments/Appointments'
import DoctorsManagement from '../components/Admin/sidebarPages/doctorsManagement/DoctorsManagement'
import Statistics from '../components/Admin/sidebarPages/statistics/Statistics'
import History from '../components/Admin/sidebarPages/history/History'
import Settings from '../components/Admin/sidebarPages/settings/Settings'
import OtpVerificationDegits from '../components/OtpVerification/OtpVerificationDegits'
import DoctorsList from '../components/Doctors/DoctorsList'
import AppointmentBooking from '../components/AppointmentBooking/AppointmentBooking'
import CreateReservation from '../components/Admin/sidebarPages/createReservation/createReservation';
import AdminHistory from '../components/Admin/sidebarPages/adminHistory/AdminHistory'
import './App.scss'
import io from 'socket.io-client'
import { LanguageProvider } from '../context/LanguageContext';

function App() {
  const socketRef = useRef('');
  const apiUrl = import.meta.env.VITE_API_URL;
  
  useEffect(() => {
    socketRef.current = io(`${apiUrl}`, {
      auth: {secret: 'this is socket io in clinic project'},
      query: {data: 20033008}
    })
  }, []);

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/admin/login' element={<Login/>} />
          <Route path='/forget-password' element={<ForgetPassword/>} />
          <Route path='/reset-password/:email/:token' element={<ResetPassword/>} />
          <Route path='/otp-verification/:email' element={<OtpVerificationDegits/>} />
          
          {/* New clinic routes */}
          <Route path='/doctors' element={<DoctorsList/>} />
          <Route path='/AppointmentBooking' element={<AppointmentBooking/>} />
          
          {/* Admin routes */}
          <Route element={<BaseLayout/>}>
            <Route path='/admin' element={<Statistics/>} />
            <Route path='/admin/doctors' element={<DoctorsManagement/>} />
            <Route path='/admin/create-reservation' element={<CreateReservation/>} />
            <Route path='/admin/appointments' element={<Appointments/>} />
            {/* <Route path='/admin/statistics' element={<Statistics/>} /> */}
            <Route path='/admin/history' element={<AdminHistory/>} />
            <Route path='/admin/settings' element={<Settings/>} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </LanguageProvider>
  )
}

export default App
