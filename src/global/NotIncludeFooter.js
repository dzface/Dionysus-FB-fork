import Background from "../pages/mainpage/Background";
import Header from "../pages/mainpage/Header";
import { Outlet } from "react-router-dom";
const NotIncludeFooter = () => {
  return (
    <Background opacity={0.5}>
      <Header />
      <Outlet />
    </Background>
  );
};

export default NotIncludeFooter;
