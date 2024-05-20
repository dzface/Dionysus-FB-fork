import styles from "../../style/mypagestyle/SignOut.module.css";
import BackButton from "../loginpage/BackButton";
import AxiosApi from "../../api/AxiosApi";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();
  const [delName, setDelName] = useState("");
  const [delJumin, setDelJumin] = useState("");
  const [members, setMembers] = useState("");
  const [delId, setDelId] = useState("");
  const [isCurrentUser, setIsCurrentUser] = useState(false); // 로그인유저 확인
  // const context = useContext(UseContext);
  // const { setDelId } = context;
  useEffect(() => {
    const membersFunc = async () => {
      const rsp = await AxiosApi.memberCheck(delName, delJumin);
      console.log(rsp.data);
      setMembers(rsp.data);
    };
    membersFunc();
  }, []);
  const onMemberDelete = async (e) => {
    e.preventDefault();
    const rsp = await AxiosApi.memberDelete(delId);
    try {
      const rsp = await AxiosApi.memberDelete(delId);
      if (rsp.status === 200) {
        setDelName(delName);
        setDelJumin(delJumin);
        setMembers(rsp.data);
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
          value={delName}
          onChange={(e) => setDelName(e.target.value)}
        />
        <input
          type="text"
          placeholder="주민등록번호"
          value={delJumin}
          onChange={(e) => setDelJumin(e.target.value)}
        />
        <p></p>
        <div className={styles.finalCheck} onClick={onMemberDelete}>
          탈퇴
        </div>
      </div>
    </div>
  );
};
export default SignOut;
