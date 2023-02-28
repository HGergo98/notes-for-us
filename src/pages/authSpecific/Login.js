import React, { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";

import { setCredentials } from "../../app/api/authSlice";
import { useLoginMutation } from "../../app/api/authApiSlice";
import usePersist from "../../hooks/usePersist";
import useTitle from "../../hooks/useTitle";

const Login = () => {
  useTitle("Notes for Us | Login");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRef = useRef();
  const errorRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [persist, setPersist] = usePersist();

  const [login, { isLoading }] = useLoginMutation();

  const errClass = errMsg ? "errmsg" : "offscreen";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleUserInput = (e) => setUsername(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const handleToggle = () => setPersist((prev) => !prev);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (error) {
      if (!error.status) {
        setErrMsg("No Server Response");
      } else if (error.status === 400) {
        setErrMsg("Missing Username or Password");
      } else {
        setErrMsg(error?.data?.message);
      }
      errorRef.current.focus();
    }
  };

  if (isLoading) {
    return <PulseLoader color={"#FFF"} />;
  }

  return (
    <section className="public">
      <header>
        <h1>User Login</h1>
      </header>
      <main className="login">
        <p ref={errorRef} className={errClass} aria-live="assertive">
          {errMsg}
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            className="form__input"
            type="text"
            id="username"
            ref={userRef}
            value={username}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            className="form__input"
            type="password"
            id="password"
            onChange={handlePwdInput}
            value={password}
            required
          />
          <button className="form__submit-button">Sign In</button>

          <label htmlFor="persist" className="form__persist">
            <input
              type="checkbox"
              className="form__checkbox"
              id="persist"
              onChange={handleToggle}
              checked={persist}
            />
            Trust This Device
          </label>
        </form>
      </main>
      <footer>
        <Link to="/">Back to Home</Link>
      </footer>
    </section>
  );
};

export default Login;
