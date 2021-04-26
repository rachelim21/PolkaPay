import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import UserDataService from "../services/user.service";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { LinkContainer } from 'react-router-bootstrap';
import Table from 'react-bootstrap/Table'
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { autoplayPlugin }  from '@brainhubeu/react-carousel';
import { slidesToShowPlugin } from '@brainhubeu/react-carousel';

import Slideshow from '../components/Slideshow';

import '../assets/Reader.css';

//References: Used React-bootstrap library samples as starter code,
//https://codesandbox.io/s/github/react-bootstrap/code-sandbox-examples/tree/master/basic-react-router
//Tables: https://react-bootstrap.github.io/components/table/
//Carousel: https://brainhubeu.github.io/react-carousel/

export default function Reader() {
  const defaultPurchasedArticles = [{},]
  const [purchasedArticles, setPurchasedArticles] = useState(defaultPurchasedArticles);
  const [showTab, setShowTab] = useState("recent");
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

      // get articles
      UserDataService.getPurchasedArticles(JSON.parse(loggedInUser).id)
      .then(function success(res) {
        setPurchasedArticles(res.data);
      }, function error(err) {
        return err;
      });
    } else {
      localStorage.clear();
      history.go('/');
    }
  }, []);

  var formatDate = function(d) {
    let date = new Date(d);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    return month + "/" + day + "/" + year;
  }

  function goToPaywall(articleId) {
    history.push('/paywall/'+articleId);
  }

  return (
    <MemoryRouter>
      <Container className="mt-5 mb-5">
        <h1 className="header">Welcome Back</h1>
        <hr></hr>
        <h4 className="mt-3 mb-3">Trending Articles</h4>
        <Slideshow goToPaywall={goToPaywall}></Slideshow>
        <h4 className="mt-3 mb-3">My Articles</h4>
        <h2>
          <ButtonGroup aria-label="Basic example">
            <Button variant="light" onClick={() => setShowTab("recent")}>Recent</Button>
            <Button variant="light" onClick={() => setShowTab("favorite")}>Favorite</Button>
            <Button variant="light" onClick={() => setShowTab("free")}>Free</Button>
          </ButtonGroup>
        </h2>
        {
          showTab == "recent" ? (
            <Table responsive bordered hover >
              <thead>
                <tr>
                  <th></th>
                  <th>Article</th>
                  <th>Published Date</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {
                  purchasedArticles.map(function(article, index) {
                    return (
                      <tr>
                        <td>{ index + 1 }</td>
                        <td><a href={article.link}>{ article.title }</a></td>
                        <td>{ formatDate(article.publishedAt) }</td>
                        <td>{ article.author }</td>
                        <td>{ article.author }</td>
                        <td>${ (article.cost/10).toFixed(2) }</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          ) : (
            showTab == "favorite" ? (
              <Table responsive bordered hover >
                <thead>
                  <tr>
                    <th></th>
                    <th>Article</th>
                    <th>Published Date</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Cost</th>
                  </tr>
                </thead>
                <tbody>
                {
                  purchasedArticles.map(function(article, index) {
                    return (
                      <tr>
                        <td>{ index + 1 }</td>
                        <td><a href={article.link}>{ article.title }</a></td>
                        <td>{ formatDate(article.publishedAt) }</td>
                        <td>{ article.author }</td>
                        <td>{ article.author }</td>
                        <td>${ (article.cost/10).toFixed(2) }</td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </Table>
            ) : (
              <Table responsive bordered hover >
                <thead>
                  <tr>
                    <th>Article</th>
                    <th>Publish Date</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Views</th>
                  </tr>
                </thead>
                <tbody>
                {
                  purchasedArticles.map(function(article, index) {
                    return (
                      <tr>
                        <td>{ index + 1 }</td>
                        <td><a href={article.link}>{ article.title }</a></td>
                        <td>{ formatDate(article.publishedAt) }</td>
                        <td>{ article.author }</td>
                        <td>{ article.author }</td>
                        <td>${ (article.cost/10).toFixed(2) }</td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </Table>
            )
          )
        }
      </Container>
    </MemoryRouter>
  )
}
