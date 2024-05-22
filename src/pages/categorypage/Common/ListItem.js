import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

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
  .more {
    margin-top: 10px;
    display: flex;
  }
  .reviewvalue {
    margin: 0;
    width: 370px;
    height: 60px;
    border-radius: 0;
    border: none;
    background-color: transparent;
  }
  & > .btnclass {
    display: flex;
  }
  & > div > button {
    width: 70px;
    height: 25px;
    border-radius: 7px;
    border: none;
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    font-size: 15px;
    margin-left: 220px;
  }
  .arrow {
    width: auto;
    height: auto;
    cursor: pointer;
  }
`;

const Jjim = styled.div`
  width: 40px;
  height: 100px;
  margin-left: 7px;
`;

const ListItem = ({ alcohols }) => {
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
            </ItemReview>
            <Jjim>
              <FaHeart size={28} color="rgba(255,255,255,0.4)" />
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
