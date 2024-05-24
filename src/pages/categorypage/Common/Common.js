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
  //context전역변수 불러오기
  const context = useContext(UserContext);
  // 받아온 알콜 리스트 저장.
  const [alcohols, setAlcohols] = useState([]);
  //도수,용량,가격에 따라 불러올 리스트 상태 저장 변수
  const [sortBy, setSortBy] = useState("");
  // 입력한 값을 저장해서 백엔드에 넘겨줄 변수
  const [searchTerm, setSearchTerm] = useState("");
  //useContext에서 category만 사용.
  const { category } = context;
  // 술 이름을 입력하면 해당하는 값을 찾아오는 비동기함수
  const alcoholList = async () => {
    try {
      // 입력받은 값을 소문자로 바꾸고 띄어쓰기 제거.
      const sanitizedSearchTerm = searchTerm.toLowerCase().replace(/\s/g, "");
      // 양쪽 공백까지 제거하고 이게 값이 있으면 벡엔드에 search부분으로 요청, 아닌경우 리스트 sort부분으로 요청.
      const response =
        sanitizedSearchTerm.trim() !== ""
          ? await AxiosApi.searchAlcohols(category, sanitizedSearchTerm)
          : await AxiosApi.alcoholSelect(category, sortBy);
      // 받아온 알콜 리스트를 저장.
      setAlcohols(response.data);
    } catch (error) {
      console.error("Failed to fetch alcohols:", error);
    }
  };
  useEffect(() => {
    //비동기 함수 실행.
    alcoholList();
    //카테고리, 리스트 sort, 검색값이 바뀔 때만 해당비동기 함수 렌더링.
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
        <ListItem alcohols={alcohols} alcoholList={alcoholList} isOne={false} />
      </List>
      {/* <HorizontalLine /> */}
    </Container>
  );
};

export default Common;
