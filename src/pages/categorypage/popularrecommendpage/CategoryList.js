import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import AxiosApi from "../../../api/AxiosApi";
import ListItem from "../Common/ListItem";
import SortOptions from "../Common/SortOptions";
const ThemeItem = styled.div`
  width: 60vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  z-index: 1;
`;

// 키프레임 정의
const fadeInTopLeft = keyframes`
  from {
    opacity: 0;
    transform: translate3d(-100%, -100%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInTopLeft} 1s; /* 애니메이션 적용 */
  @media screen and (max-width: 1000px) {
    width: 600px;
  }
`;

const ItemTitle = styled.div`
  width: 100%;
  height: 148px;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconBox = styled.div`
  width: 50%;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IconImg = styled.img`
  width: 150px;
  height: 140px;
  border-radius: 50%;
`;

const RecommendIconDiv = styled.div`
  width: 100%;
  min-height: 480px; /* 최소 높이를 설정합니다. */

  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 0 0 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const SelectListDiv = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;

const Recommend2 = ({ selectedIcon, selectmenu, selectedMenu }) => {
  const [popularDrinks, setPopularDrinks] = useState([]);
  const [listItemCount, setListItemCount] = useState(0);
  const [sortBy, setSortBy] = useState(""); // 정렬 기준을 저장할 상태
  const fetchPopularDrinks = async () => {
    try {
      const response = await AxiosApi.selectpopular(selectedIcon || selectmenu);
      setPopularDrinks(response.data); // 받아온 데이터를 popularDrinks state에 설정합니다.
      setListItemCount(response.data.length); // ListItem 컴포넌트의 개수를 설정합니다.
    } catch (error) {
      console.error("인기 음료를 가져오는 중 오류 발생:", error);
    }
  };
  useEffect(() => {
    fetchPopularDrinks();
  }, [selectedIcon, selectmenu]);

  // 정렬 함수
  const sortItems = (items) => {
    if (sortBy === "price") {
      // 가격 순으로 정렬
      return items.sort((a, b) => a.price - b.price);
    } else if (sortBy === "abv") {
      // 도수 순으로 정렬
      return items.sort((a, b) => a.abv - b.abv);
    } else if (sortBy === "volume") {
      // 용량 순으로 정렬
      return items.sort((a, b) => a.volume - b.volume);
    } else if (sortBy === "rating") {
      // 별점 순으로 정렬
      return items.sort((a, b) => b.rating - a.rating);
    } else {
      return items; // 정렬 기준이 없으면 그대로 반환
    }
  };

  const sortedDrinks = sortItems(popularDrinks); // 정렬된 배열

  const getImagePath = () => {
    if (selectedIcon) {
      return `${process.env.PUBLIC_URL}/recommendationicon/${selectedIcon}.png`;
    } else if (selectmenu) {
      return `${process.env.PUBLIC_URL}/food/${selectedMenu}/${selectmenu}.jpg`;
    }
    return null;
  };
  const bgColor = (selectedIcon, selectmenu) => {
    if (["기쁨", "화남", "슬픔", "사랑"].includes(selectedIcon))
      return "rgba(112, 101, 19, 0.8)"; // 감정 아이콘
    if (["맑음", "흐림", "비", "눈"].includes(selectedIcon))
      return "rgba(182, 113, 20, 0.8)"; // 날씨 아이콘
    if (selectmenu) return "rgba(82, 1, 33, 0.8)"; // 메뉴 아이콘
    return null; // 기본 배경색
  };
  console.log(selectedIcon);
  console.log(selectmenu);

  return (
    <ThemeItem>
      <Wrapper>
        <ItemTitle bgColor={bgColor(selectedIcon, selectmenu)}>
          <IconBox>
            <IconImg src={getImagePath()} alt="추천 아이콘" />
          </IconBox>
        </ItemTitle>
        <RecommendIconDiv style={{ minHeight: `${listItemCount * 170}px` }}>
          {/* ListItem 컴포넌트의 개수에 따라서 높이를 설정합니다. */}
          <SelectListDiv>
            <div>
              <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
            </div>
            <ListItem
              alcohols={sortedDrinks}
              alcoholList={fetchPopularDrinks}
              itemcenter={true}
            />{" "}
            {/* 정렬된 아이템 전달 */}
          </SelectListDiv>
        </RecommendIconDiv>
      </Wrapper>
    </ThemeItem>
  );
};

export default Recommend2;
