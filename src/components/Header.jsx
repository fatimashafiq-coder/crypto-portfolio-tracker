import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const data = {
    icon: "",
    title: "Crypto Portfolio Tracker",
    subtitle: "Track your cryptocurrency investments with live Binance prices"
  };
  return (
    <>
          <nav className="navbar">
        <Link className="link-one" to="/">Dashboard</Link>
        <Link className="link-two" to="/investments">Investments</Link> 
      </nav>
    <header className="header">
      <div className="header-content">
        <span className="icon">{data.icon}</span>
        <h1 className="title">{data.title}</h1>
      </div>
      <p className="subtitle">{data.subtitle}</p>
    </header>
    </>
  );
};
export default Header;
