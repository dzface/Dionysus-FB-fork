import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import styles from "../../style/loginstyle/FindPWPage.module.css";
import BackButton from "./BackButton";

const FindPWPage = () => {
  const navigate = useNavigate();
  // 입력단
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [jumin , setJumin] = useState("");
  
  const findIdButton = async (e) => {
    const input_name = document.getElementById("user_name").value;
    const input_jumin = document.getElementById("jumin").value
    try {
      const showUserId = await AxiosApi.findIdResult(userName, jumin);
      setEmail(showUserId);
      console.log(showUserId);
    } catch (error) {
      console.error("Failed to find user ID:", error);
      // 오류 처리 로직 추가
    }
  }
  const findPwButton = async (e) =>{


  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <BackButton />
        <p className={styles.title}>비밀번호 찾기</p>
        <div className={styles.imageItem}></div>
        <input type="text" placeholder="이메일" />
        <input type="text" placeholder="이름" />
        <input type="text" placeholder="주민등록번호" />
        <p></p>
        <div className={styles.finalCheck} onClick={findPwButton}>찾기</div>
      </div>
    </div>
  );
};
export default FindPWPage;
