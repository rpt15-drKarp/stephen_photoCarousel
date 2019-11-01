import React from 'react';
import styled from 'styled-components'
// import styles from '../../dist/styles.css'

let Image = styled.img`
  width: 116px;
  height: 65px;
  display: inline-block;
  z-index: 0;
`;


const ThumbnailEntry = (props) => (
  <div>
    <Image src={props.image} onClick={(e) => props.handleImageListClick(props.image)} alt="" />
  </div>
);

export default ThumbnailEntry;