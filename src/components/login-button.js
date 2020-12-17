// src/components/login-button.js

import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

const LoginButton = props => {
    const { loginWithRedirect } = props.auth0;

    return (
      <button
        className="btn btn-primary btn-block"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    );
}

export default withAuth0(LoginButton);