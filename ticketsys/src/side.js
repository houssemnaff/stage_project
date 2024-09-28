import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./sidebar.css";
const Side = () => {
  
    const logout =()=>{
        localStorage.removeItem('userid');
        
    }
    return (

        <div className="sidebar d-flex flex-column justify-content-space-between  text-white p-2  vh-100">
           
            <div >
            <div className=''>
                    <i className='bi bi-person fs-5 text-white'></i>
                    <span className='fs-4 text-white'>admin</span>
                </div>


                <hr className='text-secondary mt-2' />
                <ul className='nav nav-pills flex-column p-0 m-0'>
                    <li className='nav-item p-2'>
                        <Link to="/admin" className='nav-link text-white'>
                            <i className='bi bi-table me-2 fs-5'></i>
                            <span className='fs-5'> Dashboard</span>
                        </Link>
                    </li>

                    <li className='nav-item p-2'>
                        <Link to="allclients" className='nav-link text-white'>
                        <i class="bi bi-person-fill-gear me-2 fs-5"></i>
                            <span className='fs-5'>clients</span>
                        </Link>
                    </li>

                    <li className='nav-item p-2'>
                        <Link to="/" className='nav-link text-white'>
                            <i className='bi bi-box-arrow-left me-2 fs-5'></i>
                            <button className='fs-5' onClick={()=>{logout()}}> log-out</button>
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

export default Side;
