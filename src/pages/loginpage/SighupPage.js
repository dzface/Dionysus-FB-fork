import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../style/loginstyle/SignupPage.module.css";
import BackButton from "./BackButton";
import axios from "axios";
import AxiosApi from "../../api/AxiosApi";
import { documentId } from "firebase/firestore";

const SignupPage = () => {
  const navigate = useNavigate();
  //입력단
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [jumin, setJumin] = useState("");
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // 유효성 검사단 (이메일, 주민등록 외 다른 입력값은 미입력 유무만 확인)
  const [isEmail, setIsEmail] = useState(false); //이메일 중복확인 후 상태반환
  const [isPassword, setIsPassword] = useState(false);
  const [isUserName, setIsUserName] = useState(false);
  const [isJumin, setIsJumin] = useState(false); // 주민번호 중복확인 후 결과 반환
  const [isNickName, setIsNickName] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isAddress, setIsAddress] = useState(false);

  // 오류 메시지
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [juminError, setJuminError] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");

  // 회원 가입 여부 DB 확인
  const memberRegCheck = async (email) => {
    try {
      const resp = await AxiosApi.memberRegCheck(email);
      console.log("가입 가능 여부 확인 : ", resp.data);

      if (resp.data) {
        setEmailError("✔️");
        setIsEmail(true);
      } else {
        setEmailError("중복된 이메일 입니다.");
        setIsEmail(false);
      }
    } catch (error) {
      console.log("아씨팔 에러");
    }
  };
  // 주민등록번호 DB 등록여부 확인
  const juminRegCheck = async (jumin) => {
    try {
      const resp = await AxiosApi.juminRegCheck(jumin);
      console.log("가입 가능 여부 확인 : ", resp.data);

      if (resp.data) {
        setJuminError("✔️");
        setIsJumin(true);
      } else {
        setJuminError("이미 가입된 주민등록번호 입니다.");
        setIsJumin(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 오류메시지 로직 단
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // 이메일 입력 정규식
    if (!emailRegex.test(e.target.value)) {
      // 입력값이 정규식에 만족하지 않으면~
      setEmailError("이메일 형식이 올바르지 않습니다.");
      setIsEmail(false);
    } else {
      setEmailError("✔️");
      setIsEmail(true);
      memberRegCheck(e.target.value); //DB에 중복 이메일 확인
    }
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    const passwordRegex = /^[A-Za-z0-9]{4,10}$/;
    if (!passwordRegex.test(e.target.value)) {
      setPasswordError(
        "비밀번호 형식이 올바르지 않습니다. (숫자, 영어 조합 10자리 이하)"
      );
      setIsPassword(false);
    } else {
      setPasswordError("✔️");
      setIsPassword(true);
    }
  };
  const onChangeUserName = (e) => {
    setUserName(e.target.value);
    setIsUserName(true);
  };
  const onChangeJumin = (e) => {
    setJumin(e.target.value);
    const juminRegex = /^\d{13}$/; // 주민등록번호 입력 정규식
    if (!juminRegex.test(e.target.value)) {
      // 입력값이 정규식에 만족하지 않으면~
      setJuminError("입력값이 올바르지 않습니다.(- 없이 숫자 13자리)");
      setIsJumin(false);
    } else {
      setJuminError("✔️");
      setIsJumin(true);
      juminRegCheck(e.target.value); //DB에 중복 주민등록번호 확인
    }
  };
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
    setIsNickName(true);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
    const phoneRegex = /^010\d{8}$/;
    if (!phoneRegex.test(e.target.value)) {
      setPhoneError("입력값이 올바르지 않습니다.");
      setIsPhone(false);
    } else {
      setPhoneError("✔️");
      setIsPhone(true);
    }
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
    setIsAddress(true);
  };
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
  // 모든 필드의 유효성 검사를 통과했는지 확인
  const isFormValid =
    isEmail &&
    isPassword &&
    isUserName &&
    isJumin &&
    isNickName &&
    isPhone &&
    isAddress;

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <BackButton />
        <p className={styles.title}>회원가입</p>
        <input
          type="text"
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
        />
        <div id={styles.hint}>
          {email.length > 0 && (
            <span className={isEmail ? styles.success : styles.error}>
              {emailError}
            </span>
          )}
        </div>
        <input
          type="text"
          placeholder="비밀번호"
          value={password}
          onChange={onChangePassword}
        />
        <div id={styles.hint}>
          {password.length > 0 && (
            <span className={isPassword ? styles.success : styles.error}>
              {passwordError}
            </span>
          )}
        </div>
        <input
          type="text"
          placeholder="이름"
          value={userName}
          onChange={onChangeUserName}
        />
        <div></div>
        <input
          type="text"
          placeholder="주민등록번호"
          value={jumin}
          onChange={onChangeJumin}
        />
        <div id={styles.hint}>
          {jumin.length > 0 && (
            <span className={isJumin ? styles.success : styles.error}>
              {juminError}
            </span>
          )}
        </div>
        <input
          type="text"
          placeholder="닉네임"
          id="nickNameVaildation"
          value={nickName}
          onChange={onChangeNickName}
        />
        <div></div>
        <input
          type="text"
          placeholder="핸드폰 번호"
          id=""
          value={phone}
          onChange={onChangePhone}
        />
        <div id={styles.hint}>
          {phone.length > 0 && (
            <span className={isPhone ? styles.success : styles.error}>
              {phoneError}
            </span>
          )}
        </div>
        <input
          type="text"
          placeholder="주소"
          id=""
          value={address}
          onChange={onChangeAddress}
        />
        <div id={styles.hint}>
          {address.length > 0 && (
            <span className={isAddress ? styles.success : styles.error}>
              {addressError}
            </span>
          )}
        </div>
        <p className={styles.caution}></p>
        <div
          className={styles.finalCheck}
          style={{
            cursor: isFormValid ? "pointer" : "not-allowed",
            backgroundColor: isFormValid ? "rgba(0, 0, 0, 0.6)" : "grey",
          }}
          onClick={isFormValid ? regist : null}
        >
          가입
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
