import React from 'react';
// import styles from '../../dist/styles.css'
import styled from 'styled-components';

let Image = styled.img`
  width: 100%;
  height: 387px;
  position: relative;
`;

const ImageItem = (props) => (
  <div>
    <Image src={props.image} onClick={(e) => props.togglePopUp()} alt="" />
  </div>
)


export default ImageItem;