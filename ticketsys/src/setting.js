import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const id = localStorage.getItem('userid');
    const handleChangename = (event) => {
        setName(event.target.value);
    };

    const handleChangeemail = (event) => {
        setEmail(event.target.value);
    };
    const [showPassword, setShowPassword] = useState(false);
    const handleChangepassword = (event) => {
        setPassword(event.target.value);
    };
    useEffect(() => {
        const getnameuser = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3001/users/getuserbyid/${id}`);
                const userData = response.data;
                setName(userData.fullname);
                setEmail(userData.email);
                setPassword(userData.password);
            } catch (err) {
                console.error(err);
            }
        };
        getnameuser(id);
    }, [id]);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const updateuserprofile = async (id) => {
        try {
           
            const response = await axios.put(`http://127.0.0.1:3001/users/updateuser/${id}`, {
                "fullname": name,
                "email": email,
                "password": password
            });
            if (response.status === 200) {
                // Afficher une alerte si la mise à jour est réussie
                alert("Profile updated successfully!");
            }
            else {
                alert("mission faild");
            }
        } catch (err) {
            console.log("err", err);
        }
    }


    return (
        <div className="row d-flex align-items-center justify-content-center profile-container ">
            <div className="col-md-7 row ">
                <h2 className="text-center">Profile</h2>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        placeholder="Fullname"
                        value={name}
                        onChange={handleChangename}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"

                        value={email}
                        onChange={handleChangeemail}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <i onClick={toggleShowPassword}>
                        {showPassword ? <i className="bi bi-eye-fill"></i> : <i className="bi bi-eye-slash"></i>}
                    </i>
                    <input
                        type={showPassword ? "text" : "password"}

                        value={password}
                        onChange={handleChangepassword}
                        className="form-control"


                    />

                </div>
                <div className="btn-group  setting">
                    <button type="submit" className=" btn btn-info  mr-2" onClick={() => updateuserprofile(id)}>
                        Save
                    </button>
                    <button type="button" className="btn btn-danger">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
