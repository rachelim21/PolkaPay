import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../assets/Publisher.css';
import axios from "axios"
import UserDataService from "../services/user.service";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPublisher, setIsPublisher] = useState(false);
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
      history.go('/');
    }
  }, []);

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    // upon form submit, get email and login values
    user.email = email;
    user.password = password;
    user.publisher = isPublisher;
    console.log(user);
    // then submit those values to backend to check against user database
    UserDataService.register(user)
    .then(function success(res) {
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('authToken', JSON.stringify(res.data.authToken));
      history.push('/');
    }, function error(err) {
      return err;
    });
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md={3}></Col>
        <Col md={6}>
          <div className="Login">
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Please enter a secure password with at least 6 characters.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check 
                  type="checkbox" 
                  label="I am a news publisher and would like to create a publisher account."
                  value={isPublisher}
                  onChange={(e) => setIsPublisher(!isPublisher)} />
              </Form.Group>
              <Button block size="lg" type="submit" disabled={!validateForm()} >
                Register
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}