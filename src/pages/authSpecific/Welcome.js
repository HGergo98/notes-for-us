import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  return (
    <section className="welcome">
      <p>{today}</p>
      <h1>Welcome!</h1>
      <p>
        <Link to="/dashboard/notes">View Notes</Link>
      </p>
      <p>
        <Link to="/dashboard/notes/new">Add New Note</Link>
      </p>
      <p>
        <Link to="/dashboard/users">View User Settings</Link>
      </p>
      <p>
        <Link to="/dashboard/users/new">Add New User</Link>
      </p>
    </section>
  );
};

export default Welcome;
