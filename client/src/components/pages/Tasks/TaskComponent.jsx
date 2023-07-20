import React, { useRef, useState, useEffect } from "react";
import style from "./Task1.module.css";
import comment from "../../../assets/img/Comment_Ico.svg";
import Select from "react-select";

function TaskComponent({ data }) {
  const selectRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const selectElement = selectRef.current?.select?.controlRef;
      if (selectElement) {
        const selectRect = selectElement.getBoundingClientRect();
        const bottomDistanceFromPageBottom =
          window.innerHeight - selectRect.bottom;

        setIsAtBottom(bottomDistanceFromPageBottom <= 0);
      }
    }
    handleScroll(); // Vérifie la position initiale lors du montage du composant

    window.addEventListener("scroll", handleScroll); // Vérifie la position lors du défilement

    return () => {
      window.removeEventListener("scroll", handleScroll); // Nettoie l'écouteur d'événement lors du démontage du composant
    };
  }, []);

  function isAtBottomOfPage() {
    return isAtBottom;
  }

  const menuPlacement = isAtBottomOfPage() ? "top" : "auto";
  const options = [
    { value: "En attente", label: "En attente", color: "#0F7174" },
    { value: "En cours", label: "En cours", color: "#FF7F11" },
    { value: "Terminée", label: "Terminée", color: "#00a660" },
    { value: "Echouée", label: "Echouée", color: "red" },
    { value: "Désativée", label: "Désativée", color: "#506273" },
  ];

  const [value, setValue] = React.useState(
    options.find((e) => e.value === data?.status)
  );

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      position: "absolute", // Place les options en position absolue
      zIndex: 9999,
    }),
    control: (provided, state) => ({
      ...provided,
      // borderColor: state.isFocused && state.data && state.data.color
      //   ? state.data.color
      //   : "#ccc",
      borderColor: value.color,
      color: "white",
      "& div": {
        color: "white",
      },
      backgroundColor: state.isSelected ? "white" : value.color,
      boxShadow:
        state.isFocused && state.data && state.data.color
          ? `0 0 0 1px ${state.data.color}`
          : "none",
      "&:hover": {
        borderColor: value.color,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? state.data.color : "white",

      borderColor: state.isFocused ? "#00ff00" : "#ccc",
      // color: state.isSelected ? "white" : "black",
    }),
  };

  return (
    <>
      <div className={style.task}>
        <div className={style.header_task}>
          {data?.profiles?.map((elt, index) => {
            return (
              <img
                src={elt}
                alt=""
                className={[index !== 0 && style.imgPosition].join(" ")}
                style={{
                  zIndex: data?.profiles?.length - index,
                  position: "relative",
                }}
              />
            );
          })}
          <p>{data?.comments_number}</p>
          <img src={comment} alt="" className={style.comment} />
        </div>
        <div className={style.title_task}>
          <p>{data?.title}</p>
        </div>
        <div className={style.description}>{data?.description}</div>
        <div className={style.status}>
          <Select
            ref={selectRef}
            options={options}
            styles={customStyles}
            value={value}
            onChange={(new_value) => {
              setValue(new_value);
            }}
            menuPlacement={menuPlacement}
          />
        </div>
      </div>
    </>
  );
}

export default TaskComponent;
