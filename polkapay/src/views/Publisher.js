import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import UserDataService from "../services/user.service";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import Table from 'react-bootstrap/Table'
import LineGraph from 'react-line-graph'
import Chart from "react-google-charts";

import '../assets/Publisher.css';

//References: Used React-bootstrap library samples as starter code,
//https://codesandbox.io/s/github/react-bootstrap/code-sandbox-examples/tree/master/basic-react-router
//Tables: https://react-bootstrap.github.io/components/table/

const Recent = () => <span>Recent</span>;

const Favorite = () => <span>Favorite</span>;

const Free = () => <span>Free</span>;

export default function Publisher() {
  const defaultPublishedArticles = [{},]
  const [publishedArticles, setPublishedArticles] = useState(defaultPublishedArticles);
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
      UserDataService.getPublishedArticles(JSON.parse(loggedInUser).id)
      .then(function success(res) {
        setPublishedArticles(res.data);
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

  return (
    <MemoryRouter>
      <Container className="mt-5 mb-5">
        <h1 className="header"><em>{ user.publisher }</em></h1>
        <hr></hr>
        <h4 className="mt-4 mb-3">Revenue</h4>
        <Table responsive bordered >
          <thead>
            <tr>
              <th>Today</th>
              <th>7-Day Avg</th>
              <th>This Month</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>$50,510</td>
              <td>$32,583</td>
              <td>$302,583</td>
            </tr>
          </tbody>
        </Table>
        <Row>
          <Col>
          <h4 className="mt-3 mb-3">Top Performers (30-Day)</h4>
            <Table responsive bordered hover >
              <thead>
                <tr>
                  <th>Article</th>
                  <th>Author</th>
                  <th>Published</th>
                  <th>Cost</th>
                  <th>Total Revenue</th>
                </tr>
              </thead>
              <tbody>
                {
                  publishedArticles.map(function(article, index) {
                    return (
                      <tr>
                        <td><a href={article.link}>{ article.title }</a></td>
                        <td>{ article.author }</td>
                        <td>{ formatDate(article.publishedAt) }</td>
                        <td>${ (article.cost/10).toFixed(2) }</td>
                        <td>${ Math.floor(Math.random() * 100 * article.cost).toFixed(2) }</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </Col>
          <Col>
            <Chart
              width={'600px'}
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Day', 'Readership'],
                ['S', 0],
                ['M', 10],
                ['T', 23],
                ['W', 17],
                ['T', 18],
                ['F', 9],
                ['S', 11],
                ['S', 27],
              ]}
              options={{
                title: 'Readership (7-Day)',
                hAxis: {
                  title: 'Day of Week',
                },
                vAxis: {
                  title: 'Readership',
                },
              }}
              rootProps={{ 'data-testid': '1' }}
            />

            <Chart
              width={'600px'}
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Day', 'Revenue'],
                ['S', 0],
                ['M', 100],
                ['T', 230],
                ['W', 47],
                ['T', 148],
                ['F', 91],
                ['S', 143],
                ['S', 270],
              ]}
              options={{
                title: 'Revenue (7-Day)',
                hAxis: {
                  title: 'Day of Week',
                },
                vAxis: {
                  title: 'Revenue',
                },
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </Col>
        </Row>
        
      </Container>
    </MemoryRouter>
  )
};
