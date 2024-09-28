import React, { useEffect, useState } from "react";
import './dashboard.css'
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import axios from "axios";
import { colors } from "@mui/material";
const Dashboard = () => {





  const DisplayData = () => {

    const columns = ["send by", "title", "repondre", "status", "date", "editer", "delete"];

    const options = {
      filterType: 'checkbox',
      sort: true,
      rowsPerPageOptions: [5, 10, 30, 100],
      responsive: 'standard',

    };
    const [Data, setData] = useState([]);
    const [read, setread] = useState(0);
    const [nbruser, setnbruser] = useState(0); const [rep, setrep] = useState(0);


    useEffect(() => {
      const fetchdata = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:3001/tickets/getall');

          let readCount = 0; // Initialize read count variable
          let reponder = 0;
          // Iterate through each ticket to check if it is marked as read
          for (let ticket of response.data) {
            if (ticket.status === 'read') {
              readCount++; // Increment read count if ticket is marked as read
            }
            if (ticket.comments != null) {
              reponder++;
            }

            const name = await getnameuser(ticket.userid);
            ticket.username = name; // Add username to ticket object
          }

          setread(readCount); // Update state with read count
          setrep(reponder);
          setData(response.data);
          const reponse = await axios.get('http://127.0.0.1:3001/users/getall');
          setnbruser(reponse.data.length);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchdata();
    }, []);


    const supprimer = async (id) => {
      try {
        const response = await axios.delete(`http://127.0.0.1:3001/tickets/delete/${id}`);
        const newdata = Data.filter(item => item.id !== id);
       // console.log(id)
        setData(newdata);

        window.location.replace("/admin");
      } catch (err) {
        console.log(err);
      }

    };
    const getnameuser = async (id) => {
      try {
        const reponse = await axios.get(`http://127.0.0.1:3001/users/getuserbyid/${id}`);
        // console.log(reponse.data.fullname);
        return reponse.data.fullname;

      } catch (err) {
        console.log(err);
      }
    }


    const onChangeState = async (id) => {
      try {
        // get le ticket correspondant a cette ID
        const ticket = Data.find(item => item._id === id);

        // verifier si le ticket et trouve ou non
        if (!ticket) {
          console.error(`Ticket with ID ${id} not found.`);
          return;
        }

        // mmodifier le  statuts de ticket
        ticket.status = 'read';

        // Envoyer la requete pour modifier le ticket
        await axios.put(`http://127.0.0.1:3001/tickets/update/${ticket._id}`, ticket);

        console.log('Ticket status updated successfully.');
      } catch (error) {
        console.error('Error updating ticket status:', error);
      }
    };

    //console.log(localStorage.getItem('nbdell'));

    const data = Data.map((item) => {
      let status;

      if (item.status === "closed") {
        status = <p className="closed">{item.status}</p>;
      } else if (item.status === "read") {
        status = <p className="read">{item.status}</p>;
      } else {
        status = <p>{item.status}</p>;
      }

      return [
        item.username,
        item.title,
        item.comments != null ? "oui" : "non",
        status,
        item.creatAt,
        <Link to={`./afficher_reponse/${item._id}`} className=" btn-info" title="more info" onClick={() => onChangeState(item._id)}>
          <i class="bi bi-book-fill fs-6"> read</i>
        </Link>,
        <button className=" btn-danger" onClick={() => { supprimer(item._id) }} title="delete ticket">
          <i className="bi bi-trash3-fill fs-6" > Delete</i>
        </button>
      ];
    });



    return (
      <div className="container">
        <div className="row">
          <div className="col-md- mt-2">
            <div className="container">
              <div className="row">
                <div className="col-sm">
                <div className="card"style={{color:"black" }}>
                    <div className="card-body">
                      <h4 className="card-title" >Total Tickets</h4>
                      <i className="bi bi-9-circle fs-5"> {Data.length}</i>
                    </div>
                  </div>

                </div>
                <div className="col-sm">
                <div className="card"style={{color:"black" }}>
                    <div className="card-body">
                      <h4 className="card-title">Reponder Tickets</h4>
                      <i className="bi bi-pen fs-5" > {rep}</i>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                <div className="card"style={{color:"black" }}>
                    <div className="card-body">
                      <h4 className="card-title">User Number</h4>
                      <i className="bi bi-person fs-5" >{nbruser}</i>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                <div className="card"style={{color:"black" }}>
                    <div className="card-body">
                      <h4 className="card-title">Read Tickets</h4>
                      <i className="bi bi-pen fs-5" > {read}</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col mt-4">
            <MUIDataTable
              title={"Tickets List"}
              data={data}
              columns={columns}
              options={options}
            />
          </div>
        </div>
      </div>
    );
  };

  return <DisplayData />;

};

export default Dashboard;
