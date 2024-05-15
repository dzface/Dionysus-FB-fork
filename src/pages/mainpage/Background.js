import { useState, useContext } from "react";
import beer from "../../img/mainpageimg/background/beer.jpg";
import traditional from "../../img/mainpageimg/background/traditional.jpg";
import wine from "../../img/mainpageimg/background/wine.jpg";
import wiskey from "../../img/mainpageimg/background/wiskey.jpg";
import styled from "styled-components";
import { UserContext } from "../../global/UserStore";

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

const Background = ({ children }) => {
  // 만들었던 context 컴포넌트를 훅으로 사용하기 위해 변수에 저장
  const context = useContext(UserContext);
  const { bgimgurl, setBgimgurl } = context;

  const onClick = (url) => {
    setBgimgurl(url);
  };
  return (
    <BackgroundImg imageurl={bgimgurl}>
      {children}
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
