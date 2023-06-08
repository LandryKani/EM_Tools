import React, { useState } from "react";
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
import "swiper/css";
import "swiper/css/pagination";

function SignupEnterprise() {
  const [value, setValue] = useState();
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
            <a href="/fr/merchants">Connectez vous</a>
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
        <div className="second_block">
          <p className="second_block__title">Inscrivez vous</p>
          <div className="header_block">
              <div className="etse_logo">
                <img src={user} alt="" />
              </div>
            <div className="unclikable_">
              <img src={building} alt=""/>
              <p>informations entreprise</p>
            </div>
          </div>
          <input
            type="text"
            name="username"
            className="input__style"
            placeholder="Nom entreprise"
          />
          <select className="select_domain">
            <option value="1">Commerce</option>
            <option value="2">Marketing</option>
            <option value="3">Informatique</option>
            <option value="4">Banque & Finance</option>
            <option value="5">Autres</option>
          </select>
          <input
            type="email"
            name="email"
            className="input__style"
            placeholder="votre adresse mail"
          />
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            defaultCountry="CMR"
            value={value}
            onChange={setValue}
            placehorder="(xxx) xxxxxxxx"
          />
          <input
            type="text"
            name="localisation"
            className="input__style"
            placeholder="Définissez votre localisation"
          />

          <button type="submit" className="btn__submit_form">
            Suivant
          </button>
        </div>
        <img src={Ellipse1} alt="" className="svg__layout" />
      </div>
    </>
  );
}

export default SignupEnterprise;
