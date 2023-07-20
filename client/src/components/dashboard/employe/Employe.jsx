import React from "react";
import style from "./Employe.module.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Tr from "./Tr";
import Popup from "../../popups/Popup";

function Employe() {
  const [isOpen, setIsOpen] = useState(false);

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
    "Password",
    "Status",
    "Actions",
  ];
  const data = [
    {
      profil: "/img/employe4.png",
      username: "KANI igor",
      telephone: "+237 695612037",
      email: "landrykani020@gmail.com",
      password: "azertyuioiuytr",
      status: "Directeur",
    },
    {
      profil: "/img/employe1.png",
      username: "Geovane Paul",
      telephone: "+237678945123",
      email: "GeovaneMbeus@gmail.com",
      password: "sdfghgfd",
      status: "Employe",
    },
    {
      profil: "/img/employe3.png",
      username: "David Dev",
      telephone: "+237674851230",
      email: "David@gmail.com",
      password: "azertyuiopoiuytrd",
      status: "Employe",
    },
    // Ajoutez d'autres entrées de données ici
  ];
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
        <Popup isOpen={isOpen} handleIconClick={closePopup} />
        <table className={style.table}>
          <thead className={style.header_employees}>
            {header.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <Tr
                profil={row.profil}
                email={row.email}
                username={row.username}
                telephone={row.telephone}
                password={row.password}
                status={row.status}
              />
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
