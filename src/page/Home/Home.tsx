import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  return (
    <>
      <nav className="nav">
        <Link to={"/"} className="nav__item">
          Home
        </Link>
        <Link to={"normal"} className="nav__item">
          Normal
        </Link>
        <Link to={"fixed"} className="nav__item">
          Fijo
        </Link>
      </nav>

      <div>
        <h2>Demo React Range Without input</h2>
        <Outlet />
      </div>
    </>
  );
};

export default Home;
