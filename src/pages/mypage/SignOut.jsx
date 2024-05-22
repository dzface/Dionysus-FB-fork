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

  useEffect(() => {
    const membersInfo = async () => {
      // // 로컬스토리지에서 로그인한 사용자 정보 가져 오기
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

  const memberDelete = async () => {
    try {
      const isMemberValid = await AxiosApi.memberCheck(user_name, user_jumin);
      if (isMemberValid) {
        const rsp = await AxiosApi.memberDelete(user_name, user_jumin);
        // setUser_jumin(rsp.data.user_jumin);
        // setUser_name(rsp.data.user_name);

        sessionStorage.setItem("user_pw", "");
        sessionStorage.setItem("user_name", "");
        sessionStorage.setItem("user_nick", "");
        sessionStorage.setItem("user_phone", "");
        sessionStorage.setItem("user_address", "");
        sessionStorage.setItem("user_id", "");
        sessionStorage.setItem("user_jumin", "");

        navigate(`/`);
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
          placeholder={sessionStorage.getItem("user_name")}
          value={user_name}
          onChange={(e) => setUser_name(e.target.value)}
        />
        <input
          type="text"
          placeholder={sessionStorage.getItem("user_jumin")}
          value={user_jumin}
          onChange={(e) => setUser_jumin(e.target.value)}
        />
        <p></p>
        <div className={styles.finalCheck} onClick={memberDelete}>
          탈퇴
        </div>
      </div>
    </div>
  );
};
export default SignOut;
