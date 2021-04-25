import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../assets/Publisher.css';
import axios from "axios"
import UserDataService from "../services/user.service";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function Register() {
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
      console.log(loggedInUser);
      setUser(JSON.parse(loggedInUser));
      localStorage.clear();
    } else {
      console.log("You are already logged out!");
    }
    history.push('/');
  }, []);

  return (
    <Container>
      <Row>
        <Col md={3}></Col>
        <Col md={6}>
          <div className="Login">
            <h2>Logging out...</h2>
          </div>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}