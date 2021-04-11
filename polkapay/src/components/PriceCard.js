import React from 'react';

// import styles
import '../assets/Paywall.css';

// import components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function PriceCard(props) {
    return (
        <Card className="card price-card">
            <Card.Body>
                <h6>{props.heading}</h6>
                <Card.Title><h4>{props.title}</h4></Card.Title>
                <Card.Text>
                    <p><span className="original-price">{props.original}</span>
                    <span className="actual-price">{props.actual}</span></p>
                </Card.Text>
                <Button variant="light" href="https://www.nytimes.com/2021/04/03/health/coronavirus-variants-vaccines.html?action=click&module=Top%20Stories&pgtype=Homepage" block>{props.button}</Button>
             

            </Card.Body>
        </Card>
    );
}

export default PriceCard;