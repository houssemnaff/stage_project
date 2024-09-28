import React from 'react';
import { Routes, Route } from "react-router-dom";
import Dashboard from './Dashboard';
import Side from './side';
import Afficher_reponse from './afficher_reponse';
import Allclients from './affiertousclient';
import Setting from './setting';
const Admin = () => {
  return (
    <div className="d-flex  ">
      <div className="col-2 sidebar">
        <Side />
      </div>
      <div className='col-10'>
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path='/setting' element={<Setting/>}/>
          <Route path="allclients" element={<Allclients/>}/>
          <Route path='afficher_reponse/:id' element={<Afficher_reponse />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
