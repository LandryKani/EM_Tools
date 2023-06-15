export default function authHeader() {
  const employe = JSON.parse(localStorage.getItem("employes"));

  if (employe && employe.accessToken){
    return{Authorization : 'Bearer'+ employe.accessToken}
  }else{
    return {};
  }
}
