import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import Footer from "../pages/mainpage/Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
const LongBackground = styled.div`
  width: 100%;
  height: 3000px;
`;
const IncludeFooter = () => {
  return (
    <LongBackground>
      <Background>
        <Header />
        <Outlet />
        <Footer />
      </Background>
    </LongBackground>
  );
};

export default IncludeFooter;
