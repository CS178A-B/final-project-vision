import React from 'react'
import {withAuthenticationRequired} from '@auth0/auth0-react'
import Loading from './loading'
import CreateEvent from './CreateEvent'
const OrganizationProfile = (props) => {
    return(
        <>
        {/* You can loop through props.delegatedOrgs with the map function (kinda like organizationsBlock) */}
        <CreateEvent organization_id={"604856ba474d57537b816ba8"} Subject={"persians"} Location={"Iran"} StartTime={"7:00 PM"} EndTime={"10:00 PM"}/>
        </>
    )
}


export default withAuthenticationRequired(OrganizationProfile, {
    onRedirecting: () => <Loading />,
  });