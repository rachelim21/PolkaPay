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
    email: null,
    password: null,
    publisher: false,
  };
  const [user, setUser] = useState(defaultUser);
  
  // check if user logged in
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      console.log("You are already logged in!");
      console.log(loggedInUser);
      setUser(JSON.parse(loggedInUser));
      history.push('/');
    }
  }, []);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("YOU have submitted the form");
    // upon form submit, get email and login values
    user.email = email;
    user.password = password;
    console.log(user);
    // then submit those values to backend to check against user database
    UserDataService.login(user);
    // store the user in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    history.push('/');
  }

  return (
    <Container>
      <Row className="mt-5">
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