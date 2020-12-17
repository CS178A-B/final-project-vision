import React, { useState } from 'react'

/** COMMENT DURING PROD **/
// const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD


/** UNCOMMENT DURING PROD **/ 
const API = 'http://team-vision-cs178.herokuapp.com/api/'

const Clubs = props => {
    
    const [ACM, setACM] = useState(false);
    const [PersianClub, setPersianClub] = useState(false);
    const [ChessClub, setChessClub] = useState(false);
    
    const handleClick = e =>{
        this.setState({[e.target.name] : e.target.checked})
    }

    const handleSubmit = e =>{
        let output = "";
        for (let key in this.state){
            let value = this.state[key]
            if (value===true) {
                output += key + ", ";
            }
        }
        // remove last comma and space
        output = output.substring(0, output.length -2);

        const data = new FormData()
        data.append("username", window.localStorage.getItem("username"))
        data.append("organizations", output)
        // call api to add calendar events
        fetch(API + "addOrganization", {
            method: 'POST',
            body: data
        }).then(this.props.action)
        .catch(e => console.log(e))
    }

        return (
            <div className="Clubs">
            <form>
                <label>
                Chess Club
                <input type="checkbox" name="ChessClub" onClick={this.handleClick}/>
                </label><br />
                <label>
                ACM
                <input type="checkbox" name="ACM" onClick={this.handleClick}/>
                </label><br />
                <label>
                Persian Club
                <input type="checkbox" name="PersianClub" onClick={this.handleClick}/>
                </label>                
            </form>
                <button onClick={this.handleSubmit}>Submit</button>
             </div>
        )
}

export default Clubs;