import React from 'react';
import styled from 'styled-components';
// import styles from '../../dist/styles.css'

const StyledPopUpImage = styled.div`
  opacity: 0.9;
  position: absolute;
  width: 100%;
  height: 387px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #000000;
  z-index: 1;
`;

let StyledPopUpImageInner = styled.div`
  position: absolute;
  z-index: 1000;
  width: 100%;
  left: 12px;
  top: 96px;
`;

let Image = styled.img`
  width: 689px;
  height: 387px;
`;

const PopUpImage = (props) => (
  <StyledPopUpImage>
    <StyledPopUpImageInner>
      <button onClick={props.closePopUp}>close</button>
      <Image src={props.image} onClick={props.closePopUp} />
    </StyledPopUpImageInner>
  </StyledPopUpImage>
);

export default PopUpImage;