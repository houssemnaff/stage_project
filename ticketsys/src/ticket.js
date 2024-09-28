import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import './ticket.css';
import { Button, Box, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";



const Ticket = () => {

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
  const [value, setvalue] = useState('Write here .............');
  const [title, setTitle] = useState('');
  /*  const removeHtmlTags = (html) => {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return doc.body.textContent || "";
    };*/
  const handleChange = (content) => {
    setvalue(content);
  };
  const dell = () => {
    setvalue("");
    setTitle("");
  }

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleSave = async() => {

    // const valeur = removeHtmlTags(value);
  const iduser= localStorage.getItem('userid');
  console.log(iduser);
    const data = {
      title: title,
      userid:iduser,
      description: value,
      status: 'closed',
      priority: 'max',
      comments: null
    };
    const jsondata = JSON.stringify(data);

    const repponse=await axios.post('http://127.0.0.1:3001/tickets/add', jsondata, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    alert("content saved successfully")
    setvalue("");
    setTitle("");


  };



  return (
    <>
      <div>
        <lu className=' fs-4 prec nav-link  prec-button'>
          <Link to="/Client" className='text-dark ' title='Back'>
            <i className='bi bi-arrow-left-circle-fill '> </i>
           
          </Link>
        </lu>

      </div>
      <div style={{ textAlign: 'left' }} className='container'>

        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={handleChangeTitle}
          style={{ background: 'white' }}
        />
        <div className='reactquill'>
          <ReactQuill
            theme='snow'
            value={value}
            onChange={handleChange}
            modules={modules}
            formats={formats}
          />
        </div>
        <Box className="button" mt={3}>
          <Button variant="outlined" endIcon={<SendIcon />} onClick={handleSave} className='Button'  > Save</Button>
          <Button variant="outlined" color="error" endIcon={<DeleteIcon />} className='Delete' onClick={dell}>Delete</Button>
        </Box >
      </div>

    </>
  );
}
export default Ticket;