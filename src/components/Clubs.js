import React from 'react'
import Navbar from '../components/Navbar';

/** COMMENT DURING PROD **/
// const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD


/** UNCOMMENT DURING PROD **/ 
const API = 'http://team-vision-cs178.herokuapp.com/api/'

class Clubs extends React.Component {
    state = {
        "ACM" : false,
        "Persian Club" : false,
        "Chess Club" : false
    };
    
    handleClick = e =>{
        this.setState({[e.target.name] : e.target.checked})
    }

    handleSubmit = e =>{
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

    render() {
        return (
            <div className="Clubs">
            <form>
                <label>
                Chess Club
                <input type="checkbox" name="Chess Club" onClick={this.handleClick}/>
                </label><br />
                <label>
                ACM
                <input type="checkbox" name="ACM" onClick={this.handleClick}/>
                </label><br />
                <label>
                Persian Club
                <input type="checkbox" name="Persian Club" onClick={this.handleClick}/>
                </label><br />
                <label>
                Team Vision
                <input type="checkbox" name="Team Vision" onClick={this.handleClick}/>
                </label><br />
                <label>
                Team Rocket
                <input type="checkbox" name="Team Rocket" onClick={this.handleClick}/>
                </label><br />
                <label>
                Lakers Fan Club
                <input type="checkbox" name="Lakers Fan Club" onClick={this.handleClick}/>
                </label><br />
                <label>
                CS178 Fan Club
                <input type="checkbox" name="CS178 Fan Club" onClick={this.handleClick}/>
                </label> <br /> <br />                   
            </form>
                <button onClick={this.handleSubmit}>Submit</button>
             </div>
        )
    }
}

export default Clubs;