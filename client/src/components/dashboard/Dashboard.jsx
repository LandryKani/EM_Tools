import React from "react";
import style from "./Dashboard.module.css";
import overviews from "../../assets/img/Overview_Ico.svg";
import employes from "../../assets/img/Employe.svg";
import projet from "../../assets/img/projet.svg";
import permission from "../../assets/img/permission.svg";
import profile from "../../assets/img/profiledash.svg";
import settings from "../../assets/img/settings.svg";
import Login from "../../components/Auth/Login";
import Signup from "../../components/Auth/Signup";
import SignupEnterprise from "../../components/Auth/SignupEnterprise";
import FinalizeSignup from "../../components/Auth/FinalizeSignup";
import Home from "../../components/landing page/Home";
import { Route, useLocation, Routes } from "react-router-dom";
import Project from "./Project";
import Profile from "./profile/Profile";
import Employe from "./employe/Employe";

const menus = [
  {
    src: overviews,
    title: "Overviews",
    href: "/dashboard",
    components: <div>Overviews</div>,
  },
  {
    src: employes,
    title: "Employés",
    href: "/dashboard/employees",
    components:<Employe/>,
  },
  {
    src: projet,
    title: "Projets",
    href: "/dashboard/projects",
    components: <Project/>,
  },
  // {
  //   src: permission,
  //   title: "Permissions",
  //   href: "/dashboard/permissions",
  //   components: <div>Permissions</div>,
  // },
  {
    src: profile,
    title: "Profil",
    href: "/dashboard/profile",
    components: <Profile/>,
  },
];

function Dashboard() {
  const location = useLocation();

  console.log({ location });
  console.log(location.pathname.split("/")[1])


  if (location.pathname.split("/")[1] !== "dashboard") {
    return (
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signupEtse" element={<SignupEnterprise />} />
        <Route path="finalizeSign" element={<FinalizeSignup />} />
      </Routes>
    );
  } else {
    return (
      <>
        <div className={style.dashboard}>
          <div className={style.sideBar}>
            <aside>
              <h2>EMTools</h2>
              <p className={style.caption}>Dashboard</p>
              <div className={style.aside}>
                {menus.map((menu) => {
                  return (
                    <a
                      href={menu.href}
                      className={[
                        style.menu,
                        location.pathname === menu.href && style.menuActive,
                      ].join(" ")}
                    >
                      <img src={menu.src} alt="" />
                      <p>{menu.title}</p>
                    </a>
                  );
                })}
              </div>
            </aside>
            <a href="/dashboard/settings" className={[style.settings, "/dashboard/settings" === location.pathname && style.menuActive].join(' ')}>
              <img src={settings} alt="" />
              <p>Paramètres</p>
            </a>
          </div>
          <div className={style.page}>
            <Routes>
              {menus.map((menu) => (
                <Route
                  key={`pathname_${menu.href}`}
                  path={menu.href}
                  element={menu.components}
                />
              ))}
              <Route path={'/dashboard/settings'} element={<div>parametres</div>}/>
            </Routes>
          </div>
        </div>
      </>
    );
  }

}

export default Dashboard;
