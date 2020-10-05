import React from "react";
import "./App.css";
import FormLogin from './pages/components/FormLogin';
import { Switch, Route } from 'react-router-dom';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import ProtectedRoutes from './pages/components/ProtectedRoutes';
function App() {
  return (
      <Switch>
        <Route exact path="/" component={FormLogin} />
        <Route  path="/admin" component={AdminDashboard} />
      </Switch>
  );
}

export default App;
