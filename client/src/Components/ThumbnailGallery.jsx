import React from 'react';
import styles from '../../dist/styles.css'
import ThumbnailEntry from './ThumbnailEntry.jsx';

const ThumbnailGallery = (props) => (
  <div className={styles.thumbnailContainer}>
    {props.images.map((image) =>
      <ThumbnailEntry key={image} image={image} handleImageListClick={props.handleImageListClick} />
    )}
  </div>
);

export default ThumbnailGallery;