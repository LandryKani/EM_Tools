import React, { useState } from "react";
import "../../assets/css/finalizeSign.css";
import Ellipse2 from "../../assets/img/Ellipse 2.svg";
import Ellipse1 from "../../assets/img/Ellipse 1.svg";
import ex from "../../assets/img/ex.png";
import profile from "../../assets/img/profile.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

function FinalizeSignup() {
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
          <p className="second_block__title">Finalisez votre inscription</p>
          <div className="second_block">
          
        </div>
          <img src={Ellipse1} alt="" className="svg__layout" />
        </div>
      </>
    );
}

export default FinalizeSignup
