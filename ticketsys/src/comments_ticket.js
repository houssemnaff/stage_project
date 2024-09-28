import React, { useEffect, useState } from "react";
import './afficher_reponse.css';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

const CommentsTicket = () => {
    const Comment = ()=>{
    const [ticket, setTicket] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3001/tickets/getbyId/${id}`);
                setTicket(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id,ticket]);

    return (
        <div className="container">
        {ticket && (
            <div key={ticket._id} className="card">
                <div className="card-body">
                    <h5 className="card-title">Ticket: {ticket.title}</h5>
                    {ticket.comments && ticket.comments.map((comment) => (
                        <div key={comment._id} className="card mb-3">
                            <div className="card-body">
                                <p className="card-text"><strong>Date:</strong> {comment.creatAt}</p>
                                <p className="card-text"><strong>Comment:</strong><br />{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
    
    );
}
return <Comment/>
};

export default CommentsTicket;
