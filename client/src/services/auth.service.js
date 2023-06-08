import axios from "axios";

const API_URL = "http://localhost:3005/api/";

const registerEnterprise = (nom, domaine, email, tel, localisation) => {
  return axios.post(API_URL + "createEntreprise", {
    nom,
    domaine,
    email,
    tel,
    localisation,
  });
};

const register = (username, email, tel, password) => {
  return axios.post(API_URL + "auth/signup", {
    username,
    email,
    tel,
    password,
  });
};

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

export default { registerEnterprise, register, login, logout };
