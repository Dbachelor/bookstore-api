import React from 'react';
import { BrowserRouter as Router, NavLink, useParams, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {useDelete, useGet, useGetOne, usePatch} from '../customhooks/crudhook'
import { useEffect, useState } from 'react';
import { API_PATH, header, URL_PATH} from '../config.js'
import "../../css/app.css"
import { Routes } from './routes'

export function ViewBook(){
    const {id} = useParams()
    const [book, setBook] = useState({data: ''})
    const [authors, setAuthors] = useState('');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [isbn, setIsbn] = useState('');
    const [release_date, setReleaseDate] = useState('');
    const [numberOfPages, setNumberOfPages] = useState(0)
    const arr = []
    const details = []
        useEffect( async () => {
            const response = await fetch(`${API_PATH}/v1/books/${id}`);
            const data = await response.json();

             arr.push(data);
             //console.log(arr)
             setBook({data : Object.values(arr)})

     }, []);
     for (const [key, value] of Object.entries(book.data)) {

        for (let i = 0; i < value.length; i++){
            details.push(value[0]['data']['authors'].toString(),
            value[0]['data']['name'],
            value[0]['data']['country'],
            value[0]['data']['number_of_pages'],
            value[0]['data']['release_date'],
            value[0]['data']['isbn'])
        }
    }
    const processForm = async (id) => {
        const arr = {name : document.querySelector("#name").value, country : document.querySelector('#country').value,
            isbn : document.querySelector('#isbn').value, authors : document.querySelector('#authors').value,
            number_of_pages : document.querySelector('#number_of_pages').value, release_date : document.querySelector("#release_date").value }
           // console.log(arr)
            let data = JSON.stringify(arr);
            //console.log(data);
            let response = await fetch(`${API_PATH}/v1/books/${id}`, {
              method: 'PATCH',
              headers : {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                '_method': 'PATCH',
                'Authorization': ''
            },
              body: data,

            });

            let result = await response.text();

            if (result){
                swal("record updated");
                setTimeout(function(){window.location='/'}, 1800);
            }else{
                swal('failed to update record');
                setTimeout(function(){window.location='/'}, 1800);
            }
            //alert(result);
         // };
    }
    return (
        <>
        <div className="container" style={{ marginTop : "10%", textAlign:"center" }}>
            currently viewing <b>{details[1]}</b><br />
           <center> <div className="alert-light" style={{ maxWidth: "1100px", padding: "20px", textAlign: "center", border: "0.5px solid lightgrey", borderRadius:"12px" }}>

                        <div className="row">
                        <div className="form-group col-lg-4">
                            <label>name</label>
                            <input type="text" className="form-control" required name="name" id="name" onChange={ (e)=>{setName(e.target.value)}}  />
                        </div>
                        <div className="form-group col-lg-4">
                            <label>ISBN</label>
                            <input type="text" className="form-control" required name="isbn" id="isbn" onChange={ (e)=>{setIsbn(e.target.value)}}  />
                        </div>
                        <div className="form-group col-lg-4">
                            <label>Authors</label>
                            <input type="text" className="form-control" required name="authors" id="authors" onChange={ (e)=>{setAuthors(e.target.value)}}  />
                        </div>
                        <div className="form-group col-lg-4">
                            <label>Country</label>
                            <input type="text" className="form-control" required name="country" id="country" onChange={ (e)=>{setCountry(e.target.value)}}  />
                        </div>
                        <div className="form-group col-lg-4">
                            <label>Number of Pages</label>
                            <input type="text" className="form-control" required name="number_of_pages" id="number_of_pages" onChange={ (e)=>{setNumberOfPages(e.target.value)}}  />
                        </div>
                        <div className="form-group col-lg-4">
                            <label>Date Released</label>
                            <input type="date" className="form-control"required name="released_date" id="release_date" onChange={ (e)=>{setReleaseDate(e.target.value)}}  />
                        </div>
                    </div>
                    <br />
                        <button type="button" className="btn btn-warning alert-warning" onClick={(e)=>{processForm(id)}}>Update</button>


               </div>  </center>
        </div>

        </>
    )
}
