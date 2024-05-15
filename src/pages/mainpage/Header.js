import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../img/mainpageimg/logo/logo1.jpeg";
//Header StyledComponent
const HeaderContainer = styled.header`
  width: 100vw;
  height: 15vh;
  border: none;
  display: flex;
`;
//logoImg wrapping StyledComponent
const DivLogo = styled.div`
  width: 17vw;
  height: 15vh;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//logoImg StyledComponent
const Logo = styled.div`
  width: 7vw;
  height: 15vh;
  background-image: ${({ logourl }) => `url(${logourl})`};
  border: none;
  border-radius: 20%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
//Header wrapping StyledComponent

const DivHeader = styled.div`
  width: 83vw;
  height: 15vh;
  border: none;
  display: flex;
  align-items: center;
`;
//Nav StyledComponent
const Nav = styled.nav`
  width: 58vw;
  height: 13vh;
  margin-left: 25vw;
  border: none;
  display: flex;
`;
//Header 안에 Item StyledComponent
const Item = styled.div`
  width: 9vw;
  height: 13vh;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//ItemFont StyledComponent
const ItemFont = styled.p`
  font-size: 18px;
  font-weight: border;
  color: #fff;
`;
// signup,마이페이지,사이드바 버튼을 wrapping StyledComponent
const SideWrapping = styled.div`
  width: 13vw;
  height: 13vh;
  border: none;
  display: flex;
  align-items: center;
`;
// signup 버튼 StyledComponent
const SignUpBtn = styled.div`
  width: 80px;
  height: 40px;
  border-radius: 15%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 1vw;
  border: none;
`;
//사이드바 버튼 StyledComponent
const SideBarBtn = styled.div`
  width: 35px;
  height: 35px;
  border: none;
  background-color: rgba(0, 0, 0, 0.8);
  margin-left: 1vw;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  & > div {
    width: 27px;
    height: 3px;
    border: 1px solid black;
    border-radius: 20%;
    background-color: rgba(255, 255, 255, 0.6);
  }
`;
const Header = () => {
  return (
    <HeaderContainer>
      <DivLogo>
        <Link to="/">
          <Logo logourl={logo} />
        </Link>
      </DivLogo>
      <DivHeader>
        <Nav>
          <Item>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ItemFont>인기주류</ItemFont>
            </Link>
          </Item>
          <Item>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ItemFont>전통주</ItemFont>
            </Link>
          </Item>
          <Item>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ItemFont>위스키</ItemFont>
            </Link>
          </Item>
          <Item>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ItemFont>와인</ItemFont>
            </Link>
          </Item>
          <Item>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ItemFont>맥주</ItemFont>
            </Link>
          </Item>
          <SideWrapping>
            <Link to="/" style={{ textDecoration: "none" }}>
              <SignUpBtn>
                <ItemFont>SignUp</ItemFont>
              </SignUpBtn>
            </Link>
            
              <SideBarBtn>
                <div />
                <div />
                <div />
              </SideBarBtn>
          </SideWrapping>
        </Nav>
      </DivHeader>
    </HeaderContainer>
  );
};

export default Header;
