import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import ProtectedRoute from '../components/common/ProtectedRoute';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <ProtectedRoute path="/dashboard" component={Dashboard} />
                <ProtectedRoute path="/profile" component={Profile} />
            </Switch>
        </Router>
    );
};

export default Routes;