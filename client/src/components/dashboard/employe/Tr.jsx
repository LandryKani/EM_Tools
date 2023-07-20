import React from 'react'
import style from './Tr.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";


function Tr({profil, username, telephone, email,password,status}) {
  return (
    <>
      <tr>
        <td><img src={profil} alt="" className={style.imgs}/></td>
        <td>{username}</td>
        <td>{telephone}</td>
        <td>{email}</td>
        <td>{password}</td>
        <td>{status}</td>
        <td>
        <FontAwesomeIcon icon={faTrash} className={style.trash}/>
        <FontAwesomeIcon icon={faPenToSquare} className={style.pen}/>
        </td>
      </tr>
    </>
  )
}

export default Tr
