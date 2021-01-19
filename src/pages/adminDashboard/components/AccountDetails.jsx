import React , {useContext} from 'react'
import DepoContext from '../../../context/depoContext/DepoContext';

export default function AccountDetails() {

    const depoContext = useContext(DepoContext);
    const {user} = depoContext;
    
        console.log(user)

    return (
        <div className="account-details" >
            <h3>Account Settings</h3>
        </div>
    )
}
