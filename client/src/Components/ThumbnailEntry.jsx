import React from 'react';
import styles from '../../dist/styles.css'


const ThumbnailEntry = (props) => (
  <div>
    <img className={styles.thumbnailImage} src={props.image} onClick={(e) => props.handleImageListClick(props.image)} alt="" />
  </div>
);

export default ThumbnailEntry;