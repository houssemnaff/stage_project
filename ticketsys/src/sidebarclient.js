import React, { useState,useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./sidebar.css";
import axios from "axios";
const Sidebarclient = () => {
    const logout =()=>{
        localStorage.removeItem('userid');
    }
    const id = localStorage.getItem('userid');
    const [name,setname]=useState('');
    useEffect(() => {
        const getnameuser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3001/users/getuserbyid/${id}`);
                const userData = response.data;
                setname(userData.fullname);
              
            } catch (err) {
                console.error(err);
            }
        };
        getnameuser(id);
    }, [id]);
    return (

        <div className="sidebar d-flex flex-column justify-content-space-between  text-white p-2  vh-100">
            <div>
                <div j='d-flex align-itmes-center'>
                    <i className='bi bi-person fs-4 text-white'></i>
                    <span className='fs-4 text-white'>{name}</span>
                </div>
                <hr className='text-secondary mt-2' />
                <ul className='nav nav-pills flex-column p-0 m-0'>
                    <li className='nav-item p-2'>
                        <Link to="/Client" className='nav-link text-white'>
                            <i className='bi bi-table me-2 fs-5'></i>
                            <span className='fs-5'> Dashboard</span>
                        </Link>
                    </li>
                    <li className='nav-item p-2'>
                        <Link to="ticket" className='nav-link text-white'>
                            <i className='bi bi-file-earmark-plus me-2 fs-5'></i>
                            <span className='fs-5'> Add-tikcets</span>
                        </Link>
                    </li>
                    <li className='nav-item p-2'>
                        <Link to="/" className='nav-link text-white'>
                            <i className='bi bi-box-arrow-left me-2 fs-5'></i>
                            <button onClick={()=>{logout()}} className='fs-5'> log-out</button>
                        </Link>
                    </li>
                  
                  
                </ul>
            </div>
            <div>
                <hr className='text-secondary' />
                <Link to="./setting" className='nav-link text-white nav-item'>
                <i className='bi bi-gear fs-5 text-white'></i>
              
                <span className='text-white fs-4'> setting</span>
                </Link>
            </div>
            <Outlet />
        </div>


    )
};

export default Sidebarclient;
