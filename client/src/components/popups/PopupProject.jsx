import React, { useState, useRef, useEffect } from "react";
import style from "./PopupProject.module.css";
import close from "../../assets/img/Close_IcoProject.svg";
import projectIco from "../../assets/img/add_project.svg";
import Input from "../FormFIelds/Input";
import Form from "react-validation/build/form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { register } from "../../actions/auth";
import DateRangePickerExample from "../Date/DateRangePickerExample";

const required = (value, field) => {
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

function PopupProject({ isOpen, handleIconClick }) {
  const [value, setValue] = useState();
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn, entreprise } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

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

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      // const valueofSingUser = registerEnterprise(username, password);

      const payload = { ...(entreprise ? entreprise : {}), username, password };
      console.log("value of SignUser :", payload);
      dispatch(register(payload))
        .then((response) => {
          console.log({ response });
          console.log("this for the response on the register entreprise");
          navigate("/");
          window.location.reload();
          setSuccessful(true);
        })
        .catch((error) => {
          console.log("this is the catch of the register data", error);
          setSuccessful(false);
        });
    }
  };
  return (
    <>
      <div className={[style.popup, isOpen && style.popup_open].join(" ")}>
        <div className={style.popup_content}>
          <div className={style.header}>
            <img src={projectIco} alt="" className={style.projectIco} />
            <h2>Création d’un projet</h2>
          </div>
          <Form className={style.body}>
            <Input
              type="text"
              name="Nom du projet"
              value={username}
              onChange={onChangeUsername}
              validations={[required, vusername]}
              placeholder="Nom du projet"
              className="input__style"
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Description"
              className={style.description}
            ></textarea>
            <DateRangePickerExample />
            <button type="submit" className={style.btn__submit_form}>
              Créer le projet
            </button>
          </Form>
          <img
            src={close}
            alt=""
            onClick={handleIconClick} // Appeler la fonction de fermeture lorsqu'on clique sur l'icône
            className={style.close_popup}
          />
        </div>
      </div>
    </>
  );
}

export default PopupProject;
