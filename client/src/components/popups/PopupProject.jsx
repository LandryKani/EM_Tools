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
import DateRangePickerExample from "../Date/DateRangePickerExample";

import { createProject } from "../../actions/auth";

const required = (value, field) => {
  return !value;
};
const validEmail = (value) => {
  return !isEmail(value);
};

const vtitre = (value) => {
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

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn, entreprise } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onchangeTitre = (e) => {
    const titre = e.target.value;
    setTitre(titre);
  };

  const onchangeDescription = (e) => {
    const description = e.target.value;
    setDescription(description);
  };

  console.log("required: ", required);
  const [messageStatus, setMessageStatus] = useState(false);

  const handleCreateProject = async (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const payload = { titre, description };
      console.log("value of project :", payload);
      await dispatch(createProject(payload));
      if (isLoggedIn) {
        handleIconClick()
        navigate("/dashboard/projects");
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
  return (
    <>
      <div className={[style.popup, isOpen && style.popup_open].join(" ")}>
        <div className={style.popup_content}>
          <div className={style.header}>
            <img src={projectIco} alt="" className={style.projectIco} />
            <h2>Création d’un projet</h2>
          </div>
          <Form
            className={style.body}
            onSubmit={handleCreateProject}
            ref={form}
          >
            <Input
              type="text"
              name="Nom du projet"
              value={titre}
              onChange={onchangeTitre}
              validations={[required, vtitre]}
              placeholder="Nom du projet"
              className="input__style"
            />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              value={description}
              onChange={onchangeDescription}
              placeholder="Description"
              className={style.description}
            ></textarea>
            <DateRangePickerExample />
            <button type="submit" className={style.btn__submit_form}>
              Créer le projet
            </button>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
            {message && <div className="input__style__err">{message}</div>}
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
