import React, { useState, useEffect } from "react";
import style from "./Overview.module.css";
import notification from "../../assets/img/alert.svg";
import bio from "../../assets/img/bio.png";
import berceuse from "../../assets/img/berceuse.png";
import cake from "../../assets/img/cake.png";
import aigle from "../../assets/img/aigle.png";
import diego from "../../assets/img/diego.png";
import bxb from "../../assets/img/bxb.png";
import { faArrowRightLong, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateUUID } from "../../utils/uuid";
import Task1 from "../pages/Tasks/Task1";
import Task2 from "../pages/Tasks/Task2";
import Task3 from "../pages/Tasks/Task3";
import Task4 from "../pages/Tasks/Task4";
import Task5 from "../pages/Tasks/Task5";
import PopupProject from "../popups/PopupProject";
import { useDispatch, useSelector } from "react-redux";

import { listProject } from "../../actions/auth";

const menu = [
  {
    id: generateUUID(),
    img: bio,
    title: "ChezBio",
    components: <Task1 />,
  },
  {
    img: berceuse,
    title: "Berceuses des étoi...",
    id: generateUUID(),
    components: <Task2 />,
  },
  {
    img: cake,
    title: "Sih’s Cakes",
    id: generateUUID(),
    components: <Task3 />,
  },
  // {
  //   img: aigle,
  //   title: "El4Ever",
  //   id: generateUUID(),
  //   components: <Task4/>,
  // },
  // {
  //   img: diego,
  //   title: "Diego Lola",
  //   id: generateUUID(),
  //   components: <Task1/>,
  // },
  // {
  //   img: bxb,
  //   title: "BxB Design",
  //   id: generateUUID(),
  //   components: <Task5/>,
  // },
];
function Project() {
  const [currentComponent, setCurrentComponent] = React.useState(menu[0]);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn, project } = useSelector((state) => state.auth);

  const getAllProjects = () => {
    return async (dispatch) => {
      try {
        console.log("je suis dans le try");
        await dispatch(listProject());
      } catch (error) {
        console.log(error);
      }
      // window.location.reload()
    };
  };

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className={style.header}>
        <div className={style.title}>
          <h2>Projets</h2>
          <p>(8 employés)</p>
        </div>
        <div className={style.notif_admin}>
        <div className={style.create_task} onClick={togglePopup}>
            <FontAwesomeIcon icon={faPlus} className={style.faPlus_Ico} />
            <p>Assigner une tâche</p>
          </div>
          <img src={notification} alt="" />
          <div className={style.user}></div>
          <div className={style.profile_user}>
            <p className={style.username}>Bony Roland</p>
            <p className={style.description}>Directeur Artistique</p>
          </div>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.second_menu}>
          {menu.map((elt) => {
            return (
              <div
                onClick={() => setCurrentComponent(elt)}
                className={`${
                  elt.id === currentComponent.id
                    ? style.menuActive
                    : style.menuInactive
                }`}
              >
                <img src={elt.img} alt="" className={style.descProject} />
                <p>{elt.title}</p>
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  className={`${
                    elt.id === currentComponent.id
                      ? style.fontawesomeActive
                      : style.fontawesomeInactive
                  }`}
                />
              </div>
            );
          })}
          {Array.isArray(project) &&
            project.map((elt) => (
              <div
                onClick={() => setCurrentComponent(elt)}
                className={`${
                  elt.id === currentComponent.id
                    ? style.menuActive
                    : style.menuInactive
                }`}
                key={elt.id} // Assurez-vous d'ajouter une clé unique pour chaque élément du tableau
              >
                <img src={elt.img} alt="" className={style.descProject} />
                <p>{elt.titre}</p>
                <FontAwesomeIcon
                  icon={faArrowRightLong}
                  className={`${
                    elt.id === currentComponent.id
                      ? style.fontawesomeActive
                      : style.fontawesomeInactive
                  }`}
                />
              </div>
            ))}
          <div className={style.create_project} onClick={togglePopup}>
            <FontAwesomeIcon icon={faPlus} className={style.faPlus_Ico} />
            <p>Créer un projet</p>
          </div>
          <PopupProject isOpen={isOpen} handleIconClick={closePopup} />
        </div>
        <div className={style.container_project}>
          {currentComponent.components}
        </div>
      </div>
    </>
  );
}

export default Project;
