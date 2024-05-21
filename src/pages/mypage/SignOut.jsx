import styles from "../../style/mypagestyle/SignOut.module.css";
import BackButton from "../loginpage/BackButton";
import AxiosApi from "../../api/AxiosApi";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SignOut = () => {
  const navigate = useNavigate();
  const [user_name, setUser_name] = useState("");
  const [user_jumin, setUser_Jumin] = useState("");
  const [member, setMember] = useState([]);
  const [user_id, setUser_Id] = useState("");
  // const [isCurrentUser, setIsCurrentUser] = useState(false); // 로그인유저 확인
  // const context = useContext(UseContext);
  // const { setDelId } = context;

  useEffect(() => {
    const membersInfo = async () => {
      try {
        const rsp = await AxiosApi.memberSelect("user1@naver.com"); // 회원 정보 가져오기
        setMember(rsp.data);
        setUser_name(rsp.data.user_name);
        setUser_Jumin(rsp.data.user_jumin);
        // setDelId(rsp.data.user_id);
        console.log(user_name);
        console.log(user_jumin);
      } catch (e) {
        console.log(e);
      }
    };
    membersInfo();
    // // 로컬스토리지에서 로그인한 사용자 정보 가져 오기
    // const loginUserEmail = localStorage.getItem("user_id");
    // // 로그인한 사용자와 글쓴이가 같은지 비교
    // if (loginUserEmail === user_id) {
    // setIsCurrentUser(true);
    // }
  }, [member.user_id]);

  const memberDelete = async () => {
    try {
      // const isMemberValid = await AxiosApi.memberCheck(delName, delJumin);
      // if (isMemberValid === true) {
      const rsp = await AxiosApi.memberDelete(user_name, user_jumin);
      setUser_Jumin(rsp);
      // navigate(`/mypage`);
      // }
    } catch (e) {
      console.log(e);
    }
  };

  // const onClick = (e) => {
  //   memberDelete(e);
  //   navigate(`/mypage`);
  // };

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.box}>
        <p className={styles.title}>회원탈퇴</p>

        <div className={styles.imageItem}></div>

        <input
          type="text"
          placeholder="이름"
          value={user_name}
          onChange={(e) => setUser_name(e.target.value)}
        />
        <input
          type="text"
          placeholder={user_jumin}
          value={user_jumin}
          onChange={(e) => setUser_Jumin(e.target.value)}
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
