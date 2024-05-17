import { useState, useEffect } from "react";
import styles from "../../style/loginstyle/SignupPage.module.css";
import BackButton from "./BackButton";
import axios from "axios";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [jumin, setJumin] = useState("");
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    console.log(email);
  }, [email]);

  const regist = () => {
    axios
      .post("http://localhost:8111/users/signup", {
        id: "email",
        pw: "password",
        name: "userName",
        jumin: "jumin",
        nick: "nickName",
        phone: "phone",
        address: "address",
      })
      .then((response) => {
        // Handle success.
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
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
