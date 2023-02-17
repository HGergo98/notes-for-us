import { Link } from "react-router-dom";

import React from 'react'

const Public = () => {
  return (
    <section className="public">
      <header>
        <h1>Welcome to <span className="nowrap">Notes For Us!</span></h1>
      </header>
      <main className="public__main">
        <p>Located in your browser</p>
        <p>Owner: HGergo98</p>
      </main>
      <footer>
        <Link to="/login">User Login</Link>
      </footer>
    </section>
  );
};

export default Public;