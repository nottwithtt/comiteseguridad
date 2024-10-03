import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { BACKEND_ROUTE } from "../scripts/constants";
import Axios from "axios";

function UserNavbar() {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style = {{ backgroundColor: "#A7867D" }}
    >
      <div className="container">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-3 mb-lg-3">
            <li className="nav-item me-4 mt-3">
              <Link to="/calendar" className="nav-link text-black rounded" style={{background: "white"}}>
                Agenda
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex"> 
          <ul className="navbar-nav me-auto mb-3 mb-lg-3">
            <li className="nav-item me-4 mt-3">
              <Link to="/login" className="nav-link text-black rounded" style={{background: "white"}}>
              Iniciar sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
