import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../assets/Publisher.css';
import axios from "axios"
import UserDataService from "../services/user.service";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const defaultUser = {
    email: "",
    password: "",
    publisher: false,
  };
  const [user, setUser] = useState(defaultUser);
  
  const loggedInUser = localStorage.getItem("user");
    if (loggedInUser && loggedInUser.email) {
      console.log("You are already logged in!");
      console.log(loggedInUser);
      history.push('/');
      // const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
    }

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("YOU have submitted the form");
    user.email = email;
    user.password = password;
    console.log(user);
    // upon form submit, get email and login values
    // then submit those values to backend to check against user database
    
    // axios.post("/users", userID).then(data => {
    //     console.log(userID);
    // })
   // axios.get('api/users');
    // UserDataService.create(user);
    // set the state of the user
    //setUser(response.data)
    // store the user in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/');
  }

  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <div className="Login">
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Button block size="lg" type="submit" disabled={!validateForm()} >
                Login
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}