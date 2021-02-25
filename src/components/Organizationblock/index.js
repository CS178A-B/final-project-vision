import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { LeftGroup } from './styled';
import styled from 'styled-components';

/** COMMENT DURING PROD **/
// const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD

const Button = styled.button`
  background-color: red;
  color: white;
  border-radius: 5px;
`
/** UNCOMMENT DURING PROD **/ 
const API = 'https://team-vision-cs178.herokuapp.com/api/'

const OrganizationsBlock = props => {
    
    const { getAccessTokenSilently } = useAuth0();

    const handleClick = async e =>{
        try {
        const token = await getAccessTokenSilently();
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`)
        const orgName = e.target.name;
        const data = new FormData()
        data.append("organization", orgName)
        // call api to add calendar events
        fetch(API + "deleteOrganization", {
            method: 'POST',
            headers: myHeaders,
            body: data,
        }).then(window.location.reload(false))
        }
        catch (error) {
            console.log(error)
        }
    }

        return (
            <LeftGroup>
            <div style={{ width: '140%',  bottom: '10' }}>
            <form>
                <h1>MY ORGANIZATIONS</h1>
                    {props.orgNames.map((name, i)=>{
            return <div key={i}><label>{name} {''}
            <Button onClick={handleClick} name={name} type="checkbox">
            Delete
            </Button>
            </label><br /></div>
        })}         
            </form>
                {/* <button onClick={handleSubmit}>Submit</button> */}
             </div>
             </LeftGroup>
        );
        
}

export default OrganizationsBlock