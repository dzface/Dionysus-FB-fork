import styled, { keyframes, css } from "styled-components";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import AxiosApi from "../../../api/AxiosApi";

const ItemBox = styled.div`
  width: 1000px;
  height: 170px;
  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 140px;
  height: 170px;
  margin-left: 10px;
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
  border: 1px solid white;
  padding: 10px;
  color: #fff;
  visibility: ${({ buttonvisible }) => (buttonvisible ? "hidden" : "visible")};
  display: ${({ buttonon }) => (buttonon ? "none" : "flex")};
  margin-right: 10px;
  flex-direction: column;
  justify-content: space-between;
  & > .review {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .reviewdiv {
    display: flex;
    align-items: center;
    margin-top: 7px;
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
  width: 370px;
  height: 60px;
  border-radius: 0;
  border: none;
  background-color: transparent;
  color: #fff;
  font-size: 15px;
  display: ${({ reviewinput }) => (reviewinput ? "block" : "none")};
`;
const ReviewView = styled.div`
  margin: 0;
  width: 370px;
  border-radius: 0;
  border: none;
  display: ${({ isReview, firstreview }) =>
    isReview || firstreview ? "block" : "none"};
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
  display: ${({ reviewinput }) => (reviewinput ? "flex" : "none")};
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
const Morebtnreview = styled.div`
  width: 400px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;
  color: #fff;
  display: ${({ buttonon }) => (buttonon ? "block" : "none")};
  position: relative;
  margin-top: auto;
  margin-right: 10px;
  z-index: 10;
  & > .review {
    font-size: 20px;
    margin-bottom: 5px;
  }
  .reviewdiv {
    display: flex;
    justify-content: end;
    align-items: center;
  }
  .reviewlist {
    margin-bottom: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px;
  }
  .reviewuser {
    font-size: 13px;
    margin-bottom: 5px;
  }
  .close {
    font-size: 15px;
    margin-right: 7px;
    cursor: pointer;
    &:hover {
      color: green;
    }
  }
`;
// bounce 애니메이션 정의
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
// bounce을 적용할 HeartIcon 정의
const HeartIcon = styled(FaHeart)`
  cursor: pointer;
  ${(props) =>
    props.bouncing &&
    css`
      animation: ${bounce} 1s;
    `}
`;
// zoomOutUp 애니메이션 정의
const zoomOutUp = keyframes`
  40% {
    opacity: 1;
    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);
    animation-timing-function: ease-in;
  }
  100% {
    opacity: 0;
    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);
    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);
  }
`;
// zoomOutUp을 적용할 AnimatedStar 정의
const AnimatedStar = styled(FaStar)`
  ${(props) =>
    props.isAnimating &&
    css`
      animation: ${zoomOutUp} 1s forwards;
    `}
`;
// flipInX 애니메이션 정의
const flipInX = keyframes`
  from {
    transform: perspective(400px) rotateX(90deg);
    opacity: 0;
  }
  to {
    transform: perspective(400px) rotateX(0deg);
    opacity: 1;
  }
`;
// flipInX을 적용할 AnimatedScore 정의
const AnimatedScore = styled.div`
  ${(props) =>
    props.isAnimating &&
    css`
      animation: ${flipInX} 0.6s forwards;
    `}
`;
const ListItem = ({
  alcohols,
  alcoholList,
  isOne,
  isReview,
  reviewinput,
  firstreview,
}) => {
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
  //알콜에 매칭해서 해당 아이디,알콜이름,리뷰,닉네임 저장
  const [otherreviewsave, setOtherreviewsave] = useState([]);
  //더보기를 눌렀을 때 해당하는 컴포넌트만 더보기 창이 뜨도록 상태를 저장하는 변수
  const [morebtnonclick, setMorebtnonclick] = useState(
    new Array(alcohols.length).fill(false)
  );
  //더보기를 눌렀을 때 나머지 리뷰들 전부 숨김.
  const [morerestreview, setMorerestreview] = useState(false);

  const [jjimData, setJjimData] = useState([]);
  // 추가된 상태 정의: 하트 아이콘이 bouncing 상태인지 추적
  const [bouncingHeart, setBouncingHeart] = useState(null);
  // 추가된 상태 정의: 별점 아이콘이 zoomOutUp 상태인지 추적
  const [animatingStar, setAnimatingStar] = useState(null);
  // 추가된 상태 정의: 별점 점수가 flipInX 상태인지 추적
  const [animatingScore, setAnimatingScore] = useState(null);
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
  //해당 알콜에 맞춰 리뷰들 값을 받아오는 부분
  const otherUserReview = async (index) => {
    const alcoholName = alcohols[index].alcohol_name;
    try {
      const response = await AxiosApi.selectReview(alcoholName);
      setOtherreviewsave(response.data);
    } catch (error) {
      console.error("Error Review Upload:", error);
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

      // Star animation
      setAnimatingStar(index);
      setTimeout(() => setAnimatingStar(null), 1000); // 1초 후 애니메이션 상태 초기화
      // Score animation
      setAnimatingScore(index);
      setTimeout(() => setAnimatingScore(null), 1000); // 0.6초 후 애니메이션 상태 초기화
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("별점 등록에 실패했습니다.");
    }
  };

  const morebtnOnclickEvent = (index) => {
    const updatedMoreBtnClicks = [...morebtnonclick];
    updatedMoreBtnClicks[index] = !updatedMoreBtnClicks[index];
    setMorebtnonclick(updatedMoreBtnClicks);
    setMorerestreview(true);
    otherUserReview(index);
  };
  const closeOnclickEvent = (index) => {
    setMorerestreview(false);
    setMorebtnonclick((prev) => {
      const updatedMoreBtnClicks = [...prev];
      updatedMoreBtnClicks[index] = false;
      return updatedMoreBtnClicks;
    });
  };
  const defaultJjim = async (userId) => {
    try {
      const response = await AxiosApi.selectJjim(userId);
      setJjimData(response.data);
    } catch (error) {
      console.error("Error fetching jjim data:", error);
    }
  };
  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");
    if (userId) {
      defaultJjim(userId);
    }
  }, []);
  //하트를 눌렀을 때 일어나는 이벤트 함수
  const handleHeartClick = async (index) => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    // 선택한 항목의 알코올 이름 가져오기
    const alcoholName = alcohols[index].alcohol_name;

    try {
      // 이미 즐겨찾기에 있는지 확인
      const isAlreadyJjim = jjimData.some(
        (jjim) => jjim.alcohol_name === alcoholName
      );

      if (!isAlreadyJjim) {
        // 즐겨찾기에 추가
        await AxiosApi.insertJjim(userId, alcoholName);

        // 즐겨찾기 상태 업데이트
        setJjimData((prevJjimData) => [
          ...prevJjimData,
          { alcohol_name: alcoholName },
        ]);
      } else {
        // 즐겨찾기에서 제거
        await AxiosApi.deleteJjim(userId, alcoholName);

        // 즐겨찾기 상태 업데이트
        setJjimData((prevJjimData) =>
          prevJjimData.filter((jjim) => jjim.alcohol_name !== alcoholName)
        );
      }
      // bouncing 상태 업데이트
      setBouncingHeart(index);
      setTimeout(() => setBouncingHeart(null), 1000); // 1초 후 bouncing 상태 초기화
      alcoholList();
    } catch (error) {
      console.error("Error toggling jjim:", error);
      alert("즐겨찾기 변경 중 오류가 발생했습니다.");
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
                <AnimatedStar
                  size={20}
                  color="yellow"
                  isAnimating={animatingStar === index}
                />
                <div className="wall">|</div>
                <AnimatedScore isAnimating={animatingScore === index}>
                  {item.score}
                </AnimatedScore>

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
            <ItemReview
              buttonvisible={morerestreview}
              buttonon={morebtnonclick[index]}
            >
              <div className="review">Review</div>
              <ReviewValue
                reviewinput={reviewinput}
                value={reviewInputs[index]}
                onChange={(e) => handleReviewInputChange(index, e.target.value)}
              />
              <ReviewView firstreview={firstreview}>{item.review}</ReviewView>
              <div className="reviewdiv">
                <ReviewBtn
                  reviewinput={reviewinput}
                  onClick={() => handleReviewSaveClick(index)}
                >
                  입력
                </ReviewBtn>
                <div
                  className="more"
                  onClick={() => morebtnOnclickEvent(index)}
                >
                  더보기
                </div>
              </div>
            </ItemReview>
            <Morebtnreview buttonon={morebtnonclick[index]}>
              <div className="review">Review</div>
              {otherreviewsave && otherreviewsave.length > 0 ? (
                otherreviewsave.map((reviewitem) => (
                  <div className="reviewlist">
                    <div className="reviewuser">
                      <span>{reviewitem.user_nick}</span>
                    </div>
                    <ReviewView isReview={isReview}>
                      {reviewitem.review}
                    </ReviewView>
                  </div>
                ))
              ) : (
                <div className="reviewlist">
                  <ReviewView isReview={isReview}>
                    <p>리뷰가 없습니다.</p>
                  </ReviewView>
                </div>
              )}
              <div className="reviewdiv">
                <div
                  className="close"
                  onClick={() => {
                    closeOnclickEvent(index);
                  }}
                >
                  닫기
                </div>
              </div>
            </Morebtnreview>
            <HeartIcon
              size="30"
              color={
                jjimData.some((jjim) => jjim.alcohol_name === item.alcohol_name)
                  ? "red"
                  : "rgba(255,255,255,0.4)"
              }
              onClick={() => {
                handleHeartClick(index);
              }}
              bouncing={bouncingHeart === index}
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
