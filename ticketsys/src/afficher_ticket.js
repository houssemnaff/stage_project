import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import './afficher_reponse.css';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";

const Afficher_ticket = () => {
    const { id } = useParams();

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            [{ 'font': [] }],
            ['clean'],
            ['link', 'image', 'video']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'script',
        'indent', 'direction',
        'color', 'background', 'align',
        'link', 'image', 'video'
    ];


    const [content, setContent] = useState('');

    useEffect(() => {
        const getticket = async () => {
            const reponse = await axios.get(`http://127.0.0.1:3001/tickets/getbyId/${id}`);
            setContent(reponse.data);
        }
        getticket();
    }, [id]);
    console.log("data"+content);

    return (
        <>
            <div>
                <lu className=' fs-4 prec nav-link  prec-button'>
                    <Link to="/Client" className='text-dark ' title='Back'>
                        <i className='bi bi-arrow-left-circle-fill '> </i>

                    </Link>
                </lu>

            </div>
            <div className="d-flex ml-4">
                <div className='m-4 ticket row'>
                    <h4><u>ticket N :{content._id}</u></h4>
                    <h4><u>date de envoyer : {content.creatAt}</u></h4>
                    <h4><u>title : {content.title}</u></h4>
                    <h5><u>content : </u></h5>
                    <ReactQuill
                        modules={modules}
                        formats={formats}
                        theme='snow'
                        value={content.description}
                        readOnly={true}
                    />
                </div>

            </div>

            <Outlet />
        </>
    );
};

export default Afficher_ticket;
