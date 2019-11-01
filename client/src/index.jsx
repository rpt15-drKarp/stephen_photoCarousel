import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import ImageCarousel from './Components/ImageCarousel.jsx';

ReactDOM.hydrate(
  <BrowserRouter>
    <ImageCarousel />
  </BrowserRouter>,
  document.getElementById('photogallery'));