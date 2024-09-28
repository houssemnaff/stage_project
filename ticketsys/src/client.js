import React from "react";
import Sidebarclient from "./sidebarclient";
import { Routes, Route } from "react-router-dom";
import Ticket from './ticket';
import DashboardClient from "./Dashboardclient";
import Afficher_ticket from "./afficher_ticket";
import Comments_ticket from "./comments_ticket";
import Setting from './setting';
import Afficher_reponse from './afficher_reponse';
const Client = () => {
  return (

    <div className="d-flex">
      <div className="col-auto sidebar">
        <Sidebarclient />
      </div>
      <div className="col-10">
        <Routes>
          <Route   index element={<DashboardClient />} />
          <Route path='/setting' element={<Setting/>}/>
          <Route path="ticket" element={<Ticket />} />
          <Route path='afficher_reponse/:id' element={<Afficher_reponse />} />
          <Route path='afficher_ticket/:id' element={<Afficher_ticket />} />
          <Route path='Comments_ticket/:id' element={<Comments_ticket />} />

        </Routes>
      </div>
    </div>

  );
}
export default Client;