import React from "react";
import { Link } from "react-router-dom";

const Header = ({data}) => {
  return (
    <>
      <nav className="text-end p-4">
        <Link className="text-purple-700 text-xl font-semibold pr-20 no-underline" to="/">Dashboard</Link>
        <Link className="text-purple-700 text-xl font-semibold pr-12 no-underline" to="/investments">Investments</Link>
      </nav>

      <header className="bg-linear-to-r from-blue-500 to-purple-700 text-white text-center p-9 rounded-2xl shadow-lg font-poppins w-full">
        <div className="flex justify-center items-center gap-3 mb-2">
          <span className="text-3xl">{data.icon}</span>
          <h1 className="text-2xl font-bold m-0">{data.title}</h1>
        </div>
        <p className="text-lg opacity-90 m-0">{data.subtitle}</p>
      </header>
    </>
  );
};

export default Header;
