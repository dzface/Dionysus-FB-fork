import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../img/mainpageimg/logo/logo1.jpeg";
import { GiHamburgerMenu, GiCancel } from "react-icons/gi";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../global/UserStore";
import traditional from "../../img/mainpageimg/background/traditional.jpg";
import beer from "../../img/mainpageimg/background/beer.jpg";
import wine from "../../img/mainpageimg/background/wine.jpg";
import wiskey from "../../img/mainpageimg/background/wiskey.jpg";
import { CiBeerMugFull } from "react-icons/ci"; // 맥주 icon
import { PiWineFill } from "react-icons/pi"; //와인 icon
import { IoMdWine } from "react-icons/io"; // 위스키 icon
import { FaWineBottle } from "react-icons/fa"; //전통주 icon
//사이드바 높이 조절을 위한 상수 선언
const topbarHeight = "30px";

//Header StyledComponent
const HeaderContainer = styled.header`
  width: 100vw;
  height: 15vh;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
//logoImg wrapping StyledComponent
const DivLogo = styled.div`
  height: 15vh;
  border: none;
  display: flex;
  align-items: center;
`;
//logoImg StyledComponent
const Logo = styled.div`
  width: 110px; /* 로고의 너비를 설정합니다 */
  height: 120px;
  background-image: ${({ logourl }) => `url(${logourl})`};
  border: none;
  border-radius: 20%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  &:hover {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
`;

//Header wrapping StyledComponent

const DivHeader = styled.div`
  width: 85vw;
  height: 15vh;
  border: none;
  display: flex;
  align-items: center;
`;
//Nav StyledComponent
const Nav = styled.nav`
  width: 78vw;
  height: 13vh;
  margin-left: 25vw;
  border: none;
  display: flex;

  @media (max-width: 1200px) {
    margin-left: 15vw;
  }

  @media (max-width: 900px) {
    margin-left: 10vw;
  }

  @media (max-width: 700px) {
    padding-left: 35vw;
  }
`;
//Header 안에 Item StyledComponent
const Item = styled.div`
  width: 9vw;
  height: 13vh;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
  @media (max-width: 900px) {
    width: 10vw;
  }

  @media (max-width: 700px) {
    display: none;
  }
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
  width: 90px;
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
`;
const SideBarBody = styled.div`
  width: 300px;
  height: calc(100vh - ${topbarHeight});
  position: fixed;
  top: ${topbarHeight};
  left: 0;
  background-color: #08403d;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.5);
  opacity: 0.7;
  z-index: 50;
  display: flex;
  flex-direction: column;
  transform: ${(props) =>
    props.isOpen ? "translateX(80vw)" : "translateX(100vw)"};
  transition: transform 0.4s ease;
`;
// 411%,512%
const ProfileDiv = styled.div`
  width: 300px;
  height: 150px;
  display: flex;
  & .profileImage {
    width: 100px;
    height: 100px;
  }
  & .divExitUser {
    width: 200px;
    height: 150px;
  }
  & .exit {
    width: 200px;
    height: 75px;
    display: flex;
    justify-content: end;
    padding: 10px;
  }
  & .user {
    width: 160px;
    height: 75px;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    margin: 2px 20px;
    line-height: 1.5;
  }
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
  &:hover {
    -webkit-transform: scale(1.3);
    transform: scale(1.3);
  }
`;
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 사이드바 메뉴 열기/닫기
  const context = useContext(UserContext);
  const { bgimg, setBgimgurl, name, pfimg } = context; // 컬러와 이름을 전역 상태 관리에서 가져 옴
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const [member, setMember] = useState("");
  const onClickLeft = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const backImgChange = (alcohol) => {
    setBgimgurl(alcohol);
  };
  // 회원 이름이 변경되면 서버에 회원 정보 조회해서 화면 업데이트
  // useEffect(() => {
  //   const getMember = async () => {
  //     try {
  //       const rsp = await AxiosApi.memberGetOne(email);
  //       setMember(rsp.data);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getMember();
  // }, [name, imgUrl]);
  return (
    <>
      <HeaderContainer>
        <DivLogo>
          <Link to="/">
            <Logo logourl={logo} />
          </Link>
        </DivLogo>
        <DivHeader>
          <Nav>
            <Item>
              <Link to="/recommend" style={{ textDecoration: "none" }}>
                <ItemFont>인기주류</ItemFont>
              </Link>
            </Item>
            <Item>
              <Link
                to="/traditional"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  backImgChange(traditional);
                }}
              >
                <ItemFont>전통주</ItemFont>
              </Link>
            </Item>
            <Item>
              <Link
                to="/wiskey"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  backImgChange(wiskey);
                }}
              >
                <ItemFont>위스키</ItemFont>
              </Link>
            </Item>
            <Item>
              <Link
                to="/wine"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  backImgChange(wine);
                }}
              >
                <ItemFont>와인</ItemFont>
              </Link>
            </Item>
            <Item>
              <Link
                to="/beer"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  backImgChange(beer);
                }}
              >
                <ItemFont>맥주</ItemFont>
              </Link>
            </Item>
            <SideWrapping>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <SignUpBtn>
                  <ItemFont>SignUp</ItemFont>
                </SignUpBtn>
              </Link>
              <SideBarBtn>
                {/* 햄버거를 눌렀을 경우 사이드바 열림*/}
                {!isMenuOpen && (
                  <GiHamburgerMenu
                    size={35}
                    color="white"
                    onClick={onClickLeft}
                  />
                )}
              </SideBarBtn>
              <SideBarBody
                isOpen={isMenuOpen}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
              >
                <ProfileDiv>
                  <div className="profileImage">
                    <ProfileImg>
                      <ProfileBtn>
                        <p>업로드</p>
                      </ProfileBtn>
                    </ProfileImg>
                  </div>
                  <div className="divExitUser">
                    {/* // 사이드바를 누를 경우 닫음 */}
                    <div className="exit">
                      {isMenuOpen && (
                        <GiCancel
                          size={35}
                          color="white"
                          onClick={onClickLeft}
                        />
                      )}
                    </div>
                    <div className="user">
                      <sapn>{member.name}</sapn>
                      <span>{member.email}</span>
                    </div>
                  </div>
                </ProfileDiv>
                <PrifileDiv2>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <BtnStyle>
                      <p>Sign Up</p>
                    </BtnStyle>
                  </Link>
                  <Link to="/mypage" style={{ textDecoration: "none" }}>
                    <BtnStyle>
                      <p>마이페이지</p>
                    </BtnStyle>
                  </Link>
                </PrifileDiv2>
                <SideMenuDiv>
                  <Link
                    to="/recommend"
                    style={{ textDecoration: "none" }}
                    className="sidemenu"
                  >
                    <p>인기주류</p>
                  </Link>
                </SideMenuDiv>
                <SideMenuDiv>
                  <Link
                    to="/traditional"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      backImgChange(traditional);
                    }}
                    className="sidemenu"
                  >
                    <p>
                      <FaWineBottle size={30} color="white" />
                      &nbsp;전통주
                    </p>
                  </Link>
                </SideMenuDiv>
                <SideMenuDiv>
                  <Link
                    to="/wiskey"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      backImgChange(wiskey);
                    }}
                    className="sidemenu"
                  >
                    <p>
                      <IoMdWine size={30} color="white" />
                      &nbsp;위스키
                    </p>
                  </Link>
                </SideMenuDiv>
                <SideMenuDiv>
                  <Link
                    to="/wine"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      backImgChange(wine);
                    }}
                    className="sidemenu"
                  >
                    <p>
                      <PiWineFill size={30} color="white" />
                      &nbsp;와인
                    </p>
                  </Link>
                </SideMenuDiv>
                <SideMenuDiv>
                  <Link
                    to="/beer"
                    style={{ textDecoration: "none" }}
                    onClick={() => {
                      backImgChange(beer);
                    }}
                    className="sidemenu"
                  >
                    <p>
                      <CiBeerMugFull size={30} color="white" />
                      &nbsp;맥주
                    </p>
                  </Link>
                </SideMenuDiv>
              </SideBarBody>
            </SideWrapping>
          </Nav>
        </DivHeader>
      </HeaderContainer>
    </>
  );
};

export default Header;
