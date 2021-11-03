import React from 'react';
import { Link } from 'react-router-dom';
import CinnamonLogo from './cinnamon-roll.png';
import { HOMEPAGE } from '../../utils/routes.js';
import './navbar.css';

export const AppTitle = () => {
  return (
    <div>
      <Link to={HOMEPAGE}>
        <img src={CinnamonLogo} className="logo" alt="cinnamonLogo" />
        <span className="app-title">Cinnamon</span>
      </Link>
    </div>
  );
};
