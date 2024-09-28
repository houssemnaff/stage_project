import React, { useEffect, useState } from "react";
import email_icon from '../assets/email1.png';
import { Outlet, Link } from "react-router-dom";
import axios from "axios";
import './auth.css';
const Getpassword = () => {

    const getpassword = async () => {
        try {
            if(!email){
                alert("inserter votre email");
            }
           else{
            const response = await axios.post('http://127.0.0.1:3001/sendemail/getpassword', {  email });
            if (response.data.find === "oui") {
                alert("Votre mot de passe a été envoyé avec succès.");
            } else {
                alert("L'email n'existe pas.");
            }
           }
           
        } catch (error) {
            console.error('Erreur lors de la requête axios:', error);
        }
    };



   

    const [email, setEmail] = useState("");
    const handleChangeemail = (event) => {
        setEmail(event.target.value);
    };
    return (
      
        <div className=" pass">
            
            <div className="inputt " value={email} onChange={handleChangeemail}>
                <img src={email_icon} alt="" />
                <input type="text" placeholder="email" required />
            </div>
            <div className="submit-container">
            <button onClick={getpassword} className="  btn btn-lg btn-primary w-100 fs-6 text-white"> send</button>
            <Link to="/">  <button  className=" btn btn-lg btn-primary w-100 fs-5 text-whit" style={{ fontSize: "8px" }}>go back</button></Link>
            </div>
            </div>
            )};
            export default Getpassword;