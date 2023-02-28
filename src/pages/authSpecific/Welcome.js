import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTitle from "../../hooks/useTitle";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();
  useTitle(`Notes for Us | Welcome - ${username}`);

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome {username}!</h1>
      <p>
        <Link to="/dashboard/notes">View Notes</Link>
      </p>
      <p>
        <Link to="/dashboard/notes/new">Add New Note</Link>
      </p>
      {isManager || isAdmin ? (
        <>
          <p>
            <Link to="/dashboard/users">View User Settings</Link>
          </p>
          <p>
            <Link to="/dashboard/users/new">Add New User</Link>
          </p>
        </>
      ) : null}
    </section>
  );
};

export default Welcome;
