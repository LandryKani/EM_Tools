import axios from "axios";
import authHeader from "./auth-header";
import {auhtenticationHeader} from './auth-header'

const API_URL = "http://localhost:3005/api/";

const registerEnterprise = (
  data
) => {
  console.log("données",{...data})
  return axios.post(API_URL + "createEntreprise", {
    ...data
  }).then((response)=>{
    console.log(response)
    return response.data
  }).catch((error)=>console.log(error))
};

const registerProfile = (data,id) =>{
  console.log("profile",{...data})
  return axios.put(API_URL + "update-profile",{
  ...data
  },{headers: auhtenticationHeader()}).then((response)=>{
    console.log(response)
    return response.data
  }).catch((error)=>console.log(error))

}

const createProject =(data)=>{
  console.log("project",{...data})
  return axios.post(API_URL+"createProjects",{
    ...data
  },{headers: auhtenticationHeader()}).then((response)=>{
    console.log(response)
    return response.data
  }).catch((error)=>console.log(error))
}

const getProfile = () => {
  return axios.get(API_URL + "getInformation",{
     headers: auhtenticationHeader() 
  }).then((response)=>{
    console.log(response)
    return response.data
  }).catch((error)=>console.log(error))
};

const updateEmploye = (id,data)=>{
  return axios.put(API_URL+ "updateEmploye/" + id,{
    data
  }).then((response)=>{
    console.log(response)
    return response.data
  }).catch((error)=>console.log(error))
}

const registerEmploye = (data) =>{
  console.log("employe", {...data})
  return axios.post(API_URL + "createEmploye",{
    ...data
  }).then((response)=>{
    console.log(response)
    return response.data
  }).catch((error)=>console.log(error))
}

const listEmploye = ()=>{
  return axios.get(API_URL + "listEmploye").then((response)=>{
    console.log(response)
    return response.data
  }).catch((error)=>console.log(error))
}

const listProject = ()=>{
  return axios.get(API_URL + "listProjects").then((response)=>{
    console.log(response)
    return response.data
  }).catch((error)=>console.log(error))
}
const deleteEmploye = (id)=>{
  return axios.delete(API_URL+ "deleteEmploye/"+ id).then((response)=>{
    console.log(response)
    return response.data
  }).catch((error)=>console.log(error))
}

const login = (username, password) => {
  return axios
    .post(API_URL + "auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("employes", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("employes");
};

export default { registerEnterprise, registerProfile,createProject,getProfile, registerEmploye,listEmploye,listProject,deleteEmploye,updateEmploye, login, logout };
