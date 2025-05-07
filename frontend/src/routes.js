import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AccountsList from './components/AccountsList';
import AccountDetails from './components/AccountDetails';
import CasesList from './components/CasesList';
import CaseDetails from './components/CaseDetails';
import CreateCaseForm from './components/CreateCaseForm';
import LandingPage from './components/LandingPage';
import CreateUser from './components/CreateUser';
import CreateAccount from './components/CreateAccount';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/accounts" component={AccountsList} />
                <Route path="/account_details/:account_id" component={AccountDetails} />
                <Route path="/cases" component={CasesList} />
                <Route path="/case_details/:case_id" component={CaseDetails} />
                <Route path="/create_case" component={CreateCaseForm} />
                <Route path="/welcome" component={LandingPage} />
                <Route path="/create_account" component={CreateAccount} />
                <Route path="/create_user" component={CreateUser} />
                <Route path="/users" component={UsersList} />
                {/* Add more routes as needed */}
            </Switch>
        </Router>
    );
};

export default Routes;