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

import { updateEmploye, registerEmploye } from "../../actions/auth";

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

function PopupEditEmploye({
  isOpen,
  handleIconClick,
  error,
  isChanged,
  isUsed,
  id,
}) {
  const [numtel, setNumtel] = useState();
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [e_mail, setE_mail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn, updateInformation } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [updatedDetails, setUpdatedDetails] = useState({});

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

  const getEmploye = () => {
    return async () => {
      try {
        console.log("je suis dans le try");
        await dispatch(updateEmploye(id));
      } catch (error) {
        console.log(error);
      }
    };
  };

  console.log({updateInformation})

  useEffect(() => {
    dispatch(getEmploye());
  }, []);

//   useEffect(() => {
//     if (updateInformation.length > 0) {
//       setUpdatedDetails({
//         id: updateInformation[0].id,
//         // autres champs de l'employé que tu souhaites modifier
//       });
//     }
//   }, [updateInformation]);

  const handleRegisterEmploye = async (e) => {
    e.preventDefault();

    setSuccessful(false);

    form.current.validateAll();

    // if (checkBtn.current.context._errors.length === 0) {
    //   // const valueofSingUser = registerEnterprise(username, password);

    //   const payload = {username,e_mail,numtel,password};
    //   console.log("value of SignUser :", payload);
    //   dispatch(registerEmploye(payload))
    //     .then((response) => {
    //       console.log({ response });
    //       console.log("this for the response on the register entreprise");
    //       navigate("/");
    //       window.location.reload();
    //       setSuccessful(true);
    //     })
    //     .catch((error) => {
    //       console.log("this is the catch of the register data", error);
    //       setSuccessful(false);
    //     });
    // }

    if (checkBtn.current.context._errors.length === 0) {
      const payload = { username, e_mail, numtel, password };
      console.log("value of profile :", payload);
      await dispatch(updateEmploye(payload));
      if (isLoggedIn) {
        navigate("/dashboard/employees");
        window.location.reload();
      }
      setSuccessful(true);
      handleIconClick();
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
        <Form
          className={style.popup_content}
          onSubmit={handleRegisterEmploye}
          ref={form}
        >
          <h2>Editer les informations</h2>
          <br />
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
            // placehorder="(xxx) xxxxxxxx"
            placeholder="(xxx) xxxxxxxx"
            className={style.phone}
          />
          {/* <PhoneInputCustom
            name="phone_number"
            validations={[required]}
            className={style.input_stylePhone}
          /> */}
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
            Créer
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

export default PopupEditEmploye;
