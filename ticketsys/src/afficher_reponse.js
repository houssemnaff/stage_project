import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Box } from '@mui/material';
import './afficher_reponse.css';
import axios from 'axios';
import { Outlet, Link } from "react-router-dom";
import Comments_ticket from './comments_ticket';
const Afficher_reponse = () => {
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
const[userid,setuserid]=useState(null);
  const [value, setValue] = useState('Write here .............');
  const [content, setContent] = useState('');
  const handleChange = () => {
    setValue("");
  };
  const removeHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
 
  const handleSave = async() => {
    const iduser= localStorage.getItem('userid');
    const response = await axios.get(`http://127.0.0.1:3001/users/getuserbyid/${iduser}`);
    const role = response.data.role;
    console.log(role);
     const valeur = removeHtmlTags(value);
    const data = 
  {
    "userid": iduser,
    "text": valeur,
    "title":"reponse",
   
  };
  // console.log(data);
    
    const jsondata = JSON.stringify(data);
    const jdata=[jsondata]
    //console.log("jsondata",jsondata);
    try {
      if(role!='client'){
        const update = await axios.get(`http://127.0.0.1:3001/sendemail/updateprofile/${userid}`);
      }
     
      const response = await axios.post(`http://127.0.0.1:3001/comments/addcomment/${id}`, jsondata, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Response:", response.data);
      alert("Content saved successfully");
      setValue("");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save content. Please try again later.");
    }


  };
  useEffect(() => {
    const getTicket = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3001/tickets/getbyId/${id}`);
        setContent(response.data);
        setuserid(response.data.userid);
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    }
    getTicket();
  }, [id]);

  //console.log(content);
  return (
    <>
      <div>
       

      </div>
      <div className="d-flexml-4">
        <div className='m-4 aa'>
        <h4><u>title : {content.title}</u></h4>
          <h4><u>date de envoyer : {content.creatAt}</u></h4>
          <h5><u>content : </u></h5>
          <ReactQuill
            modules={modules}
            formats={formats}
            theme='snow'
            value={content.description}
            readOnly={true}
          />
        </div>
        <Comments_ticket/>
        <div className='m-4'>
          <h4>reply to ticket</h4>
          <ReactQuill
           // modules={modules}
            //formats={formats}
            theme='snow'
            value={value}
            onChange={setValue}
          />
          <Box className="button" mt={3}>
            <Button variant="contained" endIcon={<SendIcon />} className='Button' onClick={handleSave} > Send</Button>
            <Button variant="contained" color="error" endIcon={<DeleteIcon />} onClick={handleChange} className='Delete' >Delete</Button>
          </Box >
        </div>
      </div>


    </>
  );
};

export default Afficher_reponse;
