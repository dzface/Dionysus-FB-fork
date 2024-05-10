import styled, { css } from "styled-components";
import Backgroundimg from "../img/beer.jpg";
const BackgroundImg = styled.img`
  width: 100%;
  height: 949.4px;
  object-fit: cover;
`;

const Background = () => {
  return (
    <>
      <BackgroundImg src={Backgroundimg} alt="alcohol" />
    </>
  );
};
export default Background;
