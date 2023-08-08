import React from "react";
import styles from "./Home.module.css";
import profile from "../../assets/img/web-profile.svg";
import baner from "../../assets/img/web-rectangle-28.svg";
import rectangle1 from "../../assets/img/Rectangle38.png";
import rectangle2 from "../../assets/img/Rectangle25.png";
import rectangle3 from "../../assets/img/Rectangle26.png";
import Men__Banner from "../../assets/img/Men2.png";
import group1 from "../../assets/img/Group1.png";
import group2 from "../../assets/img/Group2.png";
import rectangle4 from "../../assets/img/Rectangle35.png";
import rectangle5 from "../../assets/img/Rectangle36.png";
import level from "../../assets/img/appreciation.png";
import ellipse1 from "../../assets/img/Ellipse8.png";
import ellipse2 from "../../assets/img/Ellipse 7.png";
import rectangle6 from "../../assets/img/Rectangle31.png";
import ellipse9 from "../../assets/img/Ellipse9.png";
import background1 from "../../assets/img/Background1.png";
import respo from "../../assets/img/responsable.png";
import business from "../../assets/img/businessman.png";
import ellipse10 from "../../assets/img/Ellipse10.png";
import technologies from "../../assets/img/tech.png";
import plogo1 from "../../assets/img/plogo1.png";
import plogo2 from "../../assets/img/plogo2.png";
import plogo3 from "../../assets/img/plogo3.png";
import plogo4 from "../../assets/img/plogo4.png";
import plogo5 from "../../assets/img/plogo5.png";
import symbole1 from "../../assets/img/symbole_1.svg";
import symbole2 from "../../assets/img/symbole_2.svg";
import Facebook from "../../assets/img/Facebook.svg";
import Twitter from "../../assets/img/Twitter.svg";
import Instagram from "../../assets/img/Instagram.svg";
import Linkedin from "../../assets/img/LinkedIn.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { EffectCoverflow, Navigation } from "swiper";

function Home() {
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.logo}>EMTOOLS</div>
        <div className={styles.links_header}>
          <a href="/">Ressources</a>
          <a href="/">Pourquoi nous</a>
          <a href="/">Notre plateforme</a>
          <a href="/">Nous</a>
        </div>
        <a href="/login" className={styles.button}>
          <img src={profile} alt="" />
          <p className={styles.text}>Se connecter </p>
        </a>
      </div>
      <div className={styles.banner}>
        <img src={baner} alt="" className={styles.baner} />
        <div className={styles.description}>
          <h1>Gestion des Projets, équipes en Entreprise </h1>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour
          </p>
        </div>
        <div className={styles.men_others}>
          <img src={rectangle1} alt="" className={styles.rectangle_first} />
          <img src={rectangle2} alt="" className={styles.rectangle_second} />
          <img src={rectangle3} alt="" className={styles.rectangle_third} />
          <img src={Men__Banner} alt="" className={styles.rectangle_fourth} />
          <div className={styles.stat_cycle}>
            <img src={rectangle4} alt="" className={styles.rectangle4} />
            <img src={group1} alt="" className={styles.stat_group1} />
            <img src={group2} alt="" className={styles.stat_group2} />
          </div>
          <div className={styles.diagram}>
            <img src={rectangle5} alt="" className={styles.bloc_position} />
            <img src={level} alt="" className={styles.level_position} />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.small_title}>
          <h3>Lorem ipsum sit amet dolor consectur adisciping elit</h3>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour
          </p>
        </div>
        <div className={styles.first_content}>
          <img src={ellipse1} alt="" className={styles.ellipse1} />
          <img src={ellipse2} alt="" className={styles.ellipse2} />
          <img src={rectangle6} alt="" className={styles.rectangle6} />
          <div className={styles.subscriptions}>
            <h3>Lorem ipsum sit amet dolor</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate
            </p>
            <button className={styles.btn_login}>Lorem ipsum</button>
          </div>
        </div>
        <div className={styles.second_content}>
          <div className={styles.about_second_bloc}>
            <h3>Lorem ipsum sit amet dolor</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate
            </p>
            <img src={ellipse9} alt="" className={styles.ellipse9} />
            <img src={background1} alt="" className={styles.background1} />
            <img src={Men__Banner} alt="" className={styles.Men__Banner} />
          </div>
        </div>
        <div className={styles.third_content}>
          <img src={ellipse10} alt="" className={styles.ellipse10} />
          <img src={business} alt="" className={styles.business} />
          <img src={respo} alt="" className={styles.responsable} />
          <div className={styles.about_third_content}>
            <h3>Lorem ipsum sit amet dolor</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate
            </p>
          </div>
        </div>
      </div>
      <div className={styles.technologies}>
        <div className={styles.about_technologies}>
          <h3>Lorem ipsum sit amet dolor</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate
          </p>
        </div>
        <img src={technologies} alt="" className={styles.technologies_image} />
      </div>
      <div className={styles.container_about_EMtools}>
        <h2>
          Ce que les gens pensent de <p>EMtools</p>
        </h2>
        <div className={styles.container_swiper_EMtools}>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={3}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
              clickable: true,
            }}
            modules={[EffectCoverflow, Navigation]}
            className={styles.swiper_container}
          >
            <SwiperSlide>
              <div className={styles.pov}>
                <img src={symbole1} alt="" className={styles.symbole1} />
                <div className={styles.describe}>
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system
                </div>
                <p className={styles.pBold}>Manée Rochelle</p>
                <p className={styles.subtitle1}>BxB Design</p>
                <div className={styles.icon1}></div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.pov2}>
                <img src={symbole2} alt="" className={styles.symbole1} />
                <div className={styles.describe2}>
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system
                </div>
                <p className={styles.p_bold}>Oufad Ndezi</p>
                <p className={styles.subtitle2}>CMR Management Business</p>
                <div className={styles.icon3}></div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.pov}>
                <img src={symbole1} alt="" className={styles.symbole1} />
                <div className={styles.describe}>
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system
                </div>
                <p className={styles.pBold}>Igor Mokozi</p>
                <p className={styles.subtitle1}>BRB Business Creators</p>
                <div className={styles.icon2}></div>
              </div>
            </SwiperSlide>

            {/* <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
        </div> */}
          </Swiper>
        </div>
        <div className={styles.partner}>
          <h2>Nos partenaires</h2>
          <div className={styles.logo_partner}>
            <img src={plogo1} alt="" />
            <img src={plogo2} alt="" />
            <img src={plogo3} alt="" />
            <img src={plogo4} alt="" />
            <img src={plogo5} alt="" />
          </div>
        </div>
        <div className={styles.last_container}>
          <div className={styles.footer}>
            <div className={styles.left_block}>
              <ul>
                <h4 className={styles.list_header}>Produits</h4>
                <li>Gestion des projets</li>
                <li>Time tracker</li>
                <li>Time schedule</li>
                <li>Lead generate</li>
                <li>Collaboration à distance</li>
              </ul>
              <ul>
                <h4 className={styles.list_header}>Resources</h4>
                <li>Privacy Policy</li>
                <li>Terms and Condition</li>
                <li>Blog</li>
                <li>Contactez nous</li>
              </ul>
              <ul>
                <h4 className={styles.list_header}>Compagnie</h4>
                <li>A propos de nous</li>
                <li>Pourquoi nous</li>
                <li>Prix</li>
                <li>Témoignages</li>
              </ul>
            </div>
            <div className={styles.right_block}>
              <p className={styles.right_blockHeader}>Site title</p>
              <p className={styles.footer_text}>
                Souscrivez à notre Newsletter
              </p>
              <input
                type="text"
                placeholder="Enter your Email!"
                className={styles.footer_input}
              />
              <a href="/subscribe" alt="" className={styles.footer_link}>
                Subscribe
              </a>
            </div>
          </div>
          <div className={styles.last_element}>
            <p>Copyright @2023</p>
            <img src={Facebook} alt="" />
            <img src={Twitter} alt="" />
            <img src={Instagram} alt="" />
            <img src={Linkedin} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
