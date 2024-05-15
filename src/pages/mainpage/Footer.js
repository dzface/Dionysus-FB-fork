import styled from "styled-components";
import { Link } from "react-router-dom";
import naverblog from "../../img/mainpageimg/details/naverblog-icon.png";
import instargram from "../../img/mainpageimg/details/instargram-icon.png";
import facebook from "../../img/mainpageimg/details/facebook-icon.png";
import youtube from "../../img/mainpageimg/details/youtube-icon.png";
import telicon from "../../img/mainpageimg/details/tel-icon.png";
//Footer StyledComponent
const FooterBody = styled.footer`
  width: 100vw;
  height: 20vh;
  background-color: rgba(0, 0, 0, 0.8);
  border: none;
  position: absolute;
  display: flex;
  bottom: 0;
  /* display: none; */
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
  background-color: transparent;
  & > .footertext {
    font-size: 0.5;
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
  background-color: transparent;
  & > .footertext {
    font-size: 0.5;
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

const Footer = () => {
  return (
    <FooterBody>
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
          <p>(주)디오니소스 대표이사: 이경섭 사업자등록번호:106-81-98868 </p>
          <p>
            주소: 서울시 용산구 한강대로 366, A동176호 개인정보관리 책임자:
            박성진 청소년보호책임자: 김세호 발행,편집인: 강인구
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
    </FooterBody>
  );
};

export default Footer;
