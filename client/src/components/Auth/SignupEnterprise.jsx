import React, { useState, useRef } from "react";
import "../../assets/css/signupEtse.css";
import Ellipse2 from "../../assets/img/Ellipse 2.svg";
import Ellipse1 from "../../assets/img/Ellipse 1.svg";
import user from "../../assets/img/user1.png";
import building from "../../assets/img/Bulding1.png";
import ex from "../../assets/img/ex.png";
import profile from "../../assets/img/profile.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Zoom } from "swiper";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
// import Form from "react-validation/build/form";
import "swiper/css";
import "swiper/css/pagination";
import Input from "../FormFIelds/Input";
import Form from "../FormFIelds/Form";
import { isEmail } from "validator";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import { registerEnterprise } from "../../actions/auth";

const required = (value, field) => {
  return !value;
};
const vnameEtse = (value) => {
  return value.length < 3 || value.length > 20;
};
const validEmail = (value) => {
  return !isEmail(value);
};
const vLocation = (value) => {
  return value.length < 3 || value.length > 20;
};

function SignupEnterprise(props) {
  let navigate= useNavigate();
  // const [value, setValue] = useState();
  const form = useRef();
  const checkBtn = useRef();
  const dispatch = useDispatch();

  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [tel, setTel] = useState();
  const [domaine, setDomaine] = useState("");
  const [loading, setLoading] = useState(false);
  const { message } = useSelector((state) => state.message);

  const onChangeName = (e) => {
    const name = e.target.value;
    setNom(name);
  };
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangeLocation = (e) => {
    const localisation = e.target.value;
    setLocalisation(localisation);
  };
  // const onChangeTel = (e) => {
  //   const tel = e.target.value;
  //   // setTel(tel);
  // };
  const onChangeDomaine = (e) => {
    const domaine = e.target.value;
    setDomaine(domaine);
  };
  // console.log("required: ", required);
  const handleRegisterEtse = async (e) => {
    e.preventDefault();

    // setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      
     await dispatch(registerEnterprise({nom, email, localisation, domaine, tel}))
     navigate('/signup')
        
    } else {
      setLoading(false);
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
              spaceBetween={20}
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
              navigation={true}
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
        <Form className="second_block" onSubmit={handleRegisterEtse} ref={form}>
          <p className="second_block__title">Inscrivez vous</p>
          <div className="header_block">
            <div className="etse_logo">
              <img src={user} alt="" />
              {/* <a href="/signup" className="hide_lin"> */}
                {/* .
              </a> */}
            </div>
            <div className="unclikable_">
              <img src={building} alt="" />
              <p>informations entreprise</p>
            </div>
          </div>
          <Input
            type="text"
            name="nom"
            value={nom}
            onChange={onChangeName}
            validations={[required, vnameEtse]}
            className="input__style"
            placeholder="Nom entreprise"
          />
          <select className="select_domain">
            <option value={domaine} onChange={onChangeDomaine}>Commerce</option>
            <option value={domaine} onChange={onChangeDomaine}>Marketing</option>
            <option value={domaine} onChange={onChangeDomaine}>Informatique</option>
            <option value={domaine} onChange={onChangeDomaine}>Banque & Finance</option>
            <option value={domaine} onChange={onChangeDomaine}>Autres</option>
          </select>
          <Input
            type="text"
            name="email"
            value={email}
            onChange={onChangeEmail}
            validations={[required, validEmail]}
            placeholder="votre email"
          />
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="CMR"
            value={tel}
            onChange={setTel}
            validations={[required]}
            placehorder="(xxx) xxxxxxxx"
          />
          <Input
            type="text"
            name="localisation"
            value={localisation}
            onChange={onChangeLocation}
            validations={[required]}
            className="input__style"
            placeholder="Définissez votre localisation"
          />
          <div disabled={loading}>
            {loading && <span className=""></span>}
            <button type="submit" className="btn__submit_form">
              Suivant
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

export default SignupEnterprise;
