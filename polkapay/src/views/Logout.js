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

  // check if user logged in
  useEffect(() => {
    const { user, authToken } = localStorage;
    if (user) {
      console.log(user);
      UserDataService.logout({user: JSON.parse(user), authToken: JSON.parse(authToken)})
      .then(function success(res) {
        localStorage.clear();
        history.go('/');
      }, function error(err) {
        return err;
      });
    } else {
      console.log("You are already logged out!");
      history.push('/');
    }
  }, []);

  return (
    <Container>
      <Row className="mt-5">
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