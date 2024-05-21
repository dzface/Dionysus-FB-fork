import styled from "styled-components";
import alcoholimg from "../../../img/popularrecommendpageimg/pexels-markusspiske-121191.jpg";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
// ListItem 스타일 컴포넌트를 생성합니다.
const ItemBox = styled.div`
  width: 1000px;
  height: 170px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ItemImage = styled.div`
  width: 110px;
  height: 140px;
  background-image: ${({ alcoholimg }) => `url(${alcoholimg})`};
  background-size: cover;
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
  & > .score {
    height: 30px;
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
const ReviewItem = () => {
  return (
    <ItemBox>
      <ItemImage alcoholimg={alcoholimg} />
      <ItemContext>
        <div className="com">코트 드 프로방스(Cotes de Provence)</div>
        <div className="name">미라발 로즈 2021/22</div>
        <div>
          <div className="country_of_origin">프랑스(france)</div>
          <div className="abv">ABV:12.5%</div>
          <div className="volume">750ml</div>
          <div className="price">33,512원</div>
        </div>
        <div className="score">
          4
          <FaStar size={20} color="yellow" />
          <FaStar size={20} color="yellow" />
          <FaStar size={20} color="yellow" />
          <FaStar size={20} color="yellow" />
          <FaStar size={20} color="white" />
        </div>
      </ItemContext>
      <ItemReview>
        <div className="review">Review</div>
        <div className="reviewvalue">
          레드와인 중에 가장 바디감 있고 연인끼지 마시기 좋았습니다.
          스테이크랑도 잘 어울리고 파스타랑 같이 먹을 때도 완전 강추@!~!
        </div>
        <div className="more">
          더보기
          <IoMdArrowDropdown size={28} />
        </div>
      </ItemReview>
      <Jjim>
        <FaHeart size={28} color="red" />
      </Jjim>
    </ItemBox>
  );
};

export default ReviewItem;
