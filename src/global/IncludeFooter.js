import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import Footer from "../pages/mainpage/Footer";
import { Outlet } from "react-router-dom";
const IncludeFooter = () => {
  return (
    <Background>
      <Header />
      <Outlet />
      <Footer />
    </Background>
  );
};

export default IncludeFooter;
