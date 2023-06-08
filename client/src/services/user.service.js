import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getEmployeBoard = () => {
  return axios.get(API_URL + "employe", { headers: authHeader() });
};

const getDirectorBoard = () => {
  return axios.get(API_URL + "director", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

export default {
  getPublicContent,
  getEmployeBoard,
  getDirectorBoard,
  getAdminBoard,
};