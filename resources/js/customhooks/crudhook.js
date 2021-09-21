import { param } from "jquery";
import React, {useState, useEffect, useContext} from "react";
//import { header, API_PATH, URL_PATH } from "../config";

export const useGet =  async (url, resource, header) => {
   let response = await fetch(`${url}/${resource}`, {method : "GET", headers : header})
   let data = await response.json();
    console.log(data);
    return await data;

}

export const usePatch = async (url, resource, data, id) => {
    const res = await fetch(`${url}/${resource}/${id}`, {method : "PATCH", headers : header, body : JSON.stringify(data)})
    return res.json();

}

export const useGetOne = async (url, resource, id, header) => {
    const res = await fetch(`${url}/${resource}/${id}`, {method : "GET", headers : header})
    let data = await res.json();
    //console.log(data);
    return  data;
}

export const useDelete = async (url, resource, id, header) => {
    const res = await fetch(`${url}/${resource}/${id}`, {method : "DELETE", headers : header})
    let data = await res.json();
    console.log(data);
    return await data;
}

export const usePost = async (url, resource, data) => {

}
