import React, { Fragment } from "react";

const Login = ({ setAuth }) => {
  return (
    <Fragment>
      <h1>Login</h1>
      <button onClick={() => setAuth(true)}></button>
    </Fragment>
  );
};

export default Login;
