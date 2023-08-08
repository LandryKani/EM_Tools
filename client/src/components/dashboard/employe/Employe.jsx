import React, { useEffect } from "react";
import style from "./Employe.module.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Tr from "./Tr";
import Popup from "../../popups/Popup";
import { useDispatch, useSelector } from "react-redux";

import { listEmploye } from "../../../actions/auth";

function Employe() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  // const employes = useSelector((state) => state.employes);
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const { isLoggedIn, employees } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const closePopup = () => {
    setIsOpen(false);
  };
  const [input, setInput] = useState("");
  const header = [
    "Profil",
    "Username",
    "Télephone",
    "E-mail",
    // "Password",
    "Status",
    "Actions",
  ];
  const data = [
    {
      profil: "/img/employe4.png",
      username: "KANI igor",
      numtel: "+237 695612037",
      e_mail: "landrykani020@gmail.com",
      roles: "DIRECTOR",
    },
    {
      profil: "/img/employe1.png",
      username: "Geovane Paul",
      numtel: "+237678945123",
      e_mail: "GeovaneMbeus@gmail.com",
      roles: "EMPLOYE",
    },
    {
      profil: "/img/employe3.png",
      username: "David Dev",
      numtel: "+237674851230",
      e_mail: "David@gmail.com",
      roles: "EMPLOYE",
    },
    // Ajoutez d'autres entrées de données ici
  ];

  // console.log({ employees });
  const getAllEmploye = () => {
    return async (dispatch) => {
      try {
        console.log("je suis dans le try");
        await dispatch(listEmploye());
      } catch (error) {
        console.log(error);
      }
    };
  };

  useEffect(() => {
    dispatch(getAllEmploye());
  }, []);

  return (
    <>
      <div className={style.container_employees}>
        <div className={style.header}>
          <p className={style.title}>Employés</p>
          <div className={style.right_elt}>
            <div className={style.search_bar}>
              <FaSearch className={style.search_icon} />
              <input
                type="text"
                placeholder="Search"
                className={style.input_search}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <div className={style.add_employe} onClick={togglePopup}>
              <FontAwesomeIcon icon={faPlus} className={style.icon} />
              <p>Employe</p>
            </div>
          </div>
        </div>
        <Popup
          isOpen={isOpen}
          handleIconClick={closePopup}
          initialEmployee={undefined}
        />
        <table className={style.table}>
          <thead className={style.header_employees}>
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </thead>
          <tbody>
            {data?.map((row, rowIndex) => (
              <Tr row={row} key={rowIndex} />
            ))}
            {employees?.map((row, rowIndex) => (
              <Tr row={row} key={rowIndex} />
            ))}
          </tbody>
        </table>
        {/* <table className={style.employees}>
            
          </table> */}
      </div>
    </>
  );
}

export default Employe;
