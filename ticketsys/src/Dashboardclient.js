import React, { useEffect, useState } from "react";
import './dashboard.css'
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import axios from "axios";

const DashboardClient = () => {



  const DisplayData = () => {
    const columns = ["title", "status", "date", "editer", "delete"];
    const iduser = localStorage.getItem('userid');
    const options = {
      filterType: 'checkbox',
      sort: true,
      rowsPerPageOptions: [5, 10, 30, 100],
      responsive: 'standard',

    };
    const [Data, setData] = useState([]);
    const [read, setread] = useState(0);
    const [com,setcom]=useState(0);
    useEffect(() => {
      const fetchdata = async () => {
        const reponse = await axios.get(`http://127.0.0.1:3001/tickets/getall/${iduser}`);
        let readCount = 0; // Initialize read count variable
        let reponder = 0;
        for (let ticket of reponse.data) {
          if (ticket.status === 'read') {
            readCount++; // Increment read count if ticket is marked as read
          }
          if (ticket.comments != null) {
            reponder++;
          }
        }
        setData(reponse.data);
        setread(readCount);
        setcom(reponder);

        console.log(Data);
      }
      fetchdata();
    }, [iduser]);

    const supprimer = async (id) => {
      const response = await axios.delete(`http://127.0.0.1:3001/tickets/delete/${id}`);
      const newdata = Data.filter(item => item.id !== id);
      setData(newdata);

      window.location.reload();
    };


    const data = Data.map((item) => [

      item.title,
      item.status,
      item.creatAt,
      <Link to={`afficher_reponse/${item._id}`} className=" btn-info" title="more info" > Read</Link>,
      item.status === 'read' ? (
        <button className=" btn-danger" onClick={() => supprimer(item._id)} title="delete ticket" disabled> Delete </button>)
        : <button className=" btn-danger" onClick={() => supprimer(item._id)} title="delete ticket"> Delete </button>
    ]);


    return (
      <div className="container">
        <div className="row">
          <div className="col-md- mt-2">
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Total Tickets</h2>
                      <i className="bi bi-9-circle"> {Data.length}</i>

                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Read Tickets</h2>
                      <i className="bi bi-book" > {read}</i>
                    </div>
                  </div>
                </div>
                <div className="col-sm">
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">Reponder Tickets</h2>
                      <i className=" bi bi-pen" >{com}</i>
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

export default DashboardClient;
