import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHeader = () => {
  return (
    <header className="dash-header">
      <div className="dash-header__container">
        <Link to="/dashboard">
          <h1 className="dash-header__title">Notes for us.</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* add nav buttons later */}
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;