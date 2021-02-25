// src/components/JoinOrganization.js

import React from "react";
import { withAuth0 } from "@auth0/auth0-react";

const JoinOrganization = props => {
    console.log(props.match.params.id)
    return (
      <div>In join org page -- check console</div>
    );
}

export default withAuth0(JoinOrganization);