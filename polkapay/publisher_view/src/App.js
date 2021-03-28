import React from 'react';
import { MemoryRouter, Switch, Route } from 'react-router-dom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { LinkContainer } from 'react-router-bootstrap';
import Table from 'react-bootstrap/Table'
import LineGraph from 'react-line-graph'
import Chart from "react-google-charts";

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
      
        <h1 className="header">The New York Times</h1>
        <h2>Revenue</h2>
        <Table responsive bordered hover >
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
        <h2>
          Top Performers (30-Day)
        </h2>
        
  
  
  <Table responsive bordered hover >
  <thead>
    <tr>
      <th>Article</th>
      <th>Date</th>
      <th>Reads</th>
      <th>Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Article 1</td>
      <td>3/27/21</td>
      <td>223K</td>
      <td>$30K</td>
    </tr>
    <tr>
      <td>Article 2</td>
      <td>3/24/21</td>
      <td>100K</td>
      <td>$10K</td>
    </tr>
    <tr>
      <td>Article 3</td>
      <td>3/24/21</td>
      <td>100K</td>
      <td>$10K</td>
    </tr>
    <tr>
      <td>Article 4</td>
      <td>3/24/21</td>
      <td>80K</td>
      <td>$8K</td>
    </tr>
    <tr>
      <td>Article 5</td>
      <td>3/24/21</td>
      <td>75K</td>
      <td>7K</td>
    </tr>
    <tr>
      <td>Article 6</td>
      <td>3/24/21</td>
      <td>60K</td>
      <td>$5K</td>
    </tr>
    <tr>
      <td>Article 7</td>
      <td>3/24/21</td>
      <td>60K</td>
      <td>$5K</td>
    </tr>
    <tr>
      <td>Article 8</td>
      <td>3/24/21</td>
      <td>60K</td>
      <td>$5K</td>
    </tr>
    <tr>
      <td>Article 9</td>
      <td>3/24/21</td>
      <td>25K</td>
      <td>$2K</td>
    </tr>
    <tr>
      <td>Article 10</td>
      <td>3/24/21</td>
      <td>25K</td>
      <td>$2K</td>
    </tr>
  </tbody>
</Table>

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
    title: 'Readership 7 Day',
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
    title: 'Revenue 7 Day',
    hAxis: {
      title: 'Day of Week',
    },
    vAxis: {
      title: 'Revenue',
    },
  }}
  rootProps={{ 'data-testid': '1' }}
/>
    </Container>
    
  </MemoryRouter>
 
  
);



 



export default App;
