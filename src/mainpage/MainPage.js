import styled, { css } from "styled-components";
import logo from "../img/logo/logo1.jpeg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import beer from "../img/background/beer.jpg";
import traditional from "../img/background/traditional.jpg";
import wine from "../img/background/wine.jpg";
import wiskey from "../img/background/wiskey.jpg";
import naverblog from "../img/details/naverblog-icon.png";
import instargram from "../img/details/instargram-icon.png";
import facebook from "../img/details/facebook-icon.png";
import youtube from "../img/details/youtube-icon.png";
import telicon from "../img/details/tel-icon.png";
import prevslider from "../img/details/btn_slider_prev.png";
import nextslider from "../img/details/btn_slider_next.png";

//BackgrroundImg StyledComponent
const BackgroundImg = styled.div`
  width: 100vw;
  height: 100vh;
  border: none;
  background-image: ${({ imageurl }) => `url(${imageurl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: fixed;
`;
//Header StyledComponent
const Header = styled.header`
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
  font-size: 17px;
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
//ImgChangeBtnsDiv StyledComponent;
const ImgChangeBtnsDiv = styled.div`
  width: 100vw;
  height: 5vh;
  border: none;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* display: none; */
`;

//Footer StyledComponent
const Footer = styled.footer`
  width: 100vw;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.8);
  border: none;
  position: absolute;
  display: flex;
  bottom: 0;
  display: none;
  .partition1 {
    width: 75vw;
    height: 20vh;
    border: none;
    display: flex;
    flex-direction: column;
    & > .footeritem:nth-child(1) {
      width: 75vw;
      height: 6vh;
      border: none;
      display: flex;
    }
    & > .footeritem:nth-child(2) {
      width: 74vw;
      height: 14vh;
      border: none;
      font-size: 0.85vw;
      line-height: 0.5vw;
      margin-left: 1vw;
      color: rgba(255, 255, 255, 0.8);
    }
  }
  .partition2 {
    width: 25vw;
    height: 20vh;
    border: none;
    & > .icon {
      width: 23vw;
      height: 9vh;
      border: none;
      margin-left: 2vw;
      display: flex;
    }
    & > .tel {
      width: 25vw;
      height: 11vh;
      border: none;
      display: flex;
      & > .telicon {
        width: 8vw;
        height: 11vh;
        display: flex;
        justify-content: right;
        align-items: center;
        border: none;
      }
      & > .telimf {
        width: 17wv;
        height: 11vh;
        border: none;
        & > .teltext {
          width: 17vw;
          height: 6vh;
          font-size: 12px;
          display: flex;
          margin-left: 2vw;
          align-items: center;
          color: white;
          border: none;
        }
        & > .telnumber {
          width: 17vw;
          height: 1vh;
          font-size: 20px;
          display: flex;
          margin-left: 2vw;
          align-items: center;
          font-weight: bolder;
          color: white;
          border: none;
        }
      }
    }
  }
`;
//회사소개 등 값을 넣고 정렬하기 위한 StyledComponent
const FooterDiv = styled.div`
  width: 8vw;
  height: 6vh;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  border-right: 0.5px solid #ffffff;
  & > .footertext {
    font-size: 1.1vw;
  }
`;
const FooterLastDiv = styled.div`
  width: 10vw;
  height: 6vh;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  & > .footertext {
    font-size: 1.1vw;
  }
`;
//IconImg styledComponent
const IconImgDiv = styled.div`
  width: 4vw;
  height: 9vh;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 3.2vw;
    height: 73%;
    opacity: 0.85;
    border-radius: 20%;
  }
  .instargram {
    width: 4.5vw;
    height: 100%;
    opacity: 0.85;
  }
  .youtube {
    width: 3.2vw;
    height: 6.4vh;
    opacity: 0.85;
  }
`;
//배경바꾸는 버튼 styledComponent
const ImgBtnDiv = styled.div`
  width: 3vw;
  height: 5vh;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    width: 1.3vw;
    height: 1.3vw;
    border: none;
    background-color: #fff;
    border-radius: 50%;
    &:hover {
      background-color: rgba(255, 0, 0, 0.6);
    }
  }
`;
const PageSlide = styled.div`
  width: 100vw;
  height: 80vh;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > div {
    width: 4vw;
    height: 13vh;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
      width: 3vw;
      height: 13vh;
    }
    &:hover {
      color: red;
      transition: 0.7s;
    }
  }
`;
const MainPage = () => {
  const [background, setBackground] = useState(beer);
  const onClick = (url) => {
    setBackground(url);
  };
  return (
    <BackgroundImg imageurl={background}>
      <Header>
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
              <Link to="/SideBar" style={{ textDecoration: "none" }}>
                <SideBarBtn>
                  <div />
                  <div />
                  <div />
                </SideBarBtn>
              </Link>
            </SideWrapping>
          </Nav>
        </DivHeader>
      </Header>
      <PageSlide>
        <div role="button">
          <img src={prevslider} alt="prevslider" />
        </div>
        <div role="button">
          <img src={nextslider} alt="nextslider" />
        </div>
      </PageSlide>
      <ImgChangeBtnsDiv>
        <ImgBtnDiv>
          <button
            onClick={() => {
              onClick(beer);
            }}
          />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button
            onClick={() => {
              onClick(traditional);
            }}
          />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button
            onClick={() => {
              onClick(wine);
            }}
          />
        </ImgBtnDiv>
        <ImgBtnDiv>
          <button
            onClick={() => {
              onClick(wiskey);
            }}
          />
        </ImgBtnDiv>
      </ImgChangeBtnsDiv>
      <Footer>
        <div className="partition1">
          <div className="footeritem">
            <FooterDiv>
              <p className="footertext">회사소개</p>
            </FooterDiv>
            <FooterDiv>
              <p className="footertext">서비스안내</p>
            </FooterDiv>
            <FooterDiv>
              <p className="footertext">광고제휴안내</p>
            </FooterDiv>
            <FooterDiv>
              <p className="footertext">이용약관</p>
            </FooterDiv>
            <FooterLastDiv>
              <p className="footertext">개인정보처리방침</p>
            </FooterLastDiv>
          </div>
          <div className="footeritem">
            <p>(주)디오니소스 대표이사:이경섭 사업자등록번호:106-81-98868 </p>
            <p>
              주소:서울시용산구한강대로366,A동176호 개인정보관리 책임자:박성진
              청소년보호책임자:김세호 발행,편집인:강인구
            </p>
            <br />
            <p>CopyrightⓒDIONYSUS.COM.All rights reserved since 2024</p>
          </div>
        </div>
        <div className="partition2">
          <div className="icon">
            <IconImgDiv>
              <Link to="/">
                <img src={naverblog} alt="naverblog" />
              </Link>
            </IconImgDiv>
            <IconImgDiv>
              <Link to="/">
                <img src={instargram} alt="instargram" className="instargram" />
              </Link>
            </IconImgDiv>
            <IconImgDiv>
              <Link to="/">
                <img src={facebook} alt="facebook" />
              </Link>
            </IconImgDiv>
            <IconImgDiv>
              <Link to="/">
                <img src={youtube} alt="youtube" className="youtube" />
              </Link>
            </IconImgDiv>
          </div>
          <div className="tel">
            <div className="telicon">
              <img src={telicon} alt="telicon" />
            </div>
            <div className="telimf">
              <div className="teltext">
                <p>술 홍보/행사 문의</p>
              </div>
              <div className="telnumber">
                <p>02.8603.3487</p>
              </div>
            </div>
          </div>
        </div>
      </Footer>
    </BackgroundImg>
  );
};
export default MainPage;
