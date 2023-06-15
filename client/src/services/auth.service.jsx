import axios from "axios";

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

// const register = (
//   data
// ) => {
//   console.log("données:",data)
//   // return axios.post(API_URL + "createEntreprise", {
//     // data
//   // });
// };

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

export default { registerEnterprise, login, logout };
