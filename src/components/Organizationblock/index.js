import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { LeftGroup } from './styled';
import styled from 'styled-components';

const Button = styled.button`
  background-color: red;
  color: white;
  border-radius: 5px;
`
const API = 'https://team-vision-cs178.herokuapp.com/api/'

const OrganizationsBlock = props => {
    
    const { getAccessTokenSilently } = useAuth0();

    const handleClick = async e =>{
        e.preventDefault();
        try {
        const token = await getAccessTokenSilently();
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`)
        const orgName = e.target.name;
        const data = new FormData()
        data.append("organization_id", orgName)
        // call api to add calendar events
        fetch(API + "deleteOrganization", {
            method: 'POST',
            headers: myHeaders,
            body: data,
        }).then(res => res.json())
        .then(res => window.location.reload(false))
        }
        catch (error) {
            console.log(error)
        }
    }

        return (
            <div style={{ width: '140%',  bottom: '10' }}>
            <form>
                <h3>My Organizations</h3>
                    {(Object.keys(props.orgNames)).map((name, i)=>{
            return <div key={i}><label>{props.orgNames[name].org_name} {''}
            <Button name={name} onClick={handleClick}>
            Delete
            </Button>
            </label><br /></div>
        })}         
            </form>
                {/* <button onClick={handleSubmit}>Submit</button> */}
             </div>
        );
        
}

export default OrganizationsBlock