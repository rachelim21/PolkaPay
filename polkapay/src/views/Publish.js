import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../assets/Publisher.css';
import axios from "axios"
import UserDataService from "../services/user.service";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

export default function Publish() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [link, setLink] = useState("");
  const [cost, setCost] = useState(1);
  const [publishedAt, setPublishedAt] = useState("");
  const history = useHistory();
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
    } else {
        history.push('/');
    }
  }, []);

  function validateForm() {
    return title.length > 0 && link.length > 0 && author.length > 0 && publishedAt.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    var article = {};
    article.title = title;
    article.author = author;
    article.link = link;
    article.cost = cost;
    article.publishedAt = publishedAt;
    console.log(article);
    UserDataService.publish({user, article})
    .then(function success(res) {
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
            <h2>Publish a New Article</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group size="lg" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  autoFocus
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Form.Text className="text-muted">
                  This is how readers will identify your article.
                </Form.Text>
              </Form.Group>
              <Form.Group size="lg" controlId="author">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <Form.Text className="text-muted">
                  This is the full name of the author of your article.
                </Form.Text>
              </Form.Group>
              <Form.Group size="lg" controlId="link">
                <Form.Label>Link</Form.Label>
                <Form.Control
                  type="text"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <Form.Text className="text-muted">
                  This is the external link to your article.
                </Form.Text>
              </Form.Group>
              <Form.Group size="lg" controlId="cost">
                <Form.Label>Cost</Form.Label>
                <Form.Control 
                    as="select"
                    selected={cost}
                    onChange={(e) => setCost(e.target.value)}>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
                <Form.Text className="text-muted">
                  This is how much your article costs for one purchase.
                </Form.Text>
              </Form.Group>
              <Form.Group size="lg" controlId="publishedAt">
                <Form.Label>Published Time</Form.Label>
                <Form.Control
                  type="date"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                />
                <Form.Text className="text-muted">
                  This is the date and time at which your article was published.
                </Form.Text>
              </Form.Group>
              <Button block size="lg" type="submit" disabled={!validateForm()} >
                Publish
              </Button>
            </Form>
          </div>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}