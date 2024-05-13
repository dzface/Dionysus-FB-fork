import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Background from "./Background";
import Header from "./Header";
const SideBarBody = styled.div`
  width: 300px;
  height: 600px;
  background-color: #08403d;
  opacity: 0.7;
  z-index: 5;
  display: flex;
  flex-direction: column;
  margin-left: 80.5vw;
  z-index: 5;
`;
const ProfileDiv = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
`;
const PrifileDiv2 = styled.div`
  width: 300px;
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ProfileImg = styled.div`
  width: 100px;
  height: 100px;
  border: none;
  border-radius: 50%;
  background-color: white;
  margin: 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ProfileBtn = styled.div`
  width: 60px;
  height: 30px;
  border-radius: 20%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  & > p {
    color: #fff;
  }
`;
const BtnStyle = styled.div`
  width: 90px;
  height: 40px;
  border-radius: 20%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  & > p {
    color: #fff;
  }
`;
const SideMenuDiv = styled.div`
  width: 300px;
  height: 80px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  > .sidemenu {
    color: #fff;
    & > p {
      font-size: 17px;
      font-weight: bolder;
    }
  }
`;
const SideBar = () => {
  return (
    <Background>
      <Header />
      <SideBarBody>
        <ProfileDiv>
          <ProfileImg>
            <ProfileBtn>
              <p>업로드</p>
            </ProfileBtn>
          </ProfileImg>
        </ProfileDiv>
        <PrifileDiv2>
          <Link to="./" style={{ textDecoration: "none" }}>
            <BtnStyle>
              <p>Sign Up</p>
            </BtnStyle>
          </Link>
          <Link to="./" style={{ textDecoration: "none" }}>
            <BtnStyle>
              <p>마이페이지</p>
            </BtnStyle>
          </Link>
        </PrifileDiv2>
        <SideMenuDiv>
          <Link
            to="/SideBar"
            style={{ textDecoration: "none" }}
            className="sidemenu"
          >
            <p>인기주류</p>
          </Link>
        </SideMenuDiv>
        <SideMenuDiv>
          <Link
            to="/SideBar"
            style={{ textDecoration: "none" }}
            className="sidemenu"
          >
            <p>전통주</p>
          </Link>
        </SideMenuDiv>
        <SideMenuDiv>
          <Link
            to="/SideBar"
            style={{ textDecoration: "none" }}
            className="sidemenu"
          >
            <p>위스키</p>
          </Link>
        </SideMenuDiv>
        <SideMenuDiv>
          <Link
            to="/SideBar"
            style={{ textDecoration: "none" }}
            className="sidemenu"
          >
            <p>와인</p>
          </Link>
        </SideMenuDiv>
        <SideMenuDiv>
          <Link
            to="/SideBar"
            style={{ textDecoration: "none" }}
            className="sidemenu"
          >
            <p>맥주</p>
          </Link>
        </SideMenuDiv>
      </SideBarBody>
    </Background>
  );
};
export default SideBar;
