// src/components/login-button.js

import React from "react";
import { useAuth0, withAuth0 } from "@auth0/auth0-react";

const LoginButton = props => {
    const { loginWithPopup } = useAuth0();;

    return (
      <button
        className="btn btn-primary btn-block"
        onClick={() => loginWithPopup()}
      >
        Log In
      </button>
    );
}

export default withAuth0(LoginButton);