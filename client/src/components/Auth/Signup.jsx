import React, { useState, useRef, useEffect } from "react";
import "../../assets/css/signup.css";
import Ellipse2 from "../../assets/img/Ellipse 2.svg";
import Ellipse1 from "../../assets/img/Ellipse 1.svg";
import user from "../../assets/img/user.png";
import building from "../../assets/img/Bulding.png";
import ex from "../../assets/img/ex.png";
import profile from "../../assets/img/profile.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Zoom } from "swiper";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "swiper/css";
import "swiper/css/pagination";
import Input from  '../FormFIelds/Input'
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
// import {donnéesEtse} from "../Auth/SignupEnterprise"

import { register } from "../../actions/auth";

const required = (value, field) => {
  return !value
};
const validEmail = (value) => {
  return !isEmail(value)
};

const vusername = (value) => {
  return value.length < 3 || value.length > 20;
};

const vpassword = (value) => {
  return value.length < 6 || value.length > 40;
};

const vpasswordEquality = (value, test, asd, test3, test4) => {
  console.log('value: ', )
  return !(asd?.password[0]?.value === value);
}

function Signup(props) {
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
  const { isLoggedIn,entreprise } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  // const {entreprise} = useSelector((state)=> state.auth.entreprise)
  console.log({entreprise})

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
  // const onChangePhoneNumber = (e) => {
  //   const inputPhoneNumber = e.target.value;
  //   setPhoneNumber(inputPhoneNumber);
  //   console.log("numéro tel:", inputPhoneNumber);
  // };
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
      
      const payload = {...(entreprise ? entreprise : {}), username, password,e_mail,numtel}
      console.log("value of SignUser :", payload)
      dispatch(register(payload))
        .then((response) => {
          console.log({response})
          console.log("this for the response on the register entreprise")
          navigate("/");
          setSuccessful(true);
        })
        .catch((error) => {
          console.log("this is the catch of the register data",error)
          setSuccessful(false);
        });
    }
  };
  return (
    <>
      <div className="container__signup">
        <img src={Ellipse2} alt="" />
        <div className="first_block">
          <p>EM Tools</p>
          <h1 className="first__title">
            Ajouter votre entreprise et gérez vos projets
          </h1>
          <p className="description">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto
          </p>
          <br />
          <br />
          <div className="btn__style">
            <a href="/">Connectez vous</a>
            <img src={ex} alt="" className="icon__style" />
          </div>
          <div className="container__swipper">
            <Swiper
              spaceBetween={265}
              grabCursor={true}
              slidesPerView={3}
              centeredSlides={true}
              loop={true}
              speed={2000}
              effect="zoom"
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, Zoom]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="swiper-element">
                  <div className="text__swiper">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto
                  </div>
                  <div className="block__position">
                    <img
                      src={profile}
                      alt="profile"
                      className="profile__style"
                    />
                    <div className="text__description_swiper">
                      <h2>Bony Roland Brice</h2>
                      <h3>Directeur artistique</h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiper-element">
                  <div className="text__swiper">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto
                  </div>
                  <div className="block__position">
                    <img
                      src={profile}
                      alt="profile"
                      className="profile__style"
                    />
                    <div className="text__description_swiper">
                      <h2>Bony Roland Brice</h2>
                      <h3>Directeur artistique</h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiper-element">
                  <div className="text__swiper">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto
                  </div>
                  <div className="block__position">
                    <img
                      src={profile}
                      alt="profile"
                      className="profile__style"
                    />
                    <div className="text__description_swiper">
                      <h2>Bony Roland Brice</h2>
                      <h3>Directeur artistique</h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="swiper-element">
                  <div className="text__swiper">
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto
                  </div>
                  <div className="block__position">
                    <img
                      src={profile}
                      alt="profile"
                      className="profile__style"
                    />
                    <div className="text__description_swiper">
                      <h2>Bony Roland Brice</h2>
                      <h3>Directeur artistique</h3>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
        <Form className="second_block" onSubmit={handleRegister} ref={form}>
          <p className="second_block__title">Inscrivez vous</p>
          <div className="header_block">
            <div className="unclikable__information">
              <img src={user} alt="" />
              <p>informations personnels</p>
            </div>
            <div className="etse_logo">
              <img src={building} alt="" />
              <a href="/signupEtse" className="hide_link">
                .
              </a>
            </div>
          </div>
          <Input
            type="text"
            name="username"
            value={username}
            onChange={onChangeUsername}
            validations={[required, vusername]}
            placeholder="votre username"
          />
          <Input
            type="text"
            name="email"
            value={e_mail}
            onChange={onChangeEmail}
            validations={[required, validEmail]}
            placeholder="votre email"
          />
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="USA"
            value={numtel}
            onChange={setNumtel}
            // placehorder="(xxx) xxxxxxxx"
            placeholder="(xxx) xxxxxxxx"
          />
          <Input
            type={'password'}
            value={password}
            name={'password'}
            onChange={onChangePassword}
            validations={[required, vpassword]}
            placeholder="votre mote de passe"
            className="input__style"
          />
          <Input
            type={'password'}
            value={password1}
            name={'confirm_password'}
            onChange={onChangePasswordConfirm}
            validations={[required, vpassword, vpasswordEquality]}
            placeholder="confirmer mot de passe"
            className="input__style"
          />
          {/* {password === password1 ? (
            console.log("mot de passe correct")
          ) : (
            <div className="input__style__err">password is incorrect</div>
          )} */}
          <div disabled={loading}>
            {loading && <span className=""></span>}
            <button type="submit" className="btn__submit_form">
              Enregister
            </button>
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
          {message && <div className="input__style__err">{message}</div>}
        </Form>
        <img src={Ellipse1} alt="" className="svg__layout" />
      </div>
    </>
  );
}

export default Signup;
