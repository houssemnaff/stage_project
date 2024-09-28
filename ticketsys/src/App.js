import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Client from './client';
import Admin from './admin';
import Auth from './client/newauth';
import Getpassword from './client/getpassword';

const App = () => {
  const iduser = localStorage.getItem('userid');

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<Auth />} />
        
        <Route path='/getpassword' index element={<Getpassword />} />
        <Route path='admin/*' index element={iduser?<Admin />:<Navigate to="/"/>} />
        <Route path="Client/*" index element={iduser?<Client />:<Navigate to="/"/>} />

      </Routes>
    </BrowserRouter>

  );
};


export default App;
