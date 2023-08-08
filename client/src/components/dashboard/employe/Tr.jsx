import React,{useEffect,useState} from 'react'
import style from './Tr.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";


import { deleteEmploye} from "../../../actions/auth";
import PopupEditEmploye from '../../popups/PopupEditEmploye';
import Popup from '../../popups/Popup';


function Tr(props) {
  const row = props.row
  console.log("rows", {...row})
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, employees } = useSelector((state) => state.auth);
  const [employee, setEmployee]= useState(undefined)
  const { message } = useSelector((state) => state.message);

  const togglePopup = (data) => {
    setIsOpen(!isOpen);
    setEmployee(data)
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  console.log({ employees });
  const deleteOneEmploye = (id) => {
    return async () => {
      try {
        console.log("je suis dans le try");
        await dispatch(deleteEmploye(id));
      } catch (error) {
        console.log(error);
      }
    };
  };
  // const updateOneEmploye = (id) =>{
  //   return async () => {
  //     try {
  //       console.log("je suis dans le try");
  //       await dispatch(updateEmploye(id));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  // }

  useEffect(() => {
    dispatch(deleteOneEmploye());
  }, []);
  return (
    <>
      <tr>
        <td><img src={row.profil} alt="" className={style.imgs}/></td>
        <td>{row.username}</td>
        <td>{row.numtel}</td>
        <td>{row.e_mail}</td>
        <td>{row.roles}</td>
        <td>
        <FontAwesomeIcon icon={faTrash} className={style.trash} onClick={deleteOneEmploye(row.id)}/>
        <FontAwesomeIcon icon={faPenToSquare} className={style.pen} onClick={togglePopup} />
        <Popup isOpen={isOpen} handleIconClick={closePopup} initialEmployee={row}/>
        </td>
      </tr>
    </>
  )
}

export default Tr
