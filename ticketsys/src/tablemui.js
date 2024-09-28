import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Link,useParams } from "react-router-dom";


const columns = ["id", "send-by", "title", "status", "date", "editer","delete"];

const Tablemui = () => {
  const [localInfo, setLocalInfo] = useState([]);
  //const { id } = useParams();

  useEffect(() => {
    // Function to get all items from local storage
    const getAllLocalStorageData = () => {
      const data = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
          const parsedValue = JSON.parse(storedValue);
          data.push({ key, value: parsedValue.content, time: parsedValue.time, title: parsedValue.title, user: parsedValue.user });
        }
      }
      return data;
    };

    // Set the local storage data when the component mounts
    setLocalInfo(getAllLocalStorageData());
  }, []); // Empty dependency array means this effect runs once after the initial render
  const [status,setStatus]=useState('closed');
  const [nbrdell, setNbrdell] = useState(0);
  function supprimer(item){
  localStorage.removeItem(item.key);
  setNbrdell((prevNbrdell) => prevNbrdell + 1);
  window.location.href="/";
  console.log(nbrdell);

}

  const data = localInfo.map((item) => [item.key, item.user, item.title, status, item.time,
    <Link to={`/afficher_reponse/${item.key}`}>
    <button className="btn btn-info" onClick={()=>setStatus('open')}>Read</button>
  </Link>, <button className="btn btn-danger" onClick={() =>supprimer(item)}>delete</button>]); // Adjust the empty values accordingly

  const options = {
    filterType: 'checkbox',
    sort:true,
    rowsPerPageOptions:[5,10,30,100],
    responsive:'standard',
  
  };
 
  return (
    <>
      <MUIDataTable
        title={"Tickets List"}
        data={data}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default Tablemui;
