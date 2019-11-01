import React from 'react';
import styled from 'styled-components'
// import styles from '../../dist/styles.css'
import ThumbnailEntry from './ThumbnailEntry.jsx';

const StyledThumbnailGallery = styled.div`
  margin-top: 4px;
  position: relative;
  height: 69px;
  width: 100%;
  margin-bottom: 4px;
  z-index: 0;
  display: flex;
  /* position: absolute; */
  flex-wrap: nowrap;
  overflow-y: hidden;
  overflow-x: auto;
`;

const ThumbnailGallery = (props) => (
  <StyledThumbnailGallery>
    {props.images.map((image) =>
      <ThumbnailEntry key={image} image={image} handleImageListClick={props.handleImageListClick} />
    )}
  </StyledThumbnailGallery>
);

export default ThumbnailGallery;