import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import Table from 'react-bootstrap/Table'

import './App.css';

//References: Used React-bootstrap library samples as starter code,
//https://codesandbox.io/s/github/react-bootstrap/code-sandbox-examples/tree/master/basic-react-router
//Tables: https://react-bootstrap.github.io/components/table/

const Recent = () => <span>Recent</span>;

const Favorite = () => <span>Favorite</span>;

const Free = () => <span>Free</span>;

const App = () => (
  <MemoryRouter>
    <Container className="p-4">
      
        <h1 className="header">PolkaPay</h1>
        <h2>
          My Articles
          <Switch>
            <Route path="/recent">
              <Recent />
            </Route>
            <Route path="/favorite">
              <Favorite />
            </Route>
            <Route path="/free">
              <Free />
            </Route>
          </Switch>
        </h2>
        <h2>
          
          <ButtonToolbar className="custom-btn-toolbar">
            <LinkContainer to="/">
              <Button>Recent</Button>
            </LinkContainer>
            <LinkContainer to="/about">
              <Button>Favorite</Button>
            </LinkContainer>
            <LinkContainer to="/users">
              <Button>Free</Button>
            </LinkContainer>
          </ButtonToolbar>
        </h2>


  <Table responsive bordered hover >
  <thead>
    <tr>
      <th>#</th>
      <th>Article</th>
      <th>Date</th>
      <th>Author</th>
      <th>Publisher</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Covid-19: About a Third of U.S. Adults Have Received at Least One Dose of a Vaccine</td>
      <td>3/27/21</td>
      <td>Sameer Yasir</td>
      <td>The New York Times </td>
    </tr>
    <tr>
      <td>2</td>
      <td>Tesla will accept Bitcoin as payment, Elon Musk says</td>
      {//https://www.nytimes.com/2021/03/24/business/elon-musk-tesla-bitcoin.html 
      }
      <td>3/24/21</td>
      <td>Ephrat Livni</td>
      <td>The New York Times</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Tesla will accept Bitcoin as payment, Elon Musk says</td>
      {//https://www.nytimes.com/2021/03/24/business/elon-musk-tesla-bitcoin.html 
      }
      <td>3/24/21</td>
      <td>Ephrat Livni</td>
      <td>The New York Times</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Tesla will accept Bitcoin as payment, Elon Musk says</td>
      {//https://www.nytimes.com/2021/03/24/business/elon-musk-tesla-bitcoin.html 
      }
      <td>3/24/21</td>
      <td>Ephrat Livni</td>
      <td>The New York Times</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Tesla will accept Bitcoin as payment, Elon Musk says</td>
      {//https://www.nytimes.com/2021/03/24/business/elon-musk-tesla-bitcoin.html 
      }
      <td>3/24/21</td>
      <td>Ephrat Livni</td>
      <td>The New York Times</td>
    </tr>
    <tr>
      <td>6</td>
      <td>Tesla will accept Bitcoin as payment, Elon Musk says</td>
      {//https://www.nytimes.com/2021/03/24/business/elon-musk-tesla-bitcoin.html 
      }
      <td>3/24/21</td>
      <td>Ephrat Livni</td>
      <td>The New York Times</td>
    </tr>
    <tr>
      <td>7</td>
      <td>Tesla will accept Bitcoin as payment, Elon Musk says</td>
      {//https://www.nytimes.com/2021/03/24/business/elon-musk-tesla-bitcoin.html 
      }
      <td>3/24/21</td>
      <td>Ephrat Livni</td>
      <td>The New York Times</td>
    </tr>
    <tr>
      <td>8</td>
      <td>Tesla will accept Bitcoin as payment, Elon Musk says</td>
      {//https://www.nytimes.com/2021/03/24/business/elon-musk-tesla-bitcoin.html 
      }
      <td>3/24/21</td>
      <td>Ephrat Livni</td>
      <td>The New York Times</td>
    </tr>
    <tr>
      <td>9</td>
      <td>Tesla will accept Bitcoin as payment, Elon Musk says</td>
      {//https://www.nytimes.com/2021/03/24/business/elon-musk-tesla-bitcoin.html 
      }
      <td>3/24/21</td>
      <td>Ephrat Livni</td>
      <td>The New York Times</td>
    </tr>
    <tr>
      <td>10</td>
      <td>Tesla will accept Bitcoin as payment, Elon Musk says</td>
      {//https://www.nytimes.com/2021/03/24/business/elon-musk-tesla-bitcoin.html 
      }
      <td>3/24/21</td>
      <td>Ephrat Livni</td>
      <td>The New York Times</td>
    </tr>
  </tbody>
</Table>



     
    </Container>
  </MemoryRouter>

  
);



 



export default App;
