import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div className='header'>
      <NavLink to='/' className='header__link'>
        <h1 className='header__title'>
          Search for characters Rick And Morty API
        </h1>
      </NavLink>
    </div>
  );
}
