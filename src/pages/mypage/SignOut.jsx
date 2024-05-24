import styles from "../../style/mypagestyle/SignOut.module.css";
import BackButton from "../loginpage/BackButton";
import AxiosApi from "../../api/AxiosApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();
  const [user_name, setUser_name] = useState("");
  const [user_jumin, setUser_jumin] = useState("");
  const [member, setMember] = useState([]);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    const membersInfo = async () => {
      // 로컬스토리지에서 로그인한 사용자 정보 가져오기
      const loginUserEmail = sessionStorage.getItem("user_id");
      try {
        const rsp = await AxiosApi.memberSelect(loginUserEmail); // 회원 정보 가져오기
        setMember(rsp.data);
        setUser_name(rsp.data.user_name);
        setUser_jumin(rsp.data.user_jumin);
      } catch (e) {
        console.log(e);
      }
    };
    membersInfo();
  }, []);

  useEffect(() => {
    const sessionUserName = sessionStorage.getItem("user_name");
    const sessionUserJumin = sessionStorage.getItem("user_jumin");

    if (user_name === sessionUserName && user_jumin === sessionUserJumin) {
      setIsMatching(true);
    } else {
      setIsMatching(false);
    }
  }, [user_name, user_jumin]);

  const memberDelete = async () => {
    try {
      const sessionUserName = sessionStorage.getItem("user_name");
      const sessionUserJumin = sessionStorage.getItem("user_jumin");

      if (user_name === sessionUserName && user_jumin === sessionUserJumin) {
        const isMemberValid = await AxiosApi.memberCheck(user_name, user_jumin);
        if (isMemberValid) {
          await AxiosApi.memberDelete(user_name, user_jumin);
          sessionStorage.clear();
          alert("회원 탈퇴 되었습니다.");
          navigate(`/`);
        } else {
          alert("회원 정보를 확인하는 데 실패했습니다.");
        }
      } else {
        alert("이름과 주민등록번호가 일치하지 않습니다.");
        setIsMatching(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.box}>
        <p className={styles.title}>회원탈퇴</p>
        <div className={styles.imageItem}></div>
        <input
          type="text"
          placeholder="이름"
          // value={user_name}
          onChange={(e) => setUser_name(e.target.value)}
        />
        <input
          type="text"
          placeholder="주민등록번호"
          // value={user_jumin}
          onChange={(e) => setUser_jumin(e.target.value)}
        />
        <p></p>
        <div
          className={styles.finalCheck}
          onClick={memberDelete}
          // style={{ cursor: isMatching ? "pointer" : "not-allowed" }}
        >
          탈퇴
        </div>
      </div>
    </div>
  );
};

export default SignOut;
