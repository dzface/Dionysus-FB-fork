import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import { Outlet } from "react-router-dom";
const NotIncludeFooter = () => {
  return (
    <Background backbtn={false} scroll={false}>
      <Header />
      <Outlet />
    </Background>
  );
};

export default NotIncludeFooter;
