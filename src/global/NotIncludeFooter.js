import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import { Outlet } from "react-router-dom";
const NotIncludeFooter = () => {
  return (
    <Background backbtn={true} scroll={false} opacityisTrue={false}>
      <Header />
      <Outlet />
    </Background>
  );
};

export default NotIncludeFooter;
