import { useState, useEffect } from "react";
import beer from "../../img/background/beer.jpg";
import traditional from "../../img/background/traditional.jpg";
import wine from "../../img/background/wine.jpg";
import wiskey from "../../img/background/wiskey.jpg";
import prevslider from "../../img/details/btn-slider-prev_moblie.png";
import nextslider from "../../img/details/btn_slider_next.png";
import styled from "styled-components";

//BackgrroundImg StyledComponent
const BackgroundImg = styled.div`
  width: 100vw;
  height: 100vh;
  border: none;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: fixed;
`;

//ImgChangeBtnsDiv StyledComponent;
const ImgChangeBtnsDiv = styled.div`
  width: 100vw;
  height: 5vh;
  border: none;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* display: none; */
  z-index: 5;
`;

//배경바꾸는 버튼 styledComponent
const ImgBtnDiv = styled.div`
  width: 3vw;
  height: 5vh;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    width: 1.3vw;
    height: 1.3vw;
    border: none;
    background-color: #fff;
    border-radius: 50%;
    &:hover {
      background-color: rgba(255, 0, 0, 0.6);
    }
  }
`;
const PageSlide = styled.div`
  width: 100vw;
  height: 80vh;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  display: none;
  & > div {
    width: 4vw;
    height: 13vh;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
      width: 3vw;
      height: 13vh;
    }
    &:hover {
      color: red;
      transition: 0.7s;
    }
  }
`;

const Background = ({ children }) => {
  const [background, setBackground] = useState(beer);
  const onClick = (url) => {
    setBackground(url);
  };
  return (
    <BackgroundImg imageurl={background}>
      {children}
      <PageSlide>
        <div role="button">
          <img src={prevslider} alt="prevslider" />
        </div>
        <div role="button">
          <img src={nextslider} alt="nextslider" />
        </div>
      </PageSlide>
      <ImgChangeBtnsDiv>
        <ImgBtnDiv>
          <button
            onClick={() => {
              onClick(beer);
            }}
          />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button
            onClick={() => {
              onClick(traditional);
            }}
          />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button
            onClick={() => {
              onClick(wine);
            }}
          />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button
            onClick={() => {
              onClick(wiskey);
            }}
          />
        </ImgBtnDiv>
      </ImgChangeBtnsDiv>
    </BackgroundImg>
  );
};

export default Background;
