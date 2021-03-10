import React, { useState, useEffect } from 'react'
import {withAuthenticationRequired} from '@auth0/auth0-react'
import Loading from './loading'
import CreateEvent from './CreateEvent'

const RenderOrganizationInfo = (props) => {
    const org_description = props.organization;
    // const org_name = props.organization.org_name;
    // const org_id = props.organization.organization_id;
    // let delegator = props.delegatedOrgs[org_id];
    // console.log(props)
    return (
        <>
            {/* <div>Org Name: {org_name}</div> */}
            {/* <div>Org Description: {org_description}</div> */}
            {/* { delegator ? <CreateEvent /> : <></>} */}
        </>
    )
}

const OrganizationProfile = (props) => {
    const {currentProfile, changeCurrentProfile} = useState([]);

    // changeCurrentProfile([...currentProfile,"0"])
    return(
        <>
        <RenderOrganizationInfo delegatedOrgs={props.delegatedOrgs} organization={currentProfile}/>
        {/* You can loop through props.delegatedOrgs with the map function (kinda like organizationsBlock) */}
        {/* <CreateEvent organization_id={"60486d2ebd0c5fa06733bcb2"} Subject={"persians"} Location={"Iran"} StartTime={"7:00 PM"} EndTime={"10:00 PM"}/> */}
        {/* {console.log(props.orgNames)} */}
        {console.log(props.orgNames)}
        {Object.keys(props.orgNames).map((item,i) => {
            return <div key={i}>{item.org_name}</div>
        })}
        </>
    )
}


export default withAuthenticationRequired(OrganizationProfile, {
    onRedirecting: () => <Loading />,
  });