import React, { useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import { useSendLogoutMutation } from "../../app/api/authApiSlice";
import useAuth from "../../hooks/useAuth";

const DASHBOARD_REGEX = /^\/dashboard(\/)?$/;
const NOTES_REGEX = /^\/dashboard\/notes?$/;
const USERS_REGEX = /^\/dashboard\/users?$/;

const DashboardHeader = () => {
  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const onNewNoteClicked = () => navigate("/dashboard/notes/new");
  const onNewUserClicked = () => navigate("/dashboard/users/new");
  const onNotesClicked = () => navigate("/dashboard/notes");
  const onUsersClicked = () => navigate("/dashboard/users");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.data?.message}</p>;
  }

  let dashboardHeaderContainerClass = null;
  if (
    !DASHBOARD_REGEX.test(pathname) &&
    !NOTES_REGEX.test(pathname) &&
    !USERS_REGEX.test(pathname)
  ) {
    dashboardHeaderContainerClass = "dash-header__container--small";
  }

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className="icon-button"
        title="New Note"
        onClick={onNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes("/dashboard")) {
    notesButton = (
      <button className="icon-button" title="Notes" onClick={onNotesClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  let newUserButton = null;
  if (USERS_REGEX.test(pathname)) {
    newUserButton = (
      <button
        className="icon-button"
        title="New User"
        onClick={onNewUserClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let usersButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes("/dashboard")) {
      usersButton = (
        <button className="icon-button" title="Users" onClick={onUsersClicked}>
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  const logoutButton = (
    <button className="icon-button" title="Logout" onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const errClass = isError ? "errmsg" : "offscreen";

  let buttons;
  if (isLoading) {
    buttons = <p>Logging Out...</p>;
  } else {
    buttons = (
      <>
        {newNoteButton}
        {notesButton}
        {newUserButton}
        {usersButton}
        {logoutButton}
      </>
    );
  }

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <header className="dash-header">
        <div
          className={`dash-header__container ${dashboardHeaderContainerClass}`}
        >
          <Link to="/dashboard">
            <h1 className="dash-header__title">Notes for us.</h1>
          </Link>
          <nav className="dash-header__nav">{buttons}</nav>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
