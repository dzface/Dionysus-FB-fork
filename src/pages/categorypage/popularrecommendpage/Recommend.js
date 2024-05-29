import React, { useState } from "react";
import styled from "styled-components";
import Common from "../Common/Common";
import Recommend2 from "./CategoryList";
import Menu from "./Menu";
import DisplayWeather from "./Weather";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
 
  gap: 30px;

  h1 {
    width: 280px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 21px;
    margin-bottom: 20px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.4);
    color: #ffffff;
  }
`;

const ThemeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 30px;
`;

const ThemeItem = styled.div`
  width: ${({ isBig }) => (isBig ? "800px" : "400px")};
  height: ${({ isBig }) => (isBig ? "600px" : "300px")};
  
  cursor: pointer;
  transition: width 0.5s ease, height 0.5s ease;
  position: ${({ isBig }) => (isBig ? "absolute" : "relative")};
  z-index: ${({ isBig }) => (isBig ? "1" : "0")};
  
  display: ${({ showMenu }) => (showMenu ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  margin: 10px;

    @media screen and (max-width: 768px) {
      width: 90vw;
    display: flex;
  }
`;

const ItemTitle = styled.div`
  width: 100%;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 20px 20px 0 0;
  font-weight: bold;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const ItemTitleText = styled.p`
  display: flex;
  text-align: center;
  justify-content: center;
  font-size: 26px;
`;

const ThemeItemImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 0 0 20px 20px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

const RecommendIconDiv = styled.div`
  width: 100%;
  height: 480px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  @media screen and (max-width: 768px) {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      gap: 20px;
  }

`;

const IconBox = styled.div`
  width: 327px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media screen and (max-width: 768px) {
      height: 100px;
  }
`;

const IconImg = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transition: transform 0.2s ease;
  z-index: 1;
  @media screen and (max-width: 768px) {
      width: 100px;
      height: 100px;
  }

  &:hover {
    transform: scale(0.9);
  }

`;

const CommonBox = styled.div`
  position: ${({ showRecommend2 }) =>
    showRecommend2 ? "absolute" : "relative"};
  display: flex;
  flex-direction: column;
`;

const ButtonItem = styled.button`
  margin-left: auto;
`;
const TitleDiv = styled.div`
  width: 100vw;
  height: 60px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.9);
  margin-top: 20px;
`;
const Recommend = () => {
  const [isBig, setIsBig] = useState(null);
  const [showRecommend2, setShowRecommend2] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const toggleSize = (index) => {
    setIsBig(isBig === index ? null : index);
    if (index !== 2) {
      setShowMenu(false);
    }
  };

  const handleIconClick = (iconName) => {
    setSelectedIcon(iconName);
    setShowRecommend2(true);
  };

  const handleCloseRecommend2 = () => {
    setShowRecommend2(false);
    setSelectedIcon(null);
  };

  const handleMenuIconClick = (iconName) => {
    setSelectedMenu(iconName);
    setShowMenu(true);
  };

  const getIconImagePath = (iconName) => {
    return `${process.env.PUBLIC_URL}/recommendationicon/${iconName}.png`;
  };

  const getBackgroundImagePath = (index) => {
    const images = [
      `${process.env.PUBLIC_URL}/recommendationicon/background/기분.jpg`, // 기분에 따른 추천 이미지
      `${process.env.PUBLIC_URL}/recommendationicon/background/날씨.jpg`, // 날씨에 따른 추천 이미지
      `${process.env.PUBLIC_URL}/recommendationicon/background/음식.jpg`, // 음식에 따른 추천 이미지
    ];
    return images[index];
  };

  return (
    <Container>
      <h1>다양한 주류 추천</h1>
      <ThemeContainer>
        {showMenu && (
          <CommonBox>
            <Menu selectedMenu={selectedMenu} setShowMenu={setShowMenu} />
          </CommonBox>
        )}
        {showRecommend2 ? (
          <CommonBox>
            <ButtonItem onClick={handleCloseRecommend2}>Close</ButtonItem>
            <Recommend2 selectedIcon={selectedIcon} />
          </CommonBox>
        ) : (
          <>
            {[0, 1, 2].map((index) => (
              <ThemeItem
                showMenu={showMenu}
                key={index}
                onClick={() => toggleSize(index)}
                isBig={isBig === index}
               
              >
                <Wrapper>
                  <ItemTitle bgColor={
                  [
                    "rgba(112, 101, 19, 0.8)",
                    "rgba(182, 113, 20, 0.8)",
                    "rgba(82, 1, 33, 0.8)",
                  ][index]
                }>
                    <ItemTitleText isBig={index} >
                      {
                        [
                          "기분에 따른 추천",
                          "날씨에 따른 추천",
                          "음식에 따른 추천",
                        ][index]
                      }
                    </ItemTitleText>
                  </ItemTitle>
                  {isBig === index ? (
                    <RecommendIconDiv>
                      {index === 0 ? (
                        ["기쁨", "슬픔", "화남", "사랑"].map((iconName) => (
                          <IconBox key={iconName}>
                            <IconImg
                              src={getIconImagePath(iconName)}
                              onClick={() => handleIconClick(iconName)}
                            />
                          </IconBox>
                        ))
                      ) : index === 1 ? ( // 이 부분에 DisplayWeather 추가
                        <>
                          <DisplayWeather />{" "}
                          {/* DisplayWeather 컴포넌트 추가 */}
                          {["맑음", "흐림", "비", "눈"].map((iconName) => (
                            <IconBox key={iconName}>
                              <IconImg
                                src={getIconImagePath(iconName)}
                                onClick={() => handleIconClick(iconName)}
                              />
                            </IconBox>
                          ))}
                        </>
                      ) : (
                        ["한식", "일식", "양식", "중식"].map((iconName) => (
                          <IconBox key={iconName}>
                            <IconImg
                              src={getIconImagePath(iconName)}
                              onClick={() => handleMenuIconClick(iconName)}
                            />
                          </IconBox>
                        ))
                      )}
                    </RecommendIconDiv>
                  ) : (
                    <RecommendIconDiv>
                      <ThemeItemImage
                        src={getBackgroundImagePath(index)}
                        alt="배경 이미지"
                      />
                    </RecommendIconDiv>
                  )}
                </Wrapper>
              </ThemeItem>
            ))}
          </>
        )}
      </ThemeContainer>
      <TitleDiv>
        <p>인기주류 Top 10!</p>
      </TitleDiv>
      <Common />
    </Container>
  );
};

export default Recommend;
