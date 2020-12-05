import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import RegisterScreen from './views/registerScreen';
import LoginScreen from './views/loginScreen';
import OtpScreen from './views/otpScreen';
import appHistory from './appHistory';

function App() {
  return (
    <Router history={appHistory}>
    <div className="App">
    <Switch>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/login" component={LoginScreen}></Route>
        <Route path="/otp" component={OtpScreen}></Route>
        <Route path="/" component={LoginScreen}></Route>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
