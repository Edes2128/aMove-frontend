import React ,{useState,useEffect} from 'react'
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import { Switch } from 'react-router-dom';
import ProtectedRoutes from "../components/ProtectedRoutes";
import Home from './components/Home';
import Porosite from './components/Porosite';
import Produktet from './components/Produktet';

export default function KlientDashboard({history}) {
    const [user, setUser] = useState({});

    useEffect(() => {
        axios
          .post("http://localhost/demo_react_server/api/config/user_profile.php", {
            token: JSON.parse(localStorage.getItem("token")),
          })
          .then((res) => setUser(res.data.user));
      }, []);
    
      const handleLogout = () => {
        localStorage.setItem("auth", false);
        localStorage.removeItem("token");
        history.push("/");
      };

    return (
        <div className="klient-dashboard">
              <Sidebar />
              <div className="klient-dashboard-header-body">
                    <Header
                            name={user.name}
                            userImg={user.image_profile}
                            handleLogout={() => handleLogout()}
                    />
                     <div className="klient-dashboard-body">
                         <Switch>
                             <ProtectedRoutes exact path="/klient" component={Home}  />
                             <ProtectedRoutes exact path="/klient/porosite" component={Porosite}  />
                             <ProtectedRoutes exact path="/klient/produktet" component={Produktet}  />
                         </Switch>
                     </div>
              </div>
        </div>
    )
}
