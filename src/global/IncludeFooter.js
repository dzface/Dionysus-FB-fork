import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import Footer from "../pages/mainpage/Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
const WrapBackground = styled.div`
  width: auto;
  height: auto;
  overflow-x: hidden;
  overflow-y: hidden;
`;
const IncludeFooter = () => {
  return (
    <WrapBackground>
      <Background backbtn={false} scroll={true} opacityisTrue={false}>
        <Header />
        <Outlet />
      </Background>
      <Footer />
    </WrapBackground>
  );
};

export default IncludeFooter;
