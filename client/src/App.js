import React from 'react'
import SignUp from './Components/SignUp'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './Components/Home';
import './App.css'
import Login from './Components/Login';
import MainPage from './Components/MainPage';
import Public from './Components/Public';
import Compare from './Components/Compare';
import Try from './Components/Try';
import Logout from './Components/Logout';
const App = () => {
  return (
    <div>
      <Router>
        <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/mainpage">
           <MainPage/>
          </Route>
          <Route path="/public">
            <Public/>
          </Route>
          <Route path="/compare">
            <Compare/>
          </Route>
          <Route path="/try">
             <Try/>
          </Route>
          <Route path="/logout">
            <Logout/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
