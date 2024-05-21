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
const ListItem = ({ data }) => {
  console.log(data);
  return (
    <>
      {data &&
        data.map((item, index) => (
          <ItemBox key={index}>
            <ItemImage alcoholimg={alcoholimg} />
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
                {item.score}
                <FaStar size={20} color="yellow" />
                <FaStar size={20} color="yellow" />
                <FaStar size={20} color="yellow" />
                <FaStar size={20} color="yellow" />
                <FaStar size={20} color="white" />
              </div>
            </ItemContext>
            <ItemReview>
              <div className="review">Review</div>
              <div className="reviewvalue">{item.review}</div>
              <div className="more">
                더보기
                <IoMdArrowDropdown size={28} />
              </div>
            </ItemReview>
            <Jjim>
              <FaHeart size={28} color="red" />
            </Jjim>
          </ItemBox>
        ))}
    </>
  );
};

export default ListItem;
