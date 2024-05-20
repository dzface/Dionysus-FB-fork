import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import Footer from "../pages/mainpage/Footer";
import { Outlet } from "react-router-dom";
// import styled from "styled-components";
// const CoverBack =  styled.div`
//   width:100vw;

// `;
const IncludeFooter = () => {
  return (
    <>
      <Background backbtn={false} scroll={true}>
        <Header />
        <Outlet />
      </Background>
      <Footer />
    </>
  );
};

export default IncludeFooter;
