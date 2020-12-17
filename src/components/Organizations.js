import React from 'react'
import Navbar from '../components/Navbar';
import Organizationblock from './Organizationblock'

/** COMMENT DURING PROD **/
// const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD


/** UNCOMMENT DURING PROD **/ 

class Organizations extends React.Component {


    render() {
        return (
            <div>
            <Navbar />
            <Organizationblock />
             </div>
        )
    }
}

export default Organizations;