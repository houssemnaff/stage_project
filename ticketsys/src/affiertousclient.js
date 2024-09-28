import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import axios from "axios";
const Allclients = () => {
    
    const Displayuser = () => {

        const columns = ["name", "","role", "", "email", "lieu", "NbrTicket", "delete",  ""];

        const options = {
            filterType: 'checkbox',
            sort: true,
            rowsPerPageOptions: [5, 10, 30, 100],
            responsive: 'standard',
        }
        const [data, setdata] = useState([]);

        useEffect(() => {
            const fetchdata = async () => {
                const reponse = await axios.get('http://127.0.0.1:3001/users/getall');
                setdata(reponse.data);
            }
            fetchdata();


        }, []);




        const supprimer = async (id) => {
            try {
                // Send DELETE request to delete the user with the given ID
              let res=  await axios.delete(`http://127.0.0.1:3001/users/delete/${id}`);
              console.log(res);        
                // Filter out the deleted user from the data and update the state
                const newData = data.filter(item => item._id !== id);
                setdata(newData);
        
                // Redirect to the admin allclients page
               // window.location.replace("/admin/allclients");
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        };
        

        const [ticketCounts, setTicketCounts] = useState({});

        useEffect(() => {
            const fetchTicketCounts = async () => {
                const counts = {};
                for (const client of data) {
                    const response = await axios.get(`http://127.0.0.1:3001/tickets/nbrtickets/${client._id}`);
                    counts[client._id] = response.data;
                }
                setTicketCounts(counts);
            };
            fetchTicketCounts();
        }, [data]);
        const Data = data.map((client) =>

            [
                client.fullname,
                ,
                client.role,
               
                ,
                client.email,

                client.lieu,
                ticketCounts[client._id],
               
                <button className=" btn-danger" onClick={() => { supprimer(client._id) }}> <i className="bi bi-trash3-fill" > Delete</i></button>

                ,

            ]);


        return (
            <div className="container">
                <div className="row w-full">
                    <div className="col-md- mt-2">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm">

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col mt-4">
                        <MUIDataTable
                            title={"User List"}
                            data={Data}
                            columns={columns}
                            options={options}
                        />
                    </div>
                </div>
            </div>


        )
    };
    return <Displayuser />
};
export default Allclients;