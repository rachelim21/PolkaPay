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
  const history = useHistory();
  //const [userID, setUser] = useState()

  useEffect(() => {
    console.log(email);
  }, [email]);

  useEffect(() => {
      console.log(password)
  }, [password])

//   useEffect(() => {
//     const loggedInUser = localStorage.getItem("user");
//     if (loggedInUser) {
//       const foundUser = JSON.parse(loggedInUser);
//       setUser(foundUser);
//     }
//   }, []);

  // logout the user
//   const handleLogout = () => {
//     setUser({});
//     setEmail("");
//     setPassword("");
//     localStorage.clear();
//   };


  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("YOU have submitted the form");
    console.log(email);
    console.log(password)
    // upon form submit, get email and login values
    // then submit those values to backend to check against user database
    const userID = {email: email, password: password};
    
    // axios.post("/users", userID).then(data => {
    //     console.log(userID);
    // })
   // axios.get('api/users');
    UserDataService.create(userID);
    // set the state of the user
    //setUser(response.data)
    // store the user in localStorage
    localStorage.setItem('user', email)
    localStorage.setItem('password',password)
    localStorage.setItem('amount', 10)
    history.push('/reader')

    console.log(userID)
  }

  return (
    <Container>
      <Row>
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
              </Form.Group>
              <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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