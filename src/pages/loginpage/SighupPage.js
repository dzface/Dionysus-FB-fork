import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../style/loginstyle/SignupPage.module.css";
import BackButton from "./BackButton";
import axios from "axios";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [isDuplicateEmail, setisDuplicateEmail] = useState(false); //이메일 중복확인 후 상태반환
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [jumin, setJumin] = useState("");
  const [isDuplicateJumin, setIsDuplicateJumin] = useState(false); // 주민번호 중복확인 후 결과 반환
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  useEffect(() => { //이메일 입력 변경될 때 마다 재확인 
    if (email) {
      const timer = setTimeout(() => {
        axios
          .get("http://localhost:8111/users/check", {
            params: { USER_ID: email },
          })
          .then((response) => {
            // 응답이 false이면 중복 이메일, true이면 중복 아님
            if (response.data) {
              setisDuplicateEmail(true);
              console.log("중복 이메일 없음");
            } else {
              setisDuplicateEmail(false);
              alert("중복된 이메일입니다.");
            }
          })
          .catch((error) => {
            alert("중복된 이메일입니다.");
            console.log("중복 이메일 발견:", error.response);
          });
      }, 2000); // 수정 후 2초 경과 후 재조회
      return () => clearTimeout(timer);
    }
  }, [email]);

  useEffect(()=>{ // 이메일 입력 변경 시 재확인
    if (jumin) {
      const timer = setTimeout(()=>{
        axios.get("http://localhost:8111/users/jumin-check", {
          params:{USER_JUMIN: jumin},
        })
        .then((response)=>{
          if (response.data) {
            setIsDuplicateJumin(false);
            console.log("유효한 주민등록번호");
          } else {
            setIsDuplicateJumin(true);
            alert("이미 가입된 주민등록번호 입니다.");
          }
        })
      } , 2000);
    }
  }, [jumin]); // 주민등록번호 수정 시 유효성 확인


  const regist = () => {
    axios
      .post("http://localhost:8111/users/signup", {
        user_id: email,
        user_pw: password,
        user_name: userName,
        user_jumin: jumin,
        user_nick: nickName,
        user_phone: phone,
        user_address: address,
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        navigate("/");
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <BackButton />
        <p className={styles.title}>회원가입</p>
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log(setEmail(e.target.value));
          }}
        />
        <input
          type="text"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="이름"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="주민등록번호"
          value={jumin}
          onChange={(e) => {
            setJumin(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="닉네임"
          value={nickName}
          onChange={(e) => {
            setNickName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="핸드폰 번호"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="주소"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <p className={styles.caution}></p>
        <div className={styles.finalCheck} onClick={regist}>
          가입
        </div>
      
      </div>
    </div>
  );
};
export default SignupPage;
