import React from 'react';

// import styles
import '../assets/Paywall.css';

// import components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import PriceCard from '../components/PriceCard';

const Paywall = () => {

  return (
    <Container className="paywall-container">
      <Container className="paywall-top">
        <div className="text-center">
          <h2>Want to read more?</h2>
          <p>
            Are you a student? Special rates <a href="">here</a>.
            <span className="already-subscribed">Already a subscriber? <a href="">Login</a>.</span>
          </p>
        </div>
      </Container>
      <Container className="paywall-content text-center">
          <h6>Support your big and local publishers. Buy this article through Polka Pay:</h6>
          <Row className="justify-content-md-center"><Col xs lg="6"><PriceCard heading="Best Value" title="Single Article"  actual="$0.99" button="Unlock Article through PolkaPay" color=""></PriceCard></Col></Row>
          
          <h6>Or purchase a monthly subscription: Save money. No hassle. Cancel anytime.</h6>
        <Row>
          <Col>
            <PriceCard heading=" " title="Blue" original="$15.99" actual="$9.99 per month" button="Get Blue" color=""></PriceCard>
            <ListGroup variant="flush" className="text-left">
              <ListGroup.Item>Benefit 1</ListGroup.Item>
              <ListGroup.Item>Benefit 2</ListGroup.Item>
              <ListGroup.Item>Benefit 3</ListGroup.Item>
              <ListGroup.Item>Benefit 4</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <PriceCard heading="" title="Gold" original="$26.99" actual="$19.99 per month" button="Get Gold" color=""></PriceCard>
            <ListGroup variant="flush" className="text-left">
              <ListGroup.Item>Benefit 1</ListGroup.Item>
              <ListGroup.Item>Benefit 2</ListGroup.Item>
              <ListGroup.Item>Benefit 3</ListGroup.Item>
              <ListGroup.Item>Benefit 4</ListGroup.Item>
              <ListGroup.Item>Benefit 5</ListGroup.Item>
              <ListGroup.Item>Benefit 6</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <PriceCard heading="Best Value " title="Premium" original="$36.99" actual="$25.99 per month" button="Get Gold" color=""></PriceCard>
            <ListGroup variant="flush" className="text-left">
              <ListGroup.Item>Benefit 1</ListGroup.Item>
              <ListGroup.Item>Benefit 2</ListGroup.Item>
              <ListGroup.Item>Benefit 3</ListGroup.Item>
              <ListGroup.Item>Benefit 4</ListGroup.Item>
              <ListGroup.Item>Benefit 5</ListGroup.Item>
              <ListGroup.Item>Benefit 6</ListGroup.Item>
              <ListGroup.Item>Benefit 7</ListGroup.Item>
              <ListGroup.Item>Benefit 8</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Paywall;