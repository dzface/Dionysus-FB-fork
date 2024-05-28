import "../../style/mypagestyle/MypageStyle.scss";
import { Link } from "react-router-dom";
import ReviewItem from "./Common/ReviewItem";
import JjimItem from "./Common/JjimItem";
import ImageUploader from "../../firebase/profileupload/ImageUploader";
import LoginCheckComponent from "../loginpage/LoginCheckComponent";
import styled from "styled-components";
import { useState } from "react";

const ProfileDiv = styled.div`
  width: 130px;
  height: 130px;
  position: relative;

  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .uploaded-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;
const Mypage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const profileurl = sessionStorage.getItem("profile_url");
  const logout = () => {
    sessionStorage.clear();
  };

  //전화번호 - 넣는 컴포넌트
  const PhoneNumberWithHyphen = ({ phoneNumber }) => {
    const formatPhoneNumber = (phoneNumber) => {
      phoneNumber = phoneNumber.replace(/\D/g, ""); // Remove all non-numeric characters
      if (phoneNumber.length === 11) {
        return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      } else if (phoneNumber.length === 10) {
        if (phoneNumber.startsWith("02")) {
          return phoneNumber.replace(/(\d{2})(\d{4})(\d{4})/, "$1-$2-$3");
        } else {
          return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        }
      }
      return phoneNumber;
    };

    const formattedPhoneNumber = formatPhoneNumber(phoneNumber);

    return <p>전화번호: {formattedPhoneNumber}</p>;
  };
  const userid = sessionStorage.getItem("user_id");
  const username = sessionStorage.getItem("user_name");
  return (
    <div>
      {/* <LoginCheckComponent> */}
      <div className="container">
        <div className="contents">
          <div className="mem">
            <div className="meminfo1">
              <div className="profile">
                <div className="person">
                  <ProfileDiv>
                    <div className="img"></div>
                    {profileurl && (
                      <img
                        src={profileurl}
                        alt="uploaded"
                        className="uploaded-img"
                      />
                    )}
                    <ImageUploader setImageUrl={setImageUrl} />
                  </ProfileDiv>
                  <p>
                    <span>{username}</span>님 반갑습니다!
                  </p>
                </div>
                <div className="btn">
                  <Link to="/MemInfo">
                    <button>정보수정</button>
                  </Link>
                  <Link to="/SignOut">
                    <button>회원탈퇴</button>
                  </Link>
                  <Link to="/">
                    <button onClick={logout}>로그아웃</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="meminfo2">
              <p>아이디 : {sessionStorage.getItem("user_id")}</p>
              <p>주소 : {sessionStorage.getItem("user_address")}</p>
              <PhoneNumberWithHyphen
                phoneNumber={sessionStorage.getItem("user_phone")}
              />
            </div>
          </div>
          <h2>찜 목록</h2>
          <hr />
          <JjimItem />
          <h2>후기</h2>
          <hr />
          <ReviewItem />
        </div>
      </div>
      {/* </LoginCheckComponent> */}
    </div>
  );
};

export default Mypage;
