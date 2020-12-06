import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import RegisterScreen from './views/registerScreen';
import LoginScreen from './views/loginScreen';
import OtpScreen from './views/otpScreen';
import HomeScreen from './views/homeScreen';
import appHistory from './appHistory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Router history={appHistory}>
    <div className="App">
    <Switch>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/login" component={LoginScreen}></Route>
        <Route path="/home" component={HomeScreen}></Route>
        <Route path="/otp" component={OtpScreen}></Route>
        <Route path="/" component={LoginScreen}></Route>
    </Switch>
    <ToastContainer
      position="bottom-left"
      hideProgressBar />
    </div>
    </Router>
  );
}

export default App;
