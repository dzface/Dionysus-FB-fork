import { useState, useContext, useEffect } from "react";
import beer from "../../img/mainpageimg/background/beer.jpg";
import traditional from "../../img/mainpageimg/background/traditional.jpg";
import wine from "../../img/mainpageimg/background/wine.jpg";
import wiskey from "../../img/mainpageimg/background/wiskey.jpg";
import styled, { keyframes } from "styled-components";
import { UserContext } from "../../global/UserStore";

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

// BackgroundImg StyledComponent
const BackgroundImg = styled.div`
  width: 100vw;
  height: 100vh;
  border: none;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: fixed;
  opacity: 1;
  animation: ${({ isFading }) => (isFading ? flipOutY : "none")} 0.55s forwards;
`;

// ImgChangeBtnsDiv StyledComponent
const ImgChangeBtnsDiv = styled.div`
  width: 100vw;
  height: 5vh;
  border: none;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

// 배경바꾸는 버튼 styledComponent
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
  const context = useContext(UserContext);
  const { bgimgurl, setBgimgurl } = context;

  const [isFading, setIsFading] = useState(false);
  const [nextBgImgUrl, setNextBgImgUrl] = useState(bgimgurl);

  const onClick = (url) => {
    setNextBgImgUrl(url);

    setIsFading(true);
  };

  useEffect(() => {
    if (isFading) {
      const timer = setTimeout(() => {
        setBgimgurl(nextBgImgUrl);
        setIsFading(false);
      }, 750); // Match this duration with the CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [isFading, nextBgImgUrl, setBgimgurl]);
  useEffect(() => {
    // 초기 배경 이미지 설정
    setBgimgurl(wine);
  }, []); // []를 넘겨 useEffect가 한 번만 실행되도록 합니다.

  return (
    <BackgroundImg imageurl={bgimgurl} isFading={isFading}>
      {children}
      <ImgChangeBtnsDiv>
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
          <button onClick={() => onClick(wiskey, "rgba(0,0,0,0.5)")} />
        </ImgBtnDiv>
      </ImgChangeBtnsDiv>
    </BackgroundImg>
  );
};

export default Background;
