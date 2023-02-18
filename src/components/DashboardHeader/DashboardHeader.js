import React, { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { useSendLogoutMutation } from "../../app/api/authApiSlice";

const DASHBOARD_REGEX = /^\/dashboard(\/)?$/;
const NOTES_REGEX = /^\/dashboard\/notes?$/;
const USERS_REGEX = /^\/dashboard\/users?$/;

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.data?.message}</p>;
  }

  let dashboardHeaderContainerClass = null;

  if (
    !DASHBOARD_REGEX.test(pathname) ||
    NOTES_REGEX.test(pathname) ||
    USERS_REGEX.test(pathname)
  ) {
    dashboardHeaderContainerClass = "dash-header__container--small";
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  return (
    <header className="dash-header">
      <div
        className={`dash-header__container ${dashboardHeaderContainerClass}`}
      >
        <Link to="/dashboard">
          <h1 className="dash-header__title">Notes for us.</h1>
        </Link>
        <nav className="dash-header__nav">
          {/* add more buttons later */}
          {logoutButton}
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;
