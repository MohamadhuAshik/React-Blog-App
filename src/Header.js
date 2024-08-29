import React, { useContext } from "react";
import { FaLaptop, FaTabletAlt, FaMobileAlt,/*  FaLongArrowAltUp */ } from "react-icons/fa";
import DataContext from "./context/DataContext";
import { Button } from "@mui/material";

const Header = ({ title }) => {

  const { isLogin, setIsLogin, width } = useContext(DataContext)
  const logOut = () => {
    localStorage.clear()
    setIsLogin(false)
    window.location.replace("/")
  }
  return (
    <header className="Header">
      <h1>{title}</h1>
      <div>
        {isLogin ? (<Button onClick={() => logOut()} variant="small">LogOut</Button>) : (<></>)}
        {width < 768 ? (
          <FaMobileAlt />
        ) : width < 992 ? (
          <FaTabletAlt />
        ) : (
          <FaLaptop />
        )}
      </div>
    </header>
  );
};

export default Header;
