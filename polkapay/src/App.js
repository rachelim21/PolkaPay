import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// import styles
import './App.css';
import './assets/Home.css';

// import views
import Home from './views/Home';
import Reader from './views/Reader';
import Publisher from './views/Publisher';
import Paywall from './views/Paywall';
import Publish from './views/Publish';
import Settings from './views/Settings';
import Register from './views/Register';
import SignIn from './views/SignIn';
import Logout from './views/Logout';

// import images
import logo from './logo.png';

// import components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';

function App() {
  const defaultUser = {
    email: null,
    password: null,
    publisher: null,
  };
  const [user, setUser] = useState(defaultUser);

  // check if user logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      console.log("You are already logged in!");
      console.log(loggedInUser);
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  // logout the user
  const handleLogout = () => {
    setUser(defaultUser);
    localStorage.clear();
  };

  return (
    <Router>
      <Navbar expand="lg">
        <Navbar.Brand href="/">
            <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top mr-2 ml-2"
            />{' '}
            PolkaPay
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {
          user.publisher ? (
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                  <Nav.Link href="/publish">Publish</Nav.Link>
                  <Dropdown title="Profile" id="basic-nav-dropdown" alignRight>
                      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                          Profile
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                          <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
              </Nav>
            </Navbar.Collapse>
          ) : (
              user.email ? (
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                      <Dropdown title="Profile" id="basic-nav-dropdown" alignRight>
                          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                              Profile
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                              <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                  </Nav>
                </Navbar.Collapse>
              ) : (
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ml-auto">
                      <Nav.Link href="/features">Features</Nav.Link>
                      <Nav.Link href="/pricing">Pricing</Nav.Link>
                      <Nav.Link href="https://github.com/rachelim21/PolkaPay">Documentation</Nav.Link>
                      <Dropdown title="Login" id="basic-nav-dropdown" alignRight>
                          <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                              Login
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                              <Dropdown.Item href="/signin">Reader</Dropdown.Item>
                              <Dropdown.Item href="/signin">Publisher</Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item href="/register">Sign Up</Dropdown.Item>
                          </Dropdown.Menu>
                      </Dropdown>
                  </Nav>
                </Navbar.Collapse>
              )
          )
        }
        
      </Navbar>
      <Switch>
        <Route path="/paywall">
          <Paywall />
        </Route>
        <Route path="/publish">
          <Publish />
        </Route>
        <Route path="/SignIn">
          <SignIn />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/">
          {
            user.publisher ? <Publisher /> : (user.email ? <Reader /> : <Home />)
          }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
