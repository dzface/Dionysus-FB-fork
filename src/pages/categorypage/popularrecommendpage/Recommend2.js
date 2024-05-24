import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AxiosApi from "../../../api/AxiosApi";
import ListItem from "../Common/ListItem";
import SortOptions from "../Common/SortOptions";
const ThemeItem = styled.div`
  width: 1000px;
  height: 100%;
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
  background-color: rgba(112, 101, 19, 1);
  border-radius: 10% 10% 0 0;
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
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 0 0 3% 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const SelectListDiv = styled.div`
  width: 100vw;
  height: 25px;
  display: flex;
  justify-content: end;
  margin: 20px;
`;

const Recommend2 = ({ selectedIcon, selectmenu, selectedMenu }) => {
  const [popularDrinks, setPopularDrinks] = useState([]);
  const [listItemCount, setListItemCount] = useState(0);
  const [sortBy, setSortBy] = useState(""); // 정렬 기준을 저장할 상태

  useEffect(() => {
    const fetchPopularDrinks = async () => {
      try {
        const response = await AxiosApi.selectpopular(
          selectedIcon || selectmenu
        );
        setPopularDrinks(response.data); // 받아온 데이터를 popularDrinks state에 설정합니다.
        setListItemCount(response.data.length); // ListItem 컴포넌트의 개수를 설정합니다.
      } catch (error) {
        console.error("인기 음료를 가져오는 중 오류 발생:", error);
      }
    };

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

  return (
    <ThemeItem>
      <Wrapper>
        <ItemTitle>
          <IconBox>
            <IconImg src={getImagePath()} alt="추천 아이콘" />
          </IconBox>
        </ItemTitle>
        <RecommendIconDiv style={{ minHeight: `${listItemCount * 170}px` }}>
          {/* ListItem 컴포넌트의 개수에 따라서 높이를 설정합니다. */}
          <SelectListDiv>
            <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
          </SelectListDiv>
          <ListItem alcohols={sortedDrinks} /> {/* 정렬된 아이템 전달 */}
        </RecommendIconDiv>
      </Wrapper>
    </ThemeItem>
  );
};

export default Recommend2;
