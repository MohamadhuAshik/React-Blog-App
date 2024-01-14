import React, { useContext } from "react";
import DataContext from "./context/DataContext";

const Footer = () => {
  const { height } = useContext(DataContext);
  const today = new Date();
  return (
    <footer className="Footer">
      <h1>CopyRights &copy; {today.getFullYear()} </h1>
      <p>Height:{height}</p>
    </footer>
  );
};

export default Footer;
