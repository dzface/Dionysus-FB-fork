import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
const WrapBackground = styled.div`
  width: auto;
  height: auto;
  overflow-x: hidden;
`;
const IncludeScrollMypage = () => {
  return (
    <WrapBackground>
      <Background backbtn={true} scroll={true} opacityisTrue={false}>
        <Header scrollexist={true} />
        <Outlet />
      </Background>
    </WrapBackground>
  );
};

export default IncludeScrollMypage;
