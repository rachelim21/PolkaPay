import React from 'react';

import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { autoplayPlugin }  from '@brainhubeu/react-carousel';
import { slidesToShowPlugin } from '@brainhubeu/react-carousel';
import '../assets/Reader.css';
import { useState } from 'react';

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
function Slideshow() {
  //class MyCarousel extends React.Component {
  const [value, setValue] = useState(0);
  function onChange(value) {
    setValue(value);
  }

return (
    //const MyCarousel = () => (
      <div class="item active" position ="absolute"  plugins={autoplayPlugin} animationSpeed={500} style={{"height" : "70%", "width" : "100%"}} >

      <Carousel value={value}
        onChange={onChange} draggable={false} animationSpeed={500} arrows >
        
        <a href = {"/paywall"}><img  src={image1} /> </a>
        <img src={image2} />
        <img src={image3} />
        <img src={image4} />
        <img src={image5} />
      </Carousel>
      <Dots value={value} onChange={onChange} number={5} />
  
      </div>
  
    );
}
    
export default Slideshow;