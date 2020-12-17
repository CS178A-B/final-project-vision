import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { LeftGroup } from './styled';

/** COMMENT DURING PROD **/
// const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD


/** UNCOMMENT DURING PROD **/ 
const API = 'http://team-vision-cs178.herokuapp.com/api/'

const OrganizationsBlock = props => {
    
    const { getAccessTokenSilently } = useAuth0();

    const [clubs, setClub] = useState({});

    const handleClick = e =>{
        const clubName = e.target.name;
        const newVal = e.target.checked;
        setClub(() => {
            clubs[clubName] = newVal;
            return clubs;
        })
    }

    const handleSubmit = async e =>{

        console.log(clubs)
        try {
        const token = await getAccessTokenSilently();
        let output = "";
        for (let key in clubs){
            let value = clubs[key]
            if (value===true) {
                output += key + ", ";
            }
        }
        // remove last comma and space
        output = output.substring(0, output.length -2);
        const myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`)
        const data = new FormData()
        data.append("organizations", output)
        // call api to add calendar events
        fetch(API + "addOrganization", {
            method: 'POST',
            headers: myHeaders,
            body: data,
        }).then(props.action)
    } catch (error) {
        console.log(error)
    }
    }
        return (
            <LeftGroup>
            <div style={{ width: '110%',  bottom: '10' }}>
            <form>
                <h1>O R G A N I Z A T I O N S</h1>
                <label>
                Chess Club
                <input type="checkbox" name="ChessClub" onClick={handleClick}/>
                </label><br />
                <label>
                ACM
                <input type="checkbox" name="ACM" onClick={handleClick}/>
                </label><br />
                <label>
                Persian Club
                <input type="checkbox" name="PersianClub" onClick={handleClick}/>
                </label> <br />
                <label>
                Team Vision
                <input type="checkbox" name="TeamVision" onClick={handleClick}/>
                </label><br />
                <label>
                Team Rocket
                <input type="checkbox" name="TeamRocket" onClick={handleClick}/>
                </label><br />
                <label>
                Lakers Fan Club
                <input type="checkbox" name="LakersFanClub" onClick={handleClick}/>
                </label><br />
                <label>
                CS178 Fan Club
                <input type="checkbox" name="CS178FanClub" onClick={handleClick}/>
                </label> <br /> <br />                   
            </form>
                <button onClick={handleSubmit}>Submit</button>
             </div>
             </LeftGroup>
        );
        
}

export default OrganizationsBlock