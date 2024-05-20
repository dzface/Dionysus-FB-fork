import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import Footer from "../pages/mainpage/Footer";
import { Outlet } from "react-router-dom";

const IncludeFooter = ({ backbtn, scroll }) => {
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
