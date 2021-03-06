import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddEvent from './components/AddEvent/AddEvent';
import Home from './components/Home/Home';
import Header from './components/Header/Header';
import SignIn from './components/SignIn/SignIn';
import Login from './components/Login/Login';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CheckOut from './components/CheckOut/CheckOut';
import Order from './components/Order/Order';

export const userContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <div className="App">
      <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Header/>
          <Switch>

            <Route path="/home">
              <Home/>
            </Route>

            <Route exact path="/">
              <Home/>
            </Route>

            <Route exact path="/login">
              <Login/>
            </Route>

            <PrivateRoute exact path="/admin">
            <AddEvent/>
            </PrivateRoute>
            
            <PrivateRoute exact path="/checkout/:id">
              <CheckOut/>
            </PrivateRoute>

            <PrivateRoute exact path="/order/:id">
              <Order/>
            </PrivateRoute>


            <Route exact path="*">
              <h1 className="text-center">Page Not Found</h1>
            </Route>

          </Switch>
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;