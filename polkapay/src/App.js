import React from 'react';
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
import Reader from './views/Reader_Page/Reader';
import Publisher from './views/Publisher';
import Paywall from './views/Paywall';
import Reader_Recent from './views/Reader_Page/Reader_Recent';
import Reader_Favorite from './views/Reader_Page/Reader_Favorite';
import Reader_Free from './views/Reader_Page/Reader_Free';
import SignIn from './views/SignIn';


// import images
import logo from './logo.png';

// import components
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';

function App() {
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
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                  <Nav.Link href="/features">Features</Nav.Link>
                  <Nav.Link href="/Paywall">Pricing</Nav.Link>
                  <Nav.Link href="https://github.com/rachelim21/PolkaPay">Documentation</Nav.Link>
                  <Dropdown title="Login" id="basic-nav-dropdown" alignRight>
                      <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                          Login
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                          <Dropdown.Item href="/reader">Reader</Dropdown.Item>
                          <Dropdown.Item href="/publisher">Publisher</Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item href="/SignIn">Sign In</Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
      <Switch>
          <Route path="/reader">
            <Reader />
          </Route>
          <Route path="/publisher">
            <Publisher />
          </Route>
          <Route path="/paywall">
            <Paywall />
          </Route>
          <Route path="/reader_recent">
            <Reader_Recent />
          </Route>
          <Route path="/reader_favorite">
            <Reader_Favorite />
          </Route>
          <Route path="/reader_free">
            <Reader_Free />
          </Route>
          <Route path="/SignIn">
            <SignIn />
          </Route>
          <Route path="/">
            <Home />
          </Route>
            
          
        </Switch>
    </Router>
  );
}

export default App;
