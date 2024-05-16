import "../../style/mypagestyle/MypageStyle.scss";
import { Link } from "react-router-dom";

const Mypage = () => {
  return (
    <body>
      <div className="container">
        <div className="contents">
          <div className="mem">
            <div className="meminfo1">
              <div className="profile">
                <div className="person">
                  <div className="img"></div>
                  <p>
                    <span>홍길동</span>님 반갑습니다!
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
                    <button>로그아웃</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="meminfo2">
              <p>아이디 :</p>
              <p>주소 : </p>
              <p>전화번호 :</p>
            </div>
          </div>

          <h2>찜 목록</h2>
          <hr />

          <div className="jjimcontainer">
            <div className="alinfo">
              <div className="alimg"></div>
              <div className="alinfo1">
                <p>제조사</p>
                <p>술 이름</p>
                <div className="alinfo2">
                  <p>국가</p>
                  <p>도수</p>
                  <p>용량</p>
                  <p>가격</p>
                </div>
                <div className="alinfo3">
                  <p>별점</p>
                  <button className="seereview">리뷰확인 ▼</button>
                </div>
              </div>
              <div className="reviewbox">
                Review
                <textarea name="reviewbox">안녕하세요 리뷰입니다</textarea>
                <button className="more">더보기 ▼</button>
              </div>

              <div className="heart">♥</div>
            </div>
          </div>

          <h2>후기</h2>
          <hr />

          <div className="jjimcontainer">
            <div className="alinfo">
              <div className="alimg"></div>
              <div className="alinfo1">
                <p>제조사</p>
                <p>술 이름</p>
                <div className="alinfo2">
                  <p>국가</p>
                  <p>도수</p>
                  <p>용량</p>
                  <p>가격</p>
                </div>
                <div className="alinfo3">
                  <p>별점</p>
                  <button className="seereview">리뷰확인 ▼</button>
                </div>
              </div>
              <div className="reviewbox">
                Review
                <textarea name="reviewbox">안녕하세요 리뷰입니다</textarea>
                <button className="more">더보기 ▼</button>
              </div>

              <div className="heart">♥</div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Mypage;
