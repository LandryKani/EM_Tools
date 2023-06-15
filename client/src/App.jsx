import "./App.css";
import {Routes,Route} from 'react-router-dom'
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import SignupEnterprise from "./components/Auth/SignupEnterprise";
import FinalizeSignup from "./components/Auth/FinalizeSignup";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route index element={<Login />}/>
      <Route path="signup" element={<Signup />}/>
      <Route path="signupEtse" element={<SignupEnterprise />}/>
      <Route path="finalizeSign" element={<FinalizeSignup />}/>
    </Routes>
  );
}

export default App;
