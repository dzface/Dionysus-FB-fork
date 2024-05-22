import { useState } from "react";
import styles from "../../style/loginstyle/FindIDPage.module.css";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import { Axios } from "axios";
const FindIDPage = () => {
  const navigate = useNavigate();
  // 입력단
  const [userName, setUserName] = useState("");
  const [jumin , setJumin] = useState("");
  //유효성 검사단
  const [isUserName, setIsUserName] = useState(false);
  const [isJumin, setIsJumin] = useState(false);
  //오류 메시지
  const [userNameError, setUserNameError] = useState("");
  const [juminError, setJuminError] = useState("");
  // 찾기결과 출력단
  const[userId, setUserId] = useState("");
  // 아이디찾기 버튼 이벤트 및 결과 출력
  const findIdButton = async (e) => {
    const input_name = document.getElementById("user_name").value;
    const input_jumin = document.getElementById("jumin").value
    try {
      const showUserId = await AxiosApi.findIdResult(userName, jumin);
      setUserId(showUserId);
      console.log(showUserId);
    } catch (error) {
      console.error("Failed to find user ID:", error);
      // 오류 처리 로직 추가
    }
  }
  // 오류메시지 로직 단
  const onChangeUserName = (e) => {
    setUserName(e.target.value);
    const userNameRegex = /^[가-힣]{1,5}$/;
    if (!userNameRegex.test(e.target.value)) {
      setUserNameError("입력값이 올바르지 않습니다. (한글 5글자 이하)");
      setIsUserName(false);
    } else {
      setUserNameError("✔️")
      setIsUserName(true);
    }
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
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <BackButton />
        <p className={styles.title}>아이디 찾기</p>
        <div className={styles.imageItem}></div>
        <input type="text" id="user_name" placeholder="이름" onChange={onChangeUserName}/>
        <div id={styles.hint}>
          {userName.length > 0 && (
            <span className={isUserName ? styles.success : styles.error}>
              {userNameError}
            </span>
          )}</div>
        <input type="text" id="jumin" placeholder="주민등록번호" onChange={onChangeJumin}/>
        <div id={styles.hint}>
          {jumin.length > 0 && (
            <span className={isJumin ? styles.success : styles.error}>
              {juminError}
            </span>
          )}
        </div>
        <div id="caution" className={styles.caution}></div>
        <div className={styles.finalCheck} onClick={findIdButton} 
        style={{
          cursor: isUserName && isJumin ? "pointer" : "not-allowed",
        }}>찾기</div>
      </div>
    </div>
  );
};
export default FindIDPage;
