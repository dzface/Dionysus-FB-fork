import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState, useEffect } from "react";
import AxiosApi from "../../../api/AxiosApi";
// ListItem 스타일 컴포넌트를 생성합니다.
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
const ContextBox = styled.div`
  width: 330px;
  height: 140px;
  display: flex;
  flex-direction: column;
`;
const ItemContext = styled.div`
  width: 330px;
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
  & + .score {
    height: 30px;
    color: white;
  }
  & + .score span {
    margin-left: 10px;
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
  & > .more {
    display: flex;
    justify-content: end;
  }
`;
const Jjim = styled.div`
  width: 40px;
  height: 100px;
  margin-left: 7px;
`;
const JjimItem = () => {
  const [alcohol1, setAlcohol1] = useState("");
  const [alcohol_name, setAlcohol_name] = useState("");
  const [allScore, setAllScore] = useState();
  const [jjimReview, setJjimReview] = useState();

  useEffect(() => {
    const jjimAlcoholInfo = async () => {
      try {
        const rsp = await AxiosApi.jjimAlcohol(
          sessionStorage.getItem("user_id")
        ); // 찜한 술 정보 가져오기
        if (rsp.data && rsp.data.length > 0) {
          setAlcohol1(rsp.data);
          setAlcohol_name(rsp.data[0]?.alcohol_name); // 첫 번째 항목의 alcohol_name 설정
        }
      } catch (e) {
        console.log(e);
      }
    };
    jjimAlcoholInfo();
  }, []);
  useEffect(() => {
    const calScore = async () => {
      try {
        const rsp = await AxiosApi.calScore(alcohol_name);
        if (rsp.data && rsp.data.length > 0) {
          setAllScore(rsp.data[0].score);
        }
      } catch (e) {
        console.log(e);
      }
    };
    calScore();
  }, [alcohol_name]);
  useEffect(() => {
    const jjimReview = async () => {
      try {
        const rsp = await AxiosApi.jjimReview(alcohol_name);
        if (rsp.data && rsp.data.length > 0) {
          setJjimReview(rsp.data[0]?.review);
        }
      } catch (e) {
        console.log(e);
      }
    };
    jjimReview();
  }, [alcohol_name]);

  return (
    <>
      <ItemBox>
        <ImageContainer>
          <ImageWithFallback alcoholName={alcohol1[0]?.alcohol_name} />
        </ImageContainer>
        <ContextBox>
          {alcohol1 && alcohol1.length > 0 ? (
            <ItemContext key={0}>
              <div className="com">{alcohol1[0]?.com}</div>
              <div className="name">{alcohol1[0]?.alcohol_name}</div>
              <div>
                <div className="country_of_origin">
                  {alcohol1[0]?.country_of_origin}
                </div>
                <div className="abv">ABV: {alcohol1[0]?.abv}%</div>
                <div className="volume">{alcohol1[0]?.volume}ml</div>
                <div className="price">{alcohol1[0]?.price}원</div>
              </div>
            </ItemContext>
          ) : (
            <p>No data available</p>
          )}
          <ItemContext className="score">
            <div className="score">
              <FaStar size={20} color="yellow" />
              <span>|</span>
              <span>{allScore}</span>
            </div>
          </ItemContext>
        </ContextBox>

        <ItemReview>
          <div className="review">Review</div>
          <div className="reviewvalue">{jjimReview}</div>
          <div className="more">
            더보기
            <IoMdArrowDropdown size={28} />
          </div>
        </ItemReview>
        <Jjim>
          <FaHeart size={28} color="red" />
        </Jjim>
      </ItemBox>
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

  const src = `../../../${process.env.PUBLIC_URL}/alcoholimg/${alcoholName}.${extensions[srcIndex]}`;

  return <ItemImage src={src} onError={handleError} />;
};
export default JjimItem;
