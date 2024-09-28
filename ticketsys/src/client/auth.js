import React, { useState } from "react";
import './auth.css';
import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import email_icon from '../assets/email1.png';
import person_icon from '../assets/person.png';
import login_icon from '../assets/login.png';
import password_icon from '../assets/password.png';
//import jwt from 'jsonwebtoken';
const Auth = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleChangename = (event) => {
        setName(event.target.value);
    };

    const handleChangeemail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangepassword = (event) => {
        setPassword(event.target.value);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const signing = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:3001/users/adduser', { fullname: name, email: email, password: password });
            //window.location.href = response.data.link;
            console.log(response.data.message);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Erreur lors de la requête axios:', error);
        }
    };
    const login = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:3001/users/getuser', { email, password });
            localStorage.setItem('userid', response.data.user._id);
            setMessage(response.data.message);
            window.location.href = response.data.link;
            console.log(response.data.user._id);
        } catch (error) {
            console.error('Erreur lors de la requête axios:', error);
        }
    };

    return (
        <div className="auth">
            <div className="container">
                <div className="alert alert-warning">{message}
                </div>
                <div className="header">
                    <div className="text">{action}</div>
                    <div className="underline"></div>
                </div>
                <div className="col-2">
                        <img src={login_icon} alt="" />
                    </div>

                <div className="inputs d-flex justify-content-around col-1">
                    
                    {action === "Sign Up" &&
                        <div className="input" value={name} onChange={handleChangename}>
                            <img src={person_icon} alt="" />
                            <input type="text" placeholder="Fullname" required />
                        </div>
                    }
                    <div className="input">
                        <img src={email_icon} alt="email" />
                        <input type="email" placeholder="Email" value={email} onChange={handleChangeemail} required />
                    </div>
                    <div className="input">
                        <img src={password_icon} onClick={toggleShowPassword} />

                        <div onClick={toggleShowPassword}>
                            {showPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash"></i>}
                        </div>

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={handleChangepassword}
                            required
                        />
                    </div>
                  
                </div>
                {action === "Login" ? (
                    <>
                        <div className="forgot-password">Lost password? <span><Link to="/getpassword">click here</Link></span></div>
                        <div className="forgot-password"> <button onClick={() => setAction("Sign Up")} className="btn btn">create account</button></div>
                    </>
                ) : (
                    <div className="forgot-password"><button onClick={() => setAction("Login")} className="btn btn">have account </button></div>
                )}

                <div className="submit-container">
                    <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { signing() }} >Sign Up</div>
                    <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { login() }}>Login</div>
                </div>
            </div> <Outlet />
        </div>

    );
};

export default Auth;
