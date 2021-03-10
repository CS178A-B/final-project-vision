import react from 'react'
import {withAuthenticationRequired} from '@auth0/auth0-react'
import Loading from './loading'
const OrganizationProfile = (props) => {
    return(
        <>
        {/* You can loop through props.delegatedOrgs with the map function (kinda like organizationsBlock) */}
            Club Hash(s): {Object.keys(props.delegatedOrgs).map((item,i) => {
                return (<>
                name: { props.delegatedOrgs[item]} - id: {item}
                </>)
            })}
        </>
    )
}


export default withAuthenticationRequired(OrganizationProfile, {
    onRedirecting: () => <Loading />,
  });