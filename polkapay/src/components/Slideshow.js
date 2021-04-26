import React, { useState, useEffect } from "react";

import Button from 'react-bootstrap/Button';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { autoplayPlugin }  from '@brainhubeu/react-carousel';
import { slidesToShowPlugin } from '@brainhubeu/react-carousel';

import '../assets/Reader.css';

import image1 from './imageOne.png';
import image2 from './imageTwo.png';
import image3 from './imageThree.png';
import image4 from './imageFour.png';
import image5 from './imageFive.png';

// import images

//References: Used React-bootstrap library samples as starter code,
//https://codesandbox.io/s/github/react-bootstrap/code-sandbox-examples/tree/master/basic-react-router
//Tables: https://react-bootstrap.github.io/components/table/

const Recent = () => <span>Recent</span>;

const Favorite = () => <span>Favorite</span>;

const Free = () => <span>Free</span>;

export default function Slideshow(props) {
  const [value, setValue] = useState(0);

  function onChange(value) {
    setValue(value);
  }

  return (
    <div 
    className="item active" 
    position="absolute"  
    plugins={autoplayPlugin}
    style={{"height" : "70%", "width" : "100%"}} >
      <Carousel
      value={value}
      onChange={onChange}
      draggable={false}
      animationSpeed={500}
      arrows >
        <Button variant="light" onClick={() => props.goToPaywall(1)}><img src={image1} /></Button>
        <Button variant="light" onClick={props.goToPaywall}><img src={image2} /></Button>
        <Button variant="light" onClick={props.goToPaywall}><img src={image3} /></Button>
        <Button variant="light" onClick={props.goToPaywall}><img src={image4} /></Button>
        <Button variant="light" onClick={props.goToPaywall}><img src={image5} /></Button>
      </Carousel>
      <Dots value={value} onChange={onChange} number={5} />

    </div>
  
  );
}