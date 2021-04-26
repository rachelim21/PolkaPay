import React from 'react';
import { useHistory } from 'react-router-dom';

// import styles
import '../assets/Paywall.css';

// import components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UserDataService from '../services/user.service'

function PriceCard(props) {
    const history = useHistory();

    return (
        <Card className="card price-card">
            <Card.Body>
                <h6>{props.heading}</h6>
                <Card.Title><h4>{props.title}</h4></Card.Title>
                <Card.Text>
                    <p><span className="original-price">{props.original}</span>
                    <span className="actual-price">{props.actual}</span></p>
                </Card.Text>
                <Button variant="light" onClick={props.purchase} block>{props.button}</Button>
            </Card.Body>
        </Card>
    );
}

export default PriceCard;