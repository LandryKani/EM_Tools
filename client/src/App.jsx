import "./App.css";
import {Routes,Route} from 'react-router-dom'
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import SignupEnterprise from "./components/Auth/SignupEnterprise";
import FinalizeSignup from "./components/Auth/FinalizeSignup";
import Home from "./components/landing page/Home";
import Dashboard from "./components/dashboard/Dashboard";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    // <Routes>
    //   <Route index element={<Home />}/>
    //   <Route path="login" element={<Login />}/>
    //   <Route path="dashboard" element={<Dashboard />}/>
    //   <Route path="signup" element={<Signup />}/>
    //   <Route path="signupEtse" element={<SignupEnterprise />}/>
    //   <Route path="finalizeSign" element={<FinalizeSignup />}/>
    // </Routes>
    <Dashboard/>
  );
}

export default App;
