import React, { useState, useRef, useEffect } from "react";
import style from "./Popup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Input from "../FormFIelds/Input";
import Form from "react-validation/build/form";
import "../dashboard/profile/phone.css";
import PhoneInput from "react-phone-number-input";
// import PhoneInputCustom from "../FormFIelds/PhoneInput";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { registerEmploye, updateEmploye } from "../../actions/auth";

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

function Popup({
  isOpen,
  handleIconClick,
  error,
  isChanged,
  isUsed,
  initialEmployee,
}) {
  const [numtel, setNumtel] = useState(initialEmployee?.numtel ?? undefined);
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState(initialEmployee?.username ?? "");
  const [e_mail, setE_mail] = useState(initialEmployee?.e_mail ?? "");
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
    const e_mail = e.target.value;
    setE_mail(e_mail);
  };

  const onChangePhoneNumber = (e) => {
    setNumtel(numtel);
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

  const handleRegisterEmploye = async (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      const payload = { username, e_mail, numtel, password };
      console.log("value of profile :", payload);

      await dispatch(initialEmployee ? updateEmploye(initialEmployee.id, payload) : registerEmploye(payload));
      // await dispatch(updateEmploye(initialEmployee.id,payload))

      if (isLoggedIn) {
        navigate("/dashboard/employees");
        // window.location.reload();
      }
      setSuccessful(true);
      handleIconClick();
    } else {
      setSuccessful(false);
    }
  };

  
  return (
    <>
      <div className={[style.popup, isOpen && style.popup_open].join(" ")}>
        <Form
          className={style.popup_content}
          onSubmit={handleRegisterEmploye}
          ref={form}
        >
          <h2>
            {initialEmployee
              ? "Modifier les informations"
              : "Ajouter un employé"}
          </h2>
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
            value={e_mail}
            onChange={onChangeEmail}
            validations={[required, validEmail]}
            placeholder="votre email"
            className="input__style"
          />
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            // defaultCountry="US"
            value={numtel}
            onChange={setNumtel}
            placeholder="(xxx) xxxxxxxx"
            className={style.phone}
          />
          {initialEmployee ? null : (
            <>
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
            </>
          )}

          <button type="submit" className={style.btn__submit_form}>
            {initialEmployee ? "Modifier" : "Créer"}
          </button>
          <FontAwesomeIcon
            icon={faPlus} // L'icône FontAwesome de style 'plus'
            onClick={handleIconClick} // Appeler la fonction de fermeture lorsqu'on clique sur l'icône
            className={style.close_popup}
          />
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
          {message && <div className="input__style__err">{message}</div>}
        </Form>
      </div>
    </>
  );
}

export default Popup;
