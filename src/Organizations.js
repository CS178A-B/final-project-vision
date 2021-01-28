import React, { useState, useEffect } from 'react';
import Loading from './components/loading.js';
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import NavbarUser from './components/NavbarUser';

/** COMMENT DURING PROD **/
 //const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD


/** UNCOMMENT DURING PROD **/ 
const API = 'https://team-vision-cs178.herokuapp.com/api/'

const Organizations = props => { 
    const [newOrganizations, setNewOrganizations] = useState([]);
    const [orgs, setOrgs] = useState({});
    const { getAccessTokenSilently } = useAuth0();

    const fetchClubList = async () => {
        try {
            const token = await getAccessTokenSilently();
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`)
            fetch(API + "getListOfOrganizations", {
                method: 'GET',
                headers:myHeaders
            }).then(res => res.json())
            .then(data => {
                 let clubsNotApartOf = [];
                 for(let clubIdx in data) {
                     for(let clubName in data[clubIdx]) {
                        if(props.myOrgs && props.myOrgs.indexOf(data[clubIdx][clubName]) >= 0) { //found the club in the list of clubs we are already apart of. 
                            // skip it
                         } else if (props.myOrgs) {
                            clubsNotApartOf.push(data[clubIdx][clubName]);
                         }
                     }
                 }
                 setNewOrganizations(clubsNotApartOf);
            })
        } catch(e) {
            console.log(e)
        }
    };

    const handleClick = (e) => {
        let orgName = e.target.name;
        const newVal = e.target.checked;
        orgName = orgName.replace(/\s/g, ''); //Remove Spaces for endpoint 
        setOrgs(() => {
            orgs[orgName] = newVal;
            return orgs;
        })
    }
    const handleSubmit = async () => {
        try {
            console.log(orgs)
            const token = await getAccessTokenSilently();
            let output = ""; // what we will end up sending as body
            for (let org in orgs) {
                let value = orgs[org]
                if(value == true) {//selected 
                    output += org + ", ";
                }
            }
            // we want to remove last comma and space
            output = output.substring(0, output.length -2);
            console.log(output)
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`)
            const data = new FormData()
            data.append("organizations", output)
            fetch(API + "addOrganization", {
                method: 'POST',
                headers:myHeaders,
                body: data,
            }).then(res => res.json())
            .then(() => {window.location.reload(false)})
        } catch (e) {
            console.log(e)
        }
    }



    useEffect(() => {
        fetchClubList()
    }, [props]);
    return (
    <div>
    <NavbarUser />  
        Here are organizations you can join:
        {props.myOrgs ? (newOrganizations.map((item,i) => {
            return <div key={i}>{item} <input type="checkbox" name={item} onClick={handleClick}></input></div>
        })) : <Loading />}
        {props.myOrgs ? <button onClick={handleSubmit}> Add Selected Organization(s)</button> : null}
    </div>
    )
}

export default withAuthenticationRequired(Organizations, {
  onRedirecting: () => <Loading />,
});