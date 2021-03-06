import React from "react";
import "./App.css";
import FormLogin from './pages/components/FormLogin';
import { Switch, Route } from 'react-router-dom';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import ProtectedRoutes from './pages/components/ProtectedRoutes';
import KlientDashboard from './pages/klientDashboard/KlientDashboard';
import KlientState from './context/klientContext/KlientState';
import DepoState from './context/depoContext/DepoState';
import AlertState from './context/alertContext/AlertState';
import CollapseState from './context/collpaseContext/CollpaseState';

function App() {
  return (
    <DepoState>
      <KlientState>
        <AlertState>
          <CollapseState>
            <Switch>
              <Route exact path="/" component={FormLogin} />
              <ProtectedRoutes path="/admin" component={AdminDashboard} />
              <ProtectedRoutes path="/klient" component={KlientDashboard} />
            </Switch>
          </CollapseState>
        </AlertState>
      </KlientState>
    </DepoState>
  );
}
export default App;