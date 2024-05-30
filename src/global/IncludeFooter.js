import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import Footer from "../pages/mainpage/Footer";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import TopButton from "./ScrollToTopButton";
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
        {/* 스크롤 존재할 때 사이드바 위치 감안해서 살짝 조정 */}
        <Header scrollexist={true} />
        <Outlet />
        <TopButton />
      </Background>
      <Footer />
    </WrapBackground>
  );
};

export default IncludeFooter;
