import React, { useState, useRef } from "react";
import "../../assets/css/login.css";
import Ellipse2 from "../../assets/img/Ellipse 2.svg";
import Ellipse1 from "../../assets/img/Ellipse 1.svg";
import ex from "../../assets/img/ex.png";
import profile from "../../assets/img/profile.png";
import im from "../../assets/img/im.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { login } from "../../actions/auth.js";

const required = (value, field) => {
  if (!value) {
    return <div className="input__style__err">{field.placeholder} est requis</div>;
  } 
  
};



function Login(props) {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
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

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          navigate("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }
  return (
    <>
      <div className="background__elt">
        <div className="container__login">
          <img src={Ellipse2} alt="" className="svg_style" />
          <div className="em__tools_command">
            <p>EM Tools</p>
            <h1 className="first__title">Gérez vos projets avec</h1>
            <h1 className="second__title">EMTools</h1>
            <p className="description">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto
            </p>
            <br />
            <br />
            <div className="btn__style">
              <a href="/fr/merchants">Inscrivez votre entreprise</a>
              <img src={ex} alt="" className="icon__style" />
            </div>
            <div className="container__swipper">
              <Swiper
                spaceBetween={20}
                grabCursor={true}
                slidesPerView={2}
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
          <Form className="em__tools_form" onSubmit={handleLogin} ref={form}>
            <div className="msg__form__err"></div>
            <img src={im} alt="" id="img__style" />
            <h1>Bienvenue</h1>
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </p>
            <Input
              type="text"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
              placeholder="votre username"
              className="input__style"
            />
            <Input
              type="text"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
              placeholder="votre mote de passe"
              className="input__style"
            />
            <a href="/" className="forgot__pass_style">
              mot de passe oublié?
            </a>
            <div disabled={loading}>
            {loading && (
                <span className=""></span>
              )}
              <button type="submit" className="btn__submit_form">Se connecter</button>
            </div>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
            {message && <div className="input__style__err">{message}</div>}
          </Form>
        </div>
        <img src={Ellipse1} alt="" className="svg__layout" />
      </div>
    </>
  );
}

export default Login;
