import React from 'react';
// import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {useDelete, useGet, useGetOne, usePatch} from '../customhooks/crudhook'
import { useEffect, useState } from 'react';
import { API_PATH, header, URL_PATH} from '../config.js'
import "../../css/app.css"
import { Link, NavLink, Route } from 'react-router-dom';
import { Routes } from './routes'

 function Template() {
    const [books, setBooks] = useState({data: ''})
    let allBooks = [];
    var arr = []
    var resp = [];
    const path = 'view-book'
    //setLiveStreams(streams => [...streams, ...res.data]);
    // name: res.data.name,
    //             email: res.data.email,
    //             stream_key: res.data.stream_key
    useEffect( async () => {
       const response = await fetch(`${API_PATH}/v1/books`);
       const data = await response.json();

        arr.push(data);
        //console.log(arr)
        setBooks({data : Object.values(arr)})

}, []);
//


   for (const [key, value] of Object.entries(books.data)) {
     for (let i = 0; i < value.length; i++){
       allBooks.push( <div className='col-lg-3' key={i} style={{height:"200px", textAlign:"center", padding:"15px 20px", border
      : "0.4px solid black", borderRadius:"10px"}}> name :  {value[i]['name']} <br /> isbn:  {value[i]['isbn']} <br /> authors : {value[i]['authors']}
      release date : {value[i]['release_date']} <br /> country : {value[i]['country']} <br /> <NavLink className="btn btn-light btn-sm" id={i+1} to={`${path}/${i + 1}`}><i className="fa fa-eye"></i>View</NavLink>
      <button className="btn btn-danger btn-sm" onClick={()=> deleteBook(event.target.id) } style={{marginLeft:"5px"}} id={i + 1} >Delete<i className="fa fa-trash"></i></button></div>)
     }
  }
const deleteBook = (id) => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this record!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            const res = useDelete(API_PATH, 'v1/books', id, header);
    if (res){
        swal("record deleted!", {
            icon: "success",
          });
          setTimeout(()=>{
              location.reload()
          }, 2000)
    }else{
        swal("failed to delete record")
    }

        } else {
          swal("operation aborted");
        }
      });

}

    return (<>


          <nav className="navbar navbar-expand-lg navbar-light bg-light" >
  <div className="container-fluid">
    <a className="navbar-brand text-info" href="#">BookStore</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" aria-disabled="true" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search book by name" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
<div className="row books" style={{ maxWidth:"90%", textalign:"center", marginLeft : "5%", marginTop : "50px"}}>


{allBooks}


<br /><br />
</div>

        </>
    );
}

export default Template;


