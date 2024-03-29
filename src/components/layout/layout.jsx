import React from "react";
import Header from "../Header/header";
import "./layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <div className="layout__content">{children}</div>
    </div>
  );
};
export default Layout;
