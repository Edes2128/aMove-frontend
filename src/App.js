import React from "react";
import "./App.css";
import FormLogin from './pages/components/FormLogin';
import { Switch, Route } from 'react-router-dom';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import ProtectedRoutes from './pages/components/ProtectedRoutes';
import KlientDashboard from './pages/klientDashboard/KlientDashboard';
import KlientState from './pages/klientDashboard/context/KlientState';
import DepoState from './pages/adminDashboard/context/DepoState';
function App() {

  return (
    <DepoState>
      <KlientState>
        <Switch>
          <Route exact path="/" component={FormLogin} />
          <ProtectedRoutes path="/admin" component={AdminDashboard} />
          <ProtectedRoutes path="/klient" component={KlientDashboard} />
        </Switch>
      </KlientState>
    </DepoState>
  );
}

export default App;
