import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../assets/Publisher.css';
import axios from "axios"
import UserDataService from "../services/user.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(email);
  }, [email]);

  useEffect(() => {
      console.log(password)
  }, [password])

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
    
    axios.post("api/users", userID).then(data => {
        console.log(userID);
    })
   // axios.get('api/users');
    //UserDataService.create(userID);
    //console.log('helloo');

  }

  return (
    <div className="Login">
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
        <Button block size="lg" type="submit" disabled={!validateForm()}>
          Login
        </Button>
      </Form>
    </div>
  );
}