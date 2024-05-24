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
  object-fit: cover;
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
  & > textarea {
    color: #fff;
    font-size: 15px;
  }

  .reviewvalue {
    margin: 0;
    width: 370px;
    height: 60px;
    border-radius: 0;
    border: none;
    background-color: transparent;
  }
  .reviewdiv {
    display: flex;
    align-items: center;
  }
  .reviewbtn {
    width: 70px;
    height: 25px;
    border-radius: 7px;
    border: none;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 14px;
    margin-left: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      color: lightgray;
    }
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

const Jjim = styled.div`
  width: 40px;
  height: 100px;
  margin-left: 7px;
  & > .faheart {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.4);
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

const ListItem = ({ alcohols, alcoholList }) => {
  const [scoreChoices, setScoreChoices] = useState(
    new Array(alcohols.length).fill(null)
  );
  const [selectedScores, setSelectedScores] = useState(
    new Array(alcohols.length).fill(null)
  );
  const [selectedAlcoholNames, setSelectedAlcoholNames] = useState(
    new Array(alcohols.length).fill(null)
  );
  const [heartColors, setHeartColors] = useState(
    new Array(alcohols.length).fill("rgba(255,255,255,0.4)")
  );
  const [reviewInputs, setReviewInputs] = useState(
    new Array(alcohols.length).fill("")
  );
  const [scoreSelectDisabled, setScoreSelectDisabled] = useState(
    alcohols.reduce((acc, cur) => {
      acc[cur.alcohol_name] = false;
      return acc;
    }, {})
  );

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");
    if (userId) {
      const initialHeartColors = alcohols.map((alcohol) =>
        alcohol.jjim ? "red" : "rgba(255,255,255,0.4)"
      );
      setHeartColors(initialHeartColors);
    } else {
      setHeartColors(new Array(alcohols.length).fill("rgba(255,255,255,0.4)"));
    }
  }, [alcohols]);

  const handleHeartClick = async (index) => {
    const userId = sessionStorage.getItem("user_id");
    const alcoholName = alcohols[index].alcohol_name;

    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      if (heartColors[index] === "red") {
        const deletersp = await AxiosApi.deleteJjim(userId, alcoholName);
        console.log(deletersp);
        setHeartColors((prevColors) => {
          const newColors = [...prevColors];
          newColors[index] = "rgba(255,255,255,0.4)";
          return newColors;
        });
      } else {
        const insertrsp = await AxiosApi.insertJjim(userId, alcoholName);
        console.log(insertrsp);
        setHeartColors((prevColors) => {
          const newColors = [...prevColors];
          newColors[index] = "red";
          return newColors;
        });
      }

      alcoholList();
    } catch (error) {
      console.error("Error toggling jjim:", error);
      alert("찜 상태를 변경하는 데 실패했습니다.");
    }
  };

  const handleScoreChange = (index, value) => {
    const newScoreChoices = [...scoreChoices];
    newScoreChoices[index] = value;
    setScoreChoices(newScoreChoices);
  };

  const handleReviewInputChange = (index, value) => {
    const newReviewInputs = [...reviewInputs];
    newReviewInputs[index] = value;
    setReviewInputs(newReviewInputs);
  };

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

      const newSelectedScores = [...selectedScores];
      newSelectedScores[index] = score;
      setSelectedScores(newSelectedScores);

      const newSelectedAlcoholNames = [...selectedAlcoholNames];
      newSelectedAlcoholNames[index] = alcoholName;
      setSelectedAlcoholNames(newSelectedAlcoholNames);

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

  return (
    <>
      {alcohols &&
        alcohols.map((item, index) => (
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
              <textarea
                className="reviewvalue"
                value={reviewInputs[index]}
                onChange={(e) => handleReviewInputChange(index, e.target.value)}
              />
              <divr className="reviewdiv">
                <div
                  className="reviewbtn"
                  onClick={() => handleReviewSaveClick(index)}
                >
                  입력
                </div>
                <div className="more">더보기</div>
              </divr>
            </ItemReview>
            <Jjim>
              <FaHeart
                className="faheart"
                size={28}
                color={heartColors[index]}
                onClick={() => handleHeartClick(index)}
              />
            </Jjim>
          </ItemBox>
        ))}
    </>
  );
};

const ImageWithFallback = ({ alcoholName }) => {
  const [srcIndex, setSrcIndex] = useState(0);
  const extensions = ["png", "jpg", "jpeg", "webp"];

  const handleError = () => {
    if (srcIndex < extensions.length - 1) {
      setSrcIndex(srcIndex + 1);
    }
  };

  const src = `${process.env.PUBLIC_URL}/alcoholimg/${alcoholName}.${extensions[srcIndex]}`;

  return <ItemImage src={src} onError={handleError} />;
};

export default ListItem;
