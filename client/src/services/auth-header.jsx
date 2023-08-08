export default function authHeader() {
  const employe = JSON.parse(localStorage.getItem("employes"));

  if (employe && employe.accessToken){
    return{Authorization : 'Bearer'+ employe.accessToken}
  }else{
    return {};
  }
}

export  const  auhtenticationHeader = () =>{
  const user = JSON.parse(localStorage.getItem("employes"));
  console.log("this is the token", user.accessToken)

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}
