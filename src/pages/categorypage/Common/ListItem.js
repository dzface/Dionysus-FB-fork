import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import AxiosApi from "../../../api/AxiosApi";

const ItemBox = styled.div`
  width: 1000px;
  height: 170px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 140px;
  height: 170px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  border-radius: 15px;
  background-color: #fff;
`;

const ItemContext = styled.div`
  width: 400px;
  height: 140px;
  & > .com {
    width: auto;
    height: 25px;
    font-size: 14px;
  }
  & > .name {
    width: auto;
    height: 50px;
    font-size: 19px;
  }
  & > div {
    display: flex;
    padding-left: 20px;
    align-items: center;
    color: white;
  }
  .country_of_origin {
    margin-right: 5px;
  }
  .abv {
    margin-right: 5px;
  }
  .volume {
    margin-right: 5px;
  }
  & > .score {
    height: 30px;
    display: flex;
    & > .wall {
      color: #fff;
      margin-left: 5px;
      margin-right: 5px;
    }
  }
`;

const ItemReview = styled.div`
  width: 400px;
  height: 140px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;
  color: #fff;

  & > .review {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .reviewdiv {
    display: flex;
    align-items: center;
  }
  .more {
    font-size: 15px;
    margin-right: 7px;
    cursor: pointer;
    &:hover {
      color: green;
    }
  }
`;
const ReviewValue = styled.textarea`
  margin: 0;
  width: 370px;
  height: 60px;
  border-radius: 0;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 15px;
  display: ${({ isOne }) => (isOne ? "none" : "block")};
`;
const ReviewView = styled.div`
  margin: 0;
  width: 370px;
  height: 60px;
  border-radius: 0;
  border: none;
  background-color: transparent;
  display: ${({ isOne }) => (isOne ? "block" : "none")};
`;
const ReviewBtn = styled.div`
  width: 70px;
  height: 25px;
  border-radius: 7px;
  border: none;
  background-color: rgba(0, 0, 0, 0.8);
  color: #fff;
  font-size: 14px;
  margin-left: 250px;
  display: ${({ isOne }) => (isOne ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: lightgray;
  }
`;
const ScoreSelect = styled.select`
  width: 55px;
  height: 25px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 13px;
  margin-left: 5px;
  margin-top: 2px;
  cursor: pointer;
  & > option {
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
    font-size: 13px;
  }
`;
const ScoreButton = styled.button`
  width: 55px;
  height: 25px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 13px;
  margin-left: 5px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    color: yellow;
  }
`;

const ListItem = ({ alcohols, alcoholList, isOne }) => {
  //해당 컴포넌트의 별점을 선택시 상태를 저장하는 변수
  const [scoreChoices, setScoreChoices] = useState(
    new Array(alcohols.length).fill(null)
  );
  //각 컴포넌트마다 추가 별점 점수 상태를 저장하는 변수
  const [selectedScores, setSelectedScores] = useState(
    new Array(alcohols.length).fill(null)
  );
  //기능 접근을 위해 해당 컴포넌트의 알콜이름을 저장하는 변수
  const [selectedAlcoholNames, setSelectedAlcoholNames] = useState(
    new Array(alcohols.length).fill(null)
  );
  //각 컴포넌트마다 색깔 상태를 저장하는 변수
  const [heartColors, setHeartColors] = useState(
    new Array(alcohols.length).fill("rgba(255,255,255,0.4)")
  );
  //각 컴포넌트마다 리뷰입력 상태를 저장하는 변수
  const [reviewInputs, setReviewInputs] = useState(
    new Array(alcohols.length).fill("")
  );
  //해당 알콜이름의 점수선택을 비활성화 하기위한 변수
  const [scoreSelectDisabled, setScoreSelectDisabled] = useState(
    alcohols.reduce((acc, cur) => {
      acc[cur.alcohol_name] = false;
      return acc;
    }, {})
  );
  const [jjimData, setJjimData] = useState([]);
  //별점 입력시 데이터를 저장하는 함수.
  const handleScoreChange = (index, value) => {
    const newScoreChoices = [...scoreChoices];
    newScoreChoices[index] = value;
    setScoreChoices(newScoreChoices);
  };
  //리뷰 입력시 데이터를 저장하는 함수.
  const handleReviewInputChange = (index, value) => {
    const newReviewInputs = [...reviewInputs];
    newReviewInputs[index] = value;
    setReviewInputs(newReviewInputs);
  };
  //해당하는 컴포넌트의 리뷰를 등록하는 함수.
  const handleReviewSaveClick = async (index) => {
    const userId = sessionStorage.getItem("user_id");
    const alcoholName = alcohols[index].alcohol_name;
    const review = reviewInputs[index];

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await AxiosApi.addReview(userId, alcoholName, review);
      alert("리뷰가 성공적으로 등록되었습니다.");
      const newReviewInputs = [...reviewInputs];
      newReviewInputs[index] = ""; // 빈 문자열로 초기화합니다.
      setReviewInputs(newReviewInputs);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("리뷰 등록에 실패했습니다.");
    }
  };
  //해당하는 컴포넌트의 별점을 추가하는 함수.
  const handleScoreButtonClick = async (index, alcoholName) => {
    const userId = sessionStorage.getItem("user_id");
    const score = scoreChoices[index];

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    } else if (score === null) {
      alert("별점을 선택해주세요.");
      return;
    }

    try {
      await AxiosApi.insertScore(userId, alcoholName, score);
      alert("별점이 성공적으로 등록되었습니다.");
      //별점값을 누적해서 저장하는 부분.
      const newSelectedScores = [...selectedScores];
      newSelectedScores[index] = score;
      setSelectedScores(newSelectedScores);

      const newSelectedAlcoholNames = [...selectedAlcoholNames];
      newSelectedAlcoholNames[index] = alcoholName;
      setSelectedAlcoholNames(newSelectedAlcoholNames);
      // 값을 렌더링해서 별점값 계산 후 반영 ,등수를 재조정.
      alcoholList();
      setScoreSelectDisabled((prev) => {
        const newState = { ...prev };
        newState[alcoholName] = true;
        return newState;
      });
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("별점 등록에 실패했습니다.");
    }
  };

  const handleHeartClick = async (index) => {
    const userId = sessionStorage.getItem("user_id");
    const alcoholName = alcohols[index].alcohol_name;

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const updatedJjimData = Array.isArray(jjimData) ? [...jjimData] : [];

      if (updatedJjimData.includes(alcoholName)) {
        const deletesp = await AxiosApi.deleteJjim(userId, alcoholName);
        console.log(deletesp);

        const indexToDelete = updatedJjimData.findIndex(
          (name) => name === alcoholName
        );
        updatedJjimData.splice(indexToDelete, 1);

        setJjimData(updatedJjimData);

        setHeartColors((prev) => {
          const newHeartColors = [...prev];
          newHeartColors[index] = "rgba(255,255,255,0.4)";
          return newHeartColors;
        });
      } else {
        await AxiosApi.insertJjim(userId, alcoholName);
        const newJjimData = [...updatedJjimData, alcoholName];
        setJjimData(newJjimData);

        setHeartColors((prev) => {
          const newHeartColors = [...prev];
          newHeartColors[index] = "red";
          return newHeartColors;
        });
      }
    } catch (error) {
      console.error("Error updating jjim data:", error);
      alert("찜하기 기능을 업데이트하는 중에 오류가 발생했습니다.");
    }
  };
  // isOne이 true인 경우 첫 번째 항목만 반환
  const displayedAlcohols =
    isOne && alcohols.length > 0 ? [alcohols[0]] : alcohols;

  return (
    <>
      {displayedAlcohols &&
        displayedAlcohols.map((item, index) => (
          <ItemBox key={index}>
            <ImageContainer>
              <ImageWithFallback alcoholName={item.alcohol_name} />
            </ImageContainer>
            <ItemContext>
              <div className="com">{item.com}</div>
              <div className="name">{item.alcohol_name}</div>
              <div>
                <div className="country_of_origin">
                  {item.country_of_origin}
                </div>
                <div className="abv">{item.abv}%</div>
                <div className="volume">{item.volume}ml</div>
                <div className="price">{item.price}원</div>
              </div>
              <div className="score">
                <FaStar size={20} color="yellow" />
                <div className="wall">|</div>
                {item.score}

                <ScoreSelect
                  value={scoreChoices[index] || ""}
                  onChange={(e) => handleScoreChange(index, e.target.value)}
                  disabled={
                    scoreSelectDisabled[item.alcohol_name] ||
                    !sessionStorage.getItem("user_id")
                  }
                >
                  <option value="">별점</option>
                  <option value={1}>1점</option>
                  <option value={2}>2점</option>
                  <option value={3}>3점</option>
                  <option value={4}>4점</option>
                  <option value={5}>5점</option>
                </ScoreSelect>
                <ScoreButton
                  onClick={() =>
                    handleScoreButtonClick(index, item.alcohol_name)
                  }
                >
                  선택
                </ScoreButton>
              </div>
            </ItemContext>
            <ItemReview>
              <div className="review">Review</div>
              <ReviewValue
                isOne={isOne}
                value={reviewInputs[index]}
                onChange={(e) => handleReviewInputChange(index, e.target.value)}
              />
              <ReviewView isOne={isOne}>{item.review}</ReviewView>
              <divr className="reviewdiv">
                <ReviewBtn
                  isOne={isOne}
                  onClick={() => handleReviewSaveClick(index)}
                >
                  입력
                </ReviewBtn>
                <div className="more">더보기</div>
              </divr>
            </ItemReview>
            <FaHeart
              size="30"
              className="heart"
              color={heartColors[index]}
              onClick={() => handleHeartClick(index)}
            />
          </ItemBox>
        ))}
    </>
  );
};

const ImageWithFallback = ({ alcoholName }) => {
  const src = `${process.env.PUBLIC_URL}/alcoholimg/${alcoholName}.jpg`;
  return <ItemImage src={src} />;
};

export default ListItem;
