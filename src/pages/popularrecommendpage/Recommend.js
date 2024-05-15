import styled from "styled-components";
import React, { useState } from "react";
import img1 from "../../img/popularrecommendpageimg/pexels-markusspiske-121191.jpg";
import bg from "../../img/popularrecommendpageimg/pexels-pixabay-2145.jpg";

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

  h1 {
    width: 280px; // 너비를 300px로 설정합니다.
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gray; // 배경색을 회색으로 설정합니다.
    font-size: 21px; // 글꼴 크기를 설정합니다.
    margin: auto; // 가운데 정렬합니다.
    margin-bottom: 20px; // 하단 여백을 설정합니다.
    border-radius: 20px; // 테두리의 둥근 정도를 설정합니다.
    background-color: rgba(0, 0, 0, 0.4);
    color: #ffffff;
  }
`;

// WineContainer 스타일 컴포넌트를 생성합니다.
const WineContainer = styled.div`
  width: auto;
  height: auto;
  display: flex; // 플렉스 박스로 설정합니다.
  justify-content: center; // 수평 가운데 정렬합니다.
  align-items: center; // 수직 가운데 정렬합니다.
  flex-wrap: wrap; // 아이템이 넘칠 경우 줄 바꿈을 합니다.
  gap: 20px; // 아이템 사이의 간격을 설정합니다.
  margin: 30px;
`;

// WineItem 스타일 컴포넌트를 생성합니다.
const WineItem = styled.div`
  width: ${({ isBig }) =>
    isBig ? "900px" : "400px"}; // isBig에 따라 너비를 설정합니다.
  height: ${({ isBig }) =>
    isBig ? "1500px" : "300px"}; // isBig에 따라 높이를 설정합니다.
  background-color: ${({ bgColor }) =>
    bgColor}; // isBig에 따라 배경색을 설정합니다.
  display: flex; // 플렉스 박스로 설정합니다.
  flex-direction: row; // 세로 방향으로 아이템을 배치합니다.
  justify-content: center; // 수직 가운데 정렬합니다.
  align-items: center; // 수평 가운데 정렬합니다.
  cursor: pointer; // 포인터 모양의 커서를 설정합니다.
  transition: all 0.5s ease; // 전환 효과를 설정합니다.
  top: ${({ isBig }) => (isBig ? "600px" : "0")};
  position: ${({ isBig }) =>
    isBig ? "absolute" : "relative"}; // isBig에 따라 위치를 설정합니다.
  z-index: ${({ isBig }) =>
    isBig ? "2" : "1"}; // isBig에 따라 z-index 값을 설정합니다.
`;

const ItemTitle = styled.p`
  font-weight: bold;
  margin: 0;
  font-size: 30px;
`;
// WineItemImage 스타일 컴포넌트를 생성합니다.
const WineItemImage = styled.img`
  width: ${({ isBig }) =>
    isBig
      ? "100%"
      : "100%"}; // 확대될 때는 너비를 100%로, 아니면 자동으로 설정합니다.
  height: ${({ isBig }) =>
    isBig
      ? "100%"
      : "100%"}; // 확대될 때는 높이를 자동으로, 아니면 100%로 설정합니다.
  object-fit: fill; // 이미지가 요소에 맞게 잘릴 수 있도록 설정합니다.
`;

// Input 스타일 컴포넌트를 생성합니다.
const Input = styled.input`
  width: 600px; // 너비를 600px로 설정합니다.
  padding: 8px; // 안쪽 여백을 설정합니다.
  text-align: center; // 텍스트를 가운데 정렬합니다.
  margin-bottom: 20px; // 하단 여백을 설정합니다.
  border: 1px solid #ccc; // 테두리 스타일을 설정합니다.
  border-radius: 4px; // 테두리의 둥근 정도를 설정합니다.
  font-size: 16px; // 글꼴 크기를 설정합니다.
`;

// List 스타일 컴포넌트를 생성합니다.
const List = styled.ul`
  width: 600px; // 너비를 600px로 설정합니다.
  border: 10px solid white; // 테두리 스타일을 설정합니다.
  list-style: none; // 리스트 스타일을 제거합니다.
  padding: 0; // 안쪽 여백을 제거합니다.
  margin: auto; // 가운데 정렬합니다.
`;

// ListItem 스타일 컴포넌트를 생성합니다.
const ListItem = styled.li`
  display: flex; // 플렉스 박스로 설정합니다.
  align-items: center; // 수직 가운데 정렬합니다.
  padding: 10px; // 안쪽 여백을 설정합니다.
  border-bottom: 1px solid #ccc; // 아이템 사이에 경계선을 설정합니다.
`;

// ItemImage 스타일 컴포넌트를 생성합니다.
const ItemImage = styled.img`
  width: 50px; // 너비를 50px로 설정합니다.
  height: 50px; // 높이를 50px로 설정합니다.
  margin-right: 10px; // 오른쪽 여백을 설정합니다.
  object-fit: cover; // 이미지가 요소에 맞게 잘릴 수 있도록 설정합니다.
`;

// ItemDescription 스타일 컴포넌트를 생성합니다.
const ItemDescription = styled.div`
  flex: 1; // 남은 공간을 모두 차지하도록 설정합니다.
`;
// 와인 아이템 내용을 감싸는 Wrapper 스타일 컴포넌트를 생성합니다.
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center; // 수직 가운데 정렬합니다.
  align-items: center; // 수평 가운데 정렬합니다.
`;

const Recommend = () => {
  const [isBig, setIsBig] = useState(null);

  const toggleSize = (index) => {
    setIsBig(isBig === index ? null : index);
  };

  return (
    <Container>
      <h1>다양한 주류 추천</h1>
      {/* 와인 목록 내용 */}
      <WineContainer>
        <WineItem
          onClick={() => toggleSize(0)}
          isBig={isBig === 0}
          bgColor="rgba(112, 101, 19, 1)"
        >
          {isBig === 0 ? (
            <>
              <Wrapper>
                <ItemTitle>확대된 내용</ItemTitle>
                <WineItemImage src={img1} alt="와인 1" isBig={isBig === 0} />
                <WineItemImage src={img1} alt="와인 1" isBig={isBig === 0} />
                <WineItemImage src={img1} alt="와인 1" isBig={isBig === 0} />
                <WineItemImage src={img1} alt="와인 1" isBig={isBig === 0} />
              </Wrapper>
            </>
          ) : (
            <>
              <Wrapper>
                <ItemTitle>기분에 따른 추천</ItemTitle>
                <WineItemImage src={bg} alt="와인 이미지" isBig={isBig !== 0} />
              </Wrapper>
            </>
          )}
        </WineItem>
        <WineItem
          onClick={() => toggleSize(1)}
          isBig={isBig === 1}
          bgColor="rgba(182, 113, 20, 1)"
        >
          {isBig === 1 ? (
            <Wrapper>
              <ItemTitle>확대된 내용</ItemTitle>
              <WineItemImage src={img1} alt="와인 1" isBig={isBig === 1} />
            </Wrapper>
          ) : (
            <Wrapper>
              <ItemTitle>날씨에 따른 추천</ItemTitle>
              <WineItemImage src={bg} alt="와인 이미지" isBig={isBig !== 1} />
            </Wrapper>
          )}
        </WineItem>
        <WineItem
          onClick={() => toggleSize(2)}
          isBig={isBig === 2}
          bgColor="rgba(82, 1, 33, 1)"
        >
          {isBig === 2 ? (
            <Wrapper>
              <ItemTitle>확대된 내용</ItemTitle>
              <WineItemImage src={img1} alt="와인 1" isBig={isBig === 2} />
            </Wrapper>
          ) : (
            <Wrapper>
              <ItemTitle>음식에 따른 추천</ItemTitle>
              <WineItemImage src={bg} alt="와인 이미지" isBig={isBig !== 2} />
            </Wrapper>
          )}
        </WineItem>
      </WineContainer>
      <Input type="text" placeholder="무엇을 찾고 계신가요?" />
      <List>
        <ListItem>
          <ItemImage src={img1} alt="와인 1" />
          <ItemDescription>
            <span>와인 1 - 50,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        <ListItem>
          <ItemImage src={img1} alt="와인 2" />
          <ItemDescription>
            <span>와인 2 - 30,000원</span>
          </ItemDescription>
        </ListItem>
        {/* 필요한 만큼 리스트 아이템을 추가할 수 있습니다. */}
      </List>
      {/* <HorizontalLine /> */}
    </Container>
  );
};

export default Recommend;
