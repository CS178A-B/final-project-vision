import React, { useState, useEffect } from 'react'
import {withAuthenticationRequired, useAuth0} from '@auth0/auth0-react'
import Loading from './loading'
import CreateEvent from './CreateEvent'
import styled from 'styled-components';
import { bind } from 'jest-each';
import { Col, Container, Row } from 'react-bootstrap';
import { bgColor } from './colors';
import { Block } from './Featureblock/styled';

const Button = styled.button`
  background-color: red;
  color: white;
  border-radius: 5px;
`;

const API = 'https://team-vision-cs178.herokuapp.com/api/'

const RenderOrganizationInfo = (props) => {
    const {getAccessTokenSilently,user,isLoading} = useAuth0();
    const org_description = props.currentProfile.org_description;
    const org_name = props.currentProfile.org_name;
    const org_id = props.currentProfile.org_id;
    const org_events = props.currentProfile.org_events;
    const joinLink = `https://team-vision-cs178.herokuapp.com/join/${org_id}`
    let delegator = props.delegatedOrgs[org_id]; //check if you are a delegator for the current org
    const [members, setMembers] = useState({});
    const [delegators, setDelegators] = useState({});
    console.log(user.sub);
    useEffect(() => {
        const getOrgMembers = async () => {
            try {
                const token = await getAccessTokenSilently();
                const myHeaders = new Headers();
                myHeaders.append('Authorization', `Bearer ${token}`)
                fetch(API + "getDictionaryOfMembers?" + new URLSearchParams({organization_id: org_id}),{
                    method: 'GET',
                    headers: myHeaders
                }).then(res => res.json())
                .then(res => {
                    console.log(res)
                    setMembers(res.members)
                    setDelegators(res.delegators)
                })

            } catch (error) {
                console.log(error)
            }
        }
        getOrgMembers()
    },[props,getAccessTokenSilently])
    
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
        (isLoading) ? <Loading /> :
        <>
            {org_id === "" ? <></> :  //only render things when we have an organization info to display
            <>
                <Row>
                    <Col md={{ span: 8}} style={{ marginBottom: "20px", marginRight: "0" }}>
                        <Container style={{borderRadius: "20px", background: bgColor.BlueGray, width: "80%", marginTop: "20px", padding: "40px", alignSelf: "left"}}>
                        <h4 style={{ textAlign: "center", fontSize:"1.1em" }}>Organization: {org_name}</h4>     
                        </Container>
                        <Container style={{borderRadius: "20px", background: bgColor.LightGray, width: "80%", marginTop: "20px", padding: "10px"}}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                        
                        <div style={{ marginTop: "10px", marginBottom: "20px", fontSize: "0.8em"}}>
                            Org Description: {org_description}
                        </div>
                        <div>
                        <p style={{ fontSize: "0.6em" }}>Join Link: {joinLink}</p>   
                        </div>
                        </div>
                        </Container>

                        <Container style={{borderRadius: "20px", background: bgColor.LightGray, width: "80%", marginTop: "20px", padding: "10px"}}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ marginTop: "10px", marginBottom: "20px", fontSize: "0.8em"}}>
                            Delegator(s): {Object.keys(delegators).map((name, i) => {
                                const currentUser= user.sub;
                                return (
                                (name === currentUser.replace('|','.')) ? 
                                <div style={{color: 'blue', fontWeight: 'bold'}}key={i}>{delegators[name]}</div> :
                                <div key={i}>{delegators[name]}</div>
                                )
                            })}
                           { delegator ? <CreateEvent organization_id={org_id}/> : <></> }
                        </div>
                        <div style={{ marginTop: "10px", marginBottom: "20px", fontSize: "0.8em"}}>
                            Member(s): {Object.keys(members).map((name, i) => {
                                const currentUser= user.sub;
                                  return (
                                    (name === currentUser.replace('|','.')) ? 
                                    <div style={{color: 'blue', fontWeight: 'bold'}}key={i}>{members[name]}</div> :
                                    <div key={i}>{members[name]}</div>
                                    )
                            })}
                        </div>
                        </div>
                        </Container>
                    </Col>
                    <Col md={{span: 4}} style={{ margin: "auto" }}>
                        {/* <Container style={{ background: bgColor.LightBlue, borderRadius: "20px", height: "80vh"}}>

                        </Container> */}
                    </Col>
                </Row>
                
                {/* <div>Org Description: {org_description}</div> */}
                <div>Role: {delegator ? "Delegator" : "Member"}</div>
                {/* <div>Org Name: {org_name}</div> */}
                {/* <div>Org Description: {org_description}</div> */}
                {/* <div>Join Link: {joinLink}</div> */}
                
                <div>{Object.keys(org_events).map((item,i) => 
                    <div key={i}>
                        Event Name: <span>{(org_events[item].title)} {' '} </span>
                        {delegator ?<Button onClick={handleDelete(org_id,org_events[item].id)}>
                            Delete
                </Button> : <></>}
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