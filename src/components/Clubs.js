import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";

/** COMMENT DURING PROD **/
const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD


/** UNCOMMENT DURING PROD **/ 
// const API = 'http://team-vision-cs178.herokuapp.com/api/'

const Clubs = props => {
    
    const { getAccessTokenSilently } = useAuth0();

    const [clubs, setClub] = useState({
        ACM: false,
        ChessClub: false,
        PersianClub: false
    });

    const handleClick = e =>{
        const clubName = e.target.name;
        const newVal = e.target.checked;
        setClub(() => {
            clubs[clubName] = newVal;
            return clubs;
        })
    }

    const handleSubmit = async e =>{
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
            <div className="Clubs">
            <form>
                <label>
                Chess Club
                <input type="checkbox" name="Chess Club" onClick={handleClick}/>
                </label><br />
                <label>
                ACM
                <input type="checkbox" name="ACM" onClick={handleClick}/>
                </label><br />
                <label>
                Persian Club
                <input type="checkbox" name="Persian Club" onClick={handleClick}/>
                </label>                
            </form>
                <button onClick={handleSubmit}>Submit</button>
             </div>
        )
}

export default Clubs;