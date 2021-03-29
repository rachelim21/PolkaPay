import React from 'react';

// import styles
import '../assets/Home.css';

// import components
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const Home = () => {

  return (
    <Container fluid>
        <Jumbotron fluid className="text-center">
            <Container className="pl-5 pr-5">
                <h1>Wallet-Based Cryptocurrency Paywalls</h1>
                <p>
                We leverage layer-2 scaling platforms such as Celer SDK on top of Polkadot to allow for high transaction throughput in order to handle lots of volume.
                For microtransactions we use payment channels/rollups for higher scalability, lower fees, and higher gas efficiency.
                </p>
                <p>
                    <Button variant="primary" className="mr-4" href="/publisher">Get started now</Button>
                    <Button variant="outline-secondary" href="https://github.com/rachelim21/PolkaPay">View on Github</Button>
                </p>
            </Container>
        </Jumbotron>
    </Container>
  );
}

export default Home;