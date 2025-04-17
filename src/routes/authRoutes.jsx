import React from 'react'
import { Login } from '../components/pages/login'

import { Route,Routes } from "react-router";
import { RecoverPassword } from '../components/pages/RecoverPassword';

export const AuthRoutes = () => {
  return (
    // <>hola</>
    <Routes>
      <Route  index element={<Login/>} />
      <Route path="/recover-password" element={<RecoverPassword/>} />
    </Routes>
  )
}
