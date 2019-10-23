import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from '../dist/styles.css'

import ImageItem from './Components/ImageItem.jsx';
import ThumbnailGallery from './Components/ThumbnailGallery.jsx';
import PopUpImage from './Components/PopUpImage.jsx';

class ImageCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: window.location.pathname.split('/')[1],
      // game_name: window.location.pathname.split('/')[2],
      images: [],
      currentImage: '',
      showPopUp: false,
      // selectedThumbnail: false
    };

    this.handleImageListClick = this.handleImageListClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.togglePopUp = this.togglePopUp.bind(this);
  }

  componentDidMount() {
    $.get(`http://localhost:3002/api/images/${this.state.gameId}`, (data) => {
      let imagesArr = [];
      let imagesObj = JSON.parse(data[0].images);

      for (let img in imagesObj) {
        imagesArr.push(imagesObj[img]);
      }

      console.log('imagesArr', imagesArr);

      this.setState({
        images: imagesArr,
        currentImage: JSON.parse(data[0].images).image1
      });
    });
  }

  // setNextImage() {
  //   let index = this.state.currentImage;
  //   if (index === this.state.images.length) {
  //     index === 0;
  //     this.setState({
  //       currentImage: data[0]
  //     })
  //   }
  // }

  togglePopUp() {
    if (!this.state.showPopUp) {
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState({
      showPopUp: !this.state.showPopUp
    });
  }

  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    this.togglePopUp();
  }

  handleImageListClick(thumbnail) {

    this.setState({
      currentImage: thumbnail,
      selectedThumbnail: !this.state.selectedThumbnail
    });
  }

  render() {
    return (
      <div>
        <div>
          <ImageItem image={this.state.currentImage} togglePopUp={this.togglePopUp} />
            {this.state.showPopUp && (
              <div ref={node => {this.node = node; }} >
                <PopUpImage image={this.state.currentImage} closePopUp={this.togglePopUp} />
              </div>
            )}
          <ThumbnailGallery handleImageListClick={this.handleImageListClick} images={this.state.images} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<ImageCarousel/>, document.getElementById('photogallery'));