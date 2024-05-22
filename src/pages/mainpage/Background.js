import { useState, useContext, useEffect } from "react";
import beer from "../../img/mainpageimg/background/beer.jpg";
import traditional from "../../img/mainpageimg/background/traditional.jpg";
import wine from "../../img/mainpageimg/background/wine.jpg";
import whiskey from "../../img/mainpageimg/background/whiskey.jpg";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../../global/UserStore";
import all from "../../img/mainpageimg/background/all.webp";
// FlipOutY animation
const flipOutY = keyframes`
  from {
    transform: perspective(400px) rotate3d(0, 1, 0, 0);
    opacity: 1;
  }
  30% {
    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);
    opacity: 1;
  }
  to {
    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);
    opacity: 0;
  }
`;

const BackgroundImg = styled.div`
  overflow-x: hidden; // 수평 스크롤을 숨김
  width: 100vw;
  height: ${({ scroll }) => (scroll ? "4000px" : "100vh")};
  border: none;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  animation: ${({ isFading }) => (isFading ? flipOutY : "none")} 0.55s forwards;
  opacity: ${({ opacity }) => (opacity ? "0.5" : "1")};
`;

// ImgChangeBtnsDiv StyledComponent
const ImgChangeBtnsDiv = styled.div`
  width: 100vw;
  height: 10vh;
  border: none;
  position: absolute;
  bottom: 0;
  display: ${({ backbtn }) => (backbtn ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  z-index: 5;
`;

// 배경바꾸는 버튼 styledComponent
const ImgBtnDiv = styled.div`
  width: 43px;
  height: 43px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    width: 20px;
    height: 20px;
    border: none;
    background-color: #fff;
    border-radius: 50%;
    &:hover {
      background-color: rgba(255, 0, 0, 0.6);
    }
  }
`;
const Background = ({ children, backbtn, scroll, opacityisTrue }) => {
  const context = useContext(UserContext);
  const { bgimgurl, setBgimgurl } = context;

  const [isFading, setIsFading] = useState(false);

  const onClick = (url) => {
    setBgimgurl(url);
    setIsFading(true);
  };
  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => {
        setBgimgurl(bgimgurl);
        setIsFading(false);
      }, 750); // Match this duration with the CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [isFading, bgimgurl, setBgimgurl]);
  useEffect(() => {
    // 초기 배경 이미지 설정
    setBgimgurl(beer);
  }, []); // []를 넘겨 useEffect가 한 번만 실행되도록 합니다.
  return (
    <BackgroundImg
      imageurl={bgimgurl}
      isFading={isFading}
      scroll={scroll}
      opacity={opacityisTrue}
    >
      {children}
      <ImgChangeBtnsDiv backbtn={backbtn}>
        <ImgBtnDiv>
          <button onClick={() => onClick(all, "rgba(0,0,0,0.5)")} />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button onClick={() => onClick(beer, "rgba(0,0,0,0.5)")} />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button onClick={() => onClick(traditional, "rgba(0,0,0,0.5)")} />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button onClick={() => onClick(wine, "rgba(0,0,0,0.5)")} />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button onClick={() => onClick(whiskey, "rgba(0,0,0,0.5)")} />
        </ImgBtnDiv>
      </ImgChangeBtnsDiv>
    </BackgroundImg>
  );
};

export default Background;
