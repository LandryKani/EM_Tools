import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/finalizeSign.css";
import Ellipse2 from "../../assets/img/Ellipse 2.svg";
import Ellipse1 from "../../assets/img/Ellipse 1.svg";
import ex from "../../assets/img/ex.png";
import imgLoad from "../../assets/img/imgLoad.png";
import profile from "../../assets/img/profile.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import CheckButton from "react-validation/build/button";
import Form from "../FormFIelds/Form";
import { registerlogo } from "../../actions/auth";


function FinalizeSignup(props) {
  let navigate = useNavigate();
  // const [value, setValue] = useState();
  const form = useRef();
  const checkBtn = useRef();
  const dispatch = useDispatch();

  const [value, setValue] = useState();
  const [file, setFile] = useState(null);
  const [profil, setProfil] = useState(null);
  const [photoUri, setPhotoUri] = useState();
  const [profilUrl, setProfilUrl] = useState();
  const [base64Image, setBase64Image] = useState(null);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoUri(URL.createObjectURL(file));
    }
  };
  // const handleProfil = (e) => {
  //   const profil = e.target.files[0];
  //   if (profil) {
  //     setProfil(profil);
  //     setProfilUrl(URL.createObjectURL(profil));
  //   }
  // };
  const [uploadSuccessProfile, setUploadSuccessProfile] = useState(false);
  useEffect(() => {
    if (profil != null) {
      setTimeout(() => {
        setUploadSuccessProfile(false);
      }, 8000);
      setUploadSuccessProfile(true);
    }
  }, [profil]);

  const convertToBase64 = (e) => {
    const profil = e.target.files[0];
    console.log("photo:",profil)
    if (profil) {
      setProfil(profil);
      setProfilUrl(URL.createObjectURL(profil));
    }
    const reader = new FileReader();
    reader.readAsDataURL(profil);
    reader.onload = () => {
      setBase64Image(reader.result);
      console.log("image :", reader.result)
    };
  };
  const handleFinalizeSign = async (e) => {
    e.preventDefault();

    // setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      await dispatch(
        registerlogo({base64Image})
      );
      navigate("/profile");
    } else {
      // setLoading(false);
    }
  };
  return (
    <>
      <Form className="container__signup" onSubmit={handleFinalizeSign} ref={form}>
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
                <div
                  className="swiper-element">
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
                <div
                  className="swiper-element">
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
                <div
                  className="swiper-element">
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
                <div
                  className="swiper-element">
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
        <p className="__title">Finalisez votre inscription</p>
        <div className="second_bloc">
          {file === null ? (
            <div className="container__load">
              <img src={imgLoad} alt="" className="load__img_style" />
              <p className="recommandation_img">
                Charger le logo de votre entreprise
              </p>
            </div>
          ) : (
            <div className="">
              <img src={base64Image} className="second_blog" alt="" />
            </div>
          )}
          <input
            type="file"
            onChange={handlePhoto}
            className="hide_input"
            accept="image/*"
          />
        </div>
        {
          profil === null ? (
            <button type="submit" className="btn__submit">
              Ajouter ma photo
            </button>
          ) : (
            <div className="">
              <img src={base64Image} className="img__url" alt="" />
            </div>
          )
          //  console.log("photo de profil", profilUrl)
        }
        {/* <div className="input__style__succes">
              photo de profile enregistrée avec succes
            </div> */}

        {/* uploadSuccessProfile ? (
            <div className="">
              <img src={profilUrl} className="second_blog" alt="" />
            </div>
          ) : null */}
        <input
          type="file"
          onChange={convertToBase64}
          className="hide_input2"
          accept="image/*"
        />
        <img src={Ellipse1} alt="" className="svg__layout" />
      </Form>
    </>
  );
}

export default FinalizeSignup;
