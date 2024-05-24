import React from "react";
import styled, { keyframes } from "styled-components";
import Recommend2 from "./Recommend2";
import { useState } from "react";

// flipInY 애니메이션을 styled-components로 변환
// bounce 애니메이션을 styled-components로 변환
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-30px);
  }

  60% {
    transform: translateY(-15px);
  }
`;

const ThemeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 20px;
  position: relative;
`;

const ThemeItem = styled.div`
  width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;
const bounceIn = keyframes`
  from, 20%, 40%, 60%, 80%, to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  0% {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  20% {
    transform: scale3d(1.1, 1.1, 1.1);
  }

  40% {
    transform: scale3d(0.9, 0.9, 0.9);
  }

  60% {
    opacity: 1;
    transform: scale3d(1.03, 1.03, 1.03);
  }

  80% {
    transform: scale3d(0.97, 0.97, 0.97);
  }

  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${bounceIn} 1s; /* bounceIn 애니메이션 적용 */
`;
const ItemTitle = styled.div`
  width: 100%;
  height: 148px;
  background-color: rgba(82, 1, 33, 1);
  border-radius: 10% 10% 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RecommendIconDiv = styled.div`
  width: 100%;
  height: 1000px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0 0 5% 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const IconBox = styled.div`
  width: 50%;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    margin: 20px;
  }
`;

const MainIconImg = styled.img`
  width: 150px;
  height: 140px;
  border-radius: 50%;
  animation: ${bounce} 0.7s infinite; /* bounce 애니메이션 적용 */
`;

const IconImg = styled.img`
  width: 300px;
  height: 150px;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(0.9);
  }
`;
const ButtonItem = styled.button`
  margin-left: auto;

  @media (max-width: 768px) {
    position: absolute;
  }
`;

const Menu = ({ selectedMenu, setShowMenu }) => {
  const [showRecommend2, setShowRecommend2] = useState(false);
  const [selectmenu, setSelectMenu] = useState(null);

  const onMenuIconClick = (menuIcon) => {
    setSelectMenu(menuIcon);
    setShowRecommend2(true);
  };

  const handleCloseRecommend2 = () => {
    setShowRecommend2(false);
    setSelectMenu(null);
  };

  const getIconImagePath = (menuIcon) => {
    return `${process.env.PUBLIC_URL}/food/${selectedMenu}/${menuIcon}.jpg`;
  };

  const MenuList = {
    한식: [
      "과일안주",
      "국밥",
      "마른안주",
      "보쌈",
      "삼겹살",
      "아구찜",
      "족발",
      "해물파전",
    ],
    일식: [
      "라멘",
      "밀푀유나베",
      "야끼니꾸",
      "야끼소바",
      "장어덮밥",
      "초밥",
      "텐동",
      "회",
    ],
    양식: [
      "감바스",
      "스테이크",
      "치즈플래터",
      "치킨",
      "카나페",
      "크림파스타",
      "피자",
      "해물크림스튜",
    ],
    중식: [
      "꿔바로우",
      "딤섬",
      "마라탕",
      "양꼬치",
      "짜장면",
      "짬뽕",
      "탕수육",
      "훠궈",
    ],
  };

  return (
    <ThemeContainer>
      {showRecommend2 ? (
        <>
          <ButtonItem onClick={handleCloseRecommend2}>Close</ButtonItem>
          <Recommend2 selectmenu={selectmenu} selectedMenu={selectedMenu} />
        </>
      ) : (
        <ThemeItem>
          <ButtonItem onClick={() => setShowMenu(false)}>Close</ButtonItem>

          <Wrapper>
            <ItemTitle>
              <IconBox>
                <MainIconImg
                  src={`${process.env.PUBLIC_URL}/recommendationicon/${selectedMenu}.png`}
                />
              </IconBox>
            </ItemTitle>
            <RecommendIconDiv>
              {MenuList[selectedMenu].map((menuIcon) => (
                <IconBox key={menuIcon}>
                  <IconImg
                    src={getIconImagePath(menuIcon)}
                    onClick={() => onMenuIconClick(menuIcon)}
                  />
                </IconBox>
              ))}
            </RecommendIconDiv>
          </Wrapper>
        </ThemeItem>
      )}
    </ThemeContainer>
  );
};

export default Menu;
