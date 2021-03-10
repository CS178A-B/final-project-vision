import React, { useState, useEffect } from 'react'
import {withAuthenticationRequired, useAuth0} from '@auth0/auth0-react'
import Loading from './loading'
import CreateEvent from './CreateEvent'
import styled from 'styled-components';
import { bind } from 'jest-each';

const Button = styled.button`
  background-color: red;
  color: white;
  border-radius: 5px;
`;

const API = 'https://team-vision-cs178.herokuapp.com/api/'

const RenderOrganizationInfo = (props) => {
    const {getAccessTokenSilently} = useAuth0();
    const org_description = props.currentProfile.org_description;
    const org_name = props.currentProfile.org_name;
    const org_id = props.currentProfile.org_id;
    const org_events = props.currentProfile.org_events;
    const joinLink = `https://team-vision-cs178.herokuapp.com/join/${org_id}`
    let delegator = props.delegatedOrgs[org_id]; //check if you are a delegator for the current org
    
    const handleDelete = (org_id,event_id) => async () => {
        try{
        const token = await getAccessTokenSilently();
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`)
        const data = new FormData()
        data.append("organization_id", org_id)
        data.append("id",event_id)
        // call api to add calendar events
        fetch(API + "deleteEvent", {
            method: 'POST',
            headers: myHeaders,
            body: data,
        }).then(res => res.json())
        .then(() => window.location.reload(false))
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {org_id === "" ? <></> :  //only render things when we have an organization info to display
            <>
                <div>Role: {delegator ? <>Delegator <CreateEvent organization_id={org_id}/></> : "Member"}</div>
                <div>Org Name: {org_name}</div>
                <div>Org Description: {org_description}</div>
                <div>Join Link: {joinLink}</div>
                
                <div>{Object.keys(org_events).map((item,i) => 
                    <div key={i}>
                        Event Name: <span>{(org_events[item].title)} {' '} </span>
                        <Button onClick={handleDelete(org_id,org_events[item].id)}>
                            Delete
                        </Button>
                    </div>
                )}</div> 
            </>
        }
        </>
    )
}

const OrganizationProfile = (props) => {
    const [currentProfile, changeCurrentProfile] = useState({
        org_description: "",
        org_events : [],
        org_name: "",
        org_id: ""
    });

    const handleOrgClick = item => () => {
        changeCurrentProfile({
            org_description: props.orgNames[item].org_description,
            org_events: props.orgNames[item].org_events,
            org_name: props.orgNames[item].org_name,
            org_id: item
        })
    }

    return(
        <>
        <div style={{paddingBottom: "20%"}}>
            <RenderOrganizationInfo delegatedOrgs={props.delegatedOrgs} currentProfile={currentProfile}/>
        </div>
        <div> My Organizations: </div>
        {Object.keys(props.orgNames).map((item,i) => {
            return <div key={i} onClick={handleOrgClick(item)}>{props.orgNames[item].org_name}</div>
        })}
        </>
    )
}


export default withAuthenticationRequired(OrganizationProfile, {
    onRedirecting: () => <Loading />,
  });