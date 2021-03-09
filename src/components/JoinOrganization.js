// src/components/JoinOrganization.js

import React, { useEffect } from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import Loading from "./loading";

const API = 'https://team-vision-cs178.herokuapp.com/api/'

const JoinOrganization = props => {
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const joinOrgHandler = async () => {
      try {
        const token = await getAccessTokenSilently();
        const myHeaders = new Headers();
        const data = new FormData();
        myHeaders.append('Authorization', `Bearer ${token}`)
        data.append("organization_id", props.match.params.id)
        data.append("public_true_or_false",'true')
        fetch(API + "addOrganization", {
          method: 'POST',
          headers: myHeaders,
          body: data,
        }).then(res => res.json())
        .then( res => console.log(res))
      } catch( error) {
        console.log(error)
      }
    }
    joinOrgHandler()
  })
    console.log(props.match.params.id)
    return (
      <div>In join org page -- check console</div>
    );
}

export default withAuthenticationRequired(JoinOrganization, {
  onRedirecting : () => <Loading />,
});