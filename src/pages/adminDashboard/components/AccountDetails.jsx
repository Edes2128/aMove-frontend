import React , {useContext,useState} from 'react'
import DepoContext from '../../../context/depoContext/DepoContext';
import Button from '@material-ui/core/Button';


export default function AccountDetails() {

    const depoContext = useContext(DepoContext);
    const {user} = depoContext;
    const [userSettings,setUserSettings] = useState("general");    


    return (
        <>
        <div className="account-details" >
            <div className="account-details-buttons">
                    <Button style={{color: userSettings === "general" ? "#1b75bc" : 'inherit'}} onClick={() => setUserSettings("general")} > General Info </Button>
                    <Button style={{color: userSettings === "password" ? "#1b75bc" : 'inherit'}} onClick={() => setUserSettings("password")}> Change Password </Button>
            </div>
            <div className="account-details-container">
                            {userSettings === "general" && <p>Genral</p> }
                            {userSettings === "password" && <p>Password</p> }
            </div>
        </div>
        </>
    )
}
