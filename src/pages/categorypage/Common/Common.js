import styled from "styled-components";
import ListItem from "./ListItem";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../../global/UserStore";
import AxiosApi from "../../../api/AxiosApi";
import SortOptions from "./SortOptions";
// Container 스타일 컴포넌트를 생성합니다.
const Container = styled.div`
  width: 100%; // 너비를 100%로 설정합니다.
  display: flex; // 플렉스 박스로 설정합니다.
  flex-direction: column; // 세로 방향으로 아이템을 배치합니다.
  justify-content: center; // 수직 가운데 정렬합니다.
  align-items: center; // 수평 가운데 정렬합니다.
  margin: 0 auto; // 좌우 여백을 자동으로 설정합니다.
  padding: 20px; // 안쪽 여백을 설정합니다.
  position: relative; // 상대적인 위치를 설정합니다.
`;

// Input 스타일 컴포넌트를 생성합니다.
const Input = styled.input`
  width: 550px; // 너비를 600px로 설정합니다.
  height: 40px;
  padding: 8px; // 안쪽 여백을 설정합니다.
  text-align: center; // 텍스트를 가운데 정렬합니다.
  margin-bottom: 20px; // 하단 여백을 설정합니다.
  border: 1px solid #ccc; // 테두리 스타일을 설정합니다.
  border-radius: 4px; // 테두리의 둥근 정도를 설정합니다.
  font-size: 16px; // 글꼴 크기를 설정합니다.
  @media (max-width: 700px) {
    width: 300px;
    height: 30px;
  }
`;

// List 스타일 컴포넌트를 생성합니다.
const List = styled.div`
  width: 900px;
  height: 1800px;
`;

const SelectListDiv = styled.div`
  width: 100vw;
  height: 25px;
  display: flex;
  justify-content: end;
  margin-right: 38vw;
`;

const Hrtag = styled.hr`
  border: none;
  width: 80vw;
  height: 1.2px;
  background-color: #000;
  margin-bottom: 20px;
`;
const Common = () => {
  const context = useContext(UserContext);
  const [alcohols, setAlcohols] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { category } = context;
  useEffect(() => {
    const alcoholList = async () => {
      try {
        let rsp;
        if (searchTerm.trim() !== "") {
          rsp = await AxiosApi.searchAlcohols(category, searchTerm);
        } else {
          rsp = await AxiosApi.alcoholSelect(category, sortBy);
        }
        setAlcohols(rsp.data);
        console.log(rsp.data);
      } catch (error) {
        console.error("Failed to fetch alcohols:", error);
      }
    };
    alcoholList();
  }, [category, sortBy, searchTerm]);
  return (
    <Container>
      <Hrtag />
      <Input
        type="text"
        placeholder="무엇을 찾고 계신가요?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <SelectListDiv>
        <SortOptions sortBy={sortBy} setSortBy={setSortBy} />
      </SelectListDiv>
      <List>
        <ListItem alcohols={alcohols} />
      </List>
      {/* <HorizontalLine /> */}
    </Container>
  );
};

export default Common;
