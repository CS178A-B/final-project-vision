import React from 'react'

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
        let clubs = []
        for (let key in this.state){
            let value = this.state[key]
            if (value===true) {
                clubs.push(key)
            }
        }
        console.log(clubs)
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
                </label>                
            </form>
                <button onClick={this.handleSubmit}>Submit</button>
             </div>
        )
    }
}

export default Clubs;