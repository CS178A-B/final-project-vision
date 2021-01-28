import React from 'react';
import NavbarUser from './components/NavbarUser';
import Organizationblock from './components/Organizationblock'

/** COMMENT DURING PROD **/
// const API = 'http://127.0.0.1:8000/api/' //COMMENT DURING PROD


/** UNCOMMENT DURING PROD **/ 

class Organizations extends React.Component {


    render() {
        return (
            <div>
            <NavbarUser />
             </div>
        )
    }
}

export default Organizations;