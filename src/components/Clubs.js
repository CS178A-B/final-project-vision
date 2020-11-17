import React from 'react'
import DataSource from '../mock_data/datasource.json';
import { Inject,ScheduleComponent,Day, Week, WorkWeek, Month, Agenda, EventSettingsModel } from '@syncfusion/ej2-react-schedule';

import '../styles/Clubs.css'

const dict = {
    "isChessClub" : "ucrchessclub",
    "isACM" : "ucracm",
    "isPersianClub" : "ucrpersianclub"
}


class Clubs extends React.Component {
    state = {
        isChessClub : false,
        isACM : false,
        isPersianClub : false
    };
    
    handleClick = e =>{
        this.setState({[e.target.name] : e.target.checked})
    }

    handleSubmit = e =>{
        let clubs = []
        for (let key in this.state){
            let value = this.state[key]
            if (value===true) {
                clubs.push(dict[key])
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
                <input type="checkbox" name="isChessClub" onClick={this.handleClick}/>
                </label><br />
                <label>
                ACM
                <input type="checkbox" name="isACM" onClick={this.handleClick}/>
                </label><br />
                <label>
                Persian Club
                <input type="checkbox" name="isPersianClub" onClick={this.handleClick}/>
                </label>                
            </form>
                <button onClick={this.handleSubmit}>Submit</button>
             </div>
        )
    }
}

export default Clubs;