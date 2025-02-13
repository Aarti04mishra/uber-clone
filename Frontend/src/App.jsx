import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from'./pages/Login'
import Signup from './pages/Signup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Start from './pages/Start'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainLogout from './pages/CaptainLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Start/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/captain-login' element={<CaptainLogin/>}/>
      <Route path='/captain-signup' element={<CaptainSignup/>}/>
      <Route path='/Home' element={<UserProtectWrapper><Home/></UserProtectWrapper>}/>
      <Route path='/user/logout' element={<UserProtectWrapper><UserLogout/></UserProtectWrapper>}/>
      <Route path='/captain/logout' element={<CaptainProtectWrapper><CaptainLogout/></CaptainProtectWrapper>}/>
      <Route path='/Captain/Home' element={<CaptainProtectWrapper><CaptainHome/></CaptainProtectWrapper>}/>
      <Route path='/Riding' element={<Riding/>}/>
      <Route path='/captain-riding' element={<CaptainProtectWrapper><CaptainRiding/></CaptainProtectWrapper>}/>


    </Routes>
  )
}

export default App
