import React from "react";
import styled from "styled-components";
import Recommend2 from "./Recommend2";
import { useState, useEffect } from "react";
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
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

const IconBox = styled.div`
  width: 50%;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainIconImg = styled.img`
  width: 150px;
  height: 140px;
  border-radius: 50%;
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

  // useEffect(() => {
  //   // 선택된 메뉴에 따라 아이콘 매핑을 업데이트합니다.
  //   if (selectedMenu) {
  //     setMenuIcons({
  //       ...menuIcons,
  //       [selectedMenu]: menuIcons[selectedMenu] || []
  //     });
  //   }
  // }, [setMenuIcons]);

  return (
    <ThemeContainer>
      {console.log("메뉴:", selectedMenu)} {/* 콘솔 로그 추가 */}
      {console.log("selectmenu:", selectmenu)} {/* 콘솔 로그 추가 */}
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
