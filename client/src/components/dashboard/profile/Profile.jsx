import React, { useState, useRef, useEffect, useMemo } from "react";
import style from "./Profile.module.css";
import "./phone.css";
import imgLoad from "../../../assets/img/imgLoad.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Form from "react-validation/build/form";
import PhoneInput from "react-phone-number-input";
import Input from "../../FormFIelds/Input";
import PhoneInputCustom from "../../FormFIelds/PhoneInput";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
// import {donnéesEtse} from "../Auth/SignupEnterprise"

import { registerProfile,getProfile } from "../../../actions/auth";

const required = (value, field) => {
  console.log("values:", value)
  return !value;
};
const validEmail = (value) => {
  return !isEmail(value);
};

const vusername = (value) => {
  return value.length < 3 || value.length > 20;
};

const vpassword = (value) => {
  return value.length < 6 || value.length > 40;
};

const vpasswordEquality = (value, test, asd, test3, test4) => {
  console.log("value: ");
  return !(asd?.password[0]?.value === value);
};
function Profile({ error, isChanged, isUsed, ...props }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [value, setValue] = useState();
  let navigate = useNavigate();

  const state = useSelector((state)=>state)
  const form = useRef();
  const checkBtn = useRef();

  const [userData, setUserData] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  // const {entreprise} = useSelector((state)=> state.auth.entreprise)

  
  const dispatch = useDispatch();
  const handlePhoneChange = (value) => {
    setPhoneNumber(value);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onChangePasswordConfirm = (e) => {
    const password1 = e.target.value;
    setPassword1(password1);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  console.log("required: ", required);
  const [messageStatus, setMessageStatus] = useState(false);
  useEffect(() => {
    if (password === "" && password1 === "") {
      setTimeout(() => {
        setMessageStatus(false);
      }, 8000);
      setMessageStatus(true);
    }
  }, [password, password1]);

  console.log({state})
  const getUserInformation = async() =>{
    try {
      dispatch(await getProfile(state.auth?.user?.accessToken))
    } catch (error) {
      
    }
    console.log("utilisateur", userData)
  }
  
  useEffect(()=>{
    getUserInformation()
  },[])

  useEffect(()=>{
   setEmail(state.auth.profile.email)
  },[state.auth.profile])

 
  useEffect(()=>{
    setUsername(state.auth.profile.username)
   },[state.auth.profile])

  const handleProfile = async (e) => {
    console.log("event", e)
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();
    
    console.log("check button",checkBtn.current.context._errors.length)
    if (checkBtn.current.context._errors.length > 0 && form.current.isValid && form.current.isValid()){
      // const valueofSingUser = registerEnterprise(username, password);

      const payload = { username, email,phoneNumber, password };
      console.log("value of profile :", payload);
      await dispatch(registerProfile(payload));
      if (isLoggedIn) {
        return <Navigate to="/dashboard/profile" />;
      }
      setSuccessful(true);
      // .then(() => {
      //   // console.log({ response });
      //   // console.log("this for the response on the register entreprise");
      //   // window.location.reload();
      // })
      // .catch((error) => {
      //   console.log("this is the catch of the register data", error);
      // });
    } else {
      setSuccessful(false);
    }
  };

  const [profilUrl, setProfilUrl] = useState();
  const [base64Image, setBase64Image] = useState(null);
  const [file, setFile] = useState(null);
  const [profil, setProfil] = useState(null);
  const convertToBase64 = (e) => {
    const profil = e.target.files[0];
    console.log("photo:", profil);
    if (profil) {
      setProfil(profil);
      setProfilUrl(URL.createObjectURL(profil));
    }
    const reader = new FileReader();
    reader.readAsDataURL(profil);
    reader.onload = () => {
      setBase64Image(reader.result);
      console.log("image :", reader.result);
    };
  };
  return (
    <>
      <div className={style.design12}></div>
      <div className={style.design13}></div>
      <Form
        className={style.container_profile}
        onSubmit={handleProfile}
        ref={form}
      >
        <div className={style.left_block}>
          <h2>Informations personnelles</h2>
          <div className={style.upload_image}>
            <FontAwesomeIcon icon={faCamera} className={style.camera} />
          </div>
          {
            profil == null ? (
              <div className={style.profile}>
                <img src={imgLoad} alt="" />
                <p>Charger le logo de votre entreprise</p>
              </div>
            ) : (
              <img src={base64Image} alt="" className={style.profile} />
            )
            //  console.log("photo de profil", profilUrl)
          }
          <input
            type="file"
            onChange={convertToBase64}
            accept="image/*"
            className={style.hide}
          />
          <Input
            type="text"
            name="username"
            value={username}
            onChange={onChangeUsername}
            validations={[required, vusername]}
            placeholder="votre username"
            className="input__style"
          />
          <Input
            type="text"
            name="email"
            value={email}
            onChange={onChangeEmail}
            validations={[required, validEmail]}
            placeholder="votre email"
            className="input__style"
          />
        </div>
        <div className={style.right_block}>
          <PhoneInputCustom
            name="phone_number"
            validations={[required]}
            onChange={handlePhoneChange}
            value={phoneNumber}
          />
          <Input
            type={"password"}
            value={password}
            name={"password"}
            onChange={onChangePassword}
            validations={[required, vpassword]}
            placeholder="votre mote de passe"
            className="input__style"
          />
          <Input
            type={"password"}
            value={password1}
            name={"confirm_password"}
            onChange={onChangePasswordConfirm}
            validations={[required, vpassword, vpasswordEquality]}
            placeholder="confirmer mot de passe"
            className="input__style"
          />
          <button type="submit" className={style.btn__submit_form}>
            Mettre à jour
          </button>
        </div>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
        {message && <div className="input__style__err">{message}</div>}
      </Form>
    </>
  );
}

export default Profile;
