import React from "react";
import login_icon from '../assets/login.png';
import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import { useState } from "react";
import email_icon from '../assets/email1.png';
import person_icon from '../assets/person.png';
import erreur_icon from '../assets/loginerreur.png';
import password_icon from '../assets/password.png';
const New = () => {
    const [action, setAction] = useState("Login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [img,setimg]=useState("null");
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
            if (!email || !password || !name) {
                setMessage('Remplir tous les champs');
                setimg("oui");
            } else if (!/\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(email)) {
                setMessage("email incorrect");
                setimg("oui");
            } else {
                const response = await axios.post('http://127.0.0.1:3001/users/adduser', { fullname: name, email: email, password: password });
               if(response.data.link){
                setAction("Login");
               }else {
                setAction("Sign Up");
               }
               
               
                console.log(response.data.message);
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('Erreur lors de la requête axios:', error);
        }
    };
    
    const login = async () => {
        try {
         if(!email || !password){
            setMessage('Remplir tous les champs');
            setimg("oui");
         }else{
           
            const response = await axios.post('http://127.0.0.1:3001/users/getuser', { email, password });
            if(response.data.user!=null){
             localStorage.setItem('userid', response.data.user._id);
              setMessage(response.data.message);
             // console.log(response.data);
              window.location.href = response.data.link;
              //console.log(response.data.user._id);
            }else{
              setMessage(response.data.message);
             //console.log(response.data.message);
              //console.log(response.data.user._id);
            }
         }
        } catch (error) {
            console.error('Erreur lors de la requête axios:', error);
        }
    };
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="row border rounded-5 p-3 bg-white shadow box-area">
                    <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: "#103cbe" }}>
                        <div className="featured-image mb-3">
                            <img src={img==="oui"? erreur_icon:login_icon} className="img-fluid" style={{ width: "350px",height:"300px" }} alt="featured" />
                        </div>
                        <p className="text-white fs-2" style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: 600 }}>Be Verified</p>
                    </div>


                    <div className="col-md-6 right-box">
                        <div className="row align-items-center">
                            <div className="header-text mb-4">
                                <h2>Hello, Again</h2>
                                <p>We are happy to have you back.</p>
                                {img === "oui" && (
            <div className="alert alert-danger">{message}</div>
        )}
        {img === "no" && (
            <div className="alert alert-success">{message}</div>
        )}


                            </div>
                            {action === "Sign Up" && (
                                <div className="input-group mb-3 bg-light">
                                     <img src={person_icon} alt=""style={{ margin: "5px 2px" , height: "30px"}} className="  bg-light " />
                                    <input   onChange={handleChangename} type="text" className="form-control form-control-lg bg-light fs-6" value={name} placeholder="Name" style={{ border: "none" }}/>
                                </div>
                            )}


                            <div className="input-group mb-3 bg-light">
                            <img src={email_icon} alt=""style={{ margin: "5px 2px" , height: "30px"}} className="  bg-light " />
                                <input onChange={handleChangeemail} value={email} style={{ border: "none" }} type="email" className="form-control form-control-lg bg-light fs-6" placeholder="Email address" />
                            </div>

                            <div className="input-group mb-3 bg-light">
                            <img src={password_icon} alt=""style={{ margin: "5px 2px" , height: "30px"}} className="  bg-light " />
                                <input onClick={toggleShowPassword}onChange={handleChangepassword} style={{ border: "none" }} value={password} type="password" className="form-control form-control-lg bg-light fs-6" placeholder="password" />
                            </div>
                            <div className="input-group mb-5 d-flex justify-content-between">
                                <div className="form-check">

                                </div>
                                <div className="forgot">
                                  {action==="Login"&&  <small><Link to="/getpassword">Forgot Password?</Link></small>}
                                </div>
                            </div>
                            {action === "Login" &&
                             <div className="input-group mb-3">
                             <button className= "btn btn-lg btn-primary w-100 fs-6" onClick={() =>  login() }>Login</button>
                             </div>
                            }
                           
                           {action === "Sign Up" &&
                             <div className="input-group mb-3">
                             <button className= "btn btn-lg btn-primary w-100 fs-6" onClick={() => { signing() }}>Sign Up</button>
                             </div>
                            }
                            <div className="row">
                                {action ==="Login"?<small>Don't have account? <button onClick={() => setAction("Sign Up")} style={{ border: "none",background:"transparent" }} >Sign Up</button></small>:<small> have account? <button onClick={() => setAction("Login")} style={{ border: "none",background:"transparent" }} >Login</button></small>}
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    /*onClick={() => setAction("Sign Up")}*/

};

export default New;
