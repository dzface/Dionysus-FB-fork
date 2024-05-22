import styles from "../../style/mypagestyle/MemInfo.module.css";
import BackButton from "../loginpage/BackButton";
import { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi";
import { Link, useNavigate } from "react-router-dom";

const MemInfo = () => {
  const [member, setMember] = useState("");
  const [user_id, setUser_id] = useState("");
  const [user_pw, setUser_pw] = useState("");
  const [user_name, setUser_name] = useState("");
  const user_jumin = localStorage.getItem("user_jumin");
  const [user_nick, setUser_nick] = useState("");
  const [user_phone, setUser_phone] = useState("");
  const [user_address, setUser_address] = useState("");
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [currentInfo, setCurrentInfo] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const memberInfo = async () => {
      try {
        const rsp = await AxiosApi.memberSelect(
          localStorage.getItem("user_id")
        ); // 회원 정보 가져오기
        setMember(rsp.data);
        setUser_id(rsp.data.user_id);
        setUser_pw(rsp.data.user_pw);
        setUser_name(rsp.data.user_name);
        setUser_nick(rsp.data.user_nick);
        setUser_phone(rsp.data.user_phone);
        setUser_address(rsp.data.user_address);
      } catch (e) {
        console.log(e);
      }
    };
    memberInfo();
    // 로컬스토리지에서 로그인한 사용자 정보 가져 오기
    const loginUserEmail = localStorage.getItem("user_id");
    // 로그인한 사용자와 글쓴이가 같은지 비교
    if (loginUserEmail === user_id) {
      setIsCurrentUser(true);
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const rsp = await AxiosApi.memberUpdate(
        user_pw,
        user_name,
        user_nick,
        user_phone,
        user_address,
        user_id
      );
      localStorage.setItem("user_pw", user_pw);
      localStorage.setItem("user_name", user_name);
      localStorage.setItem("user_nick", user_nick);
      localStorage.setItem("user_phone", user_phone);
      localStorage.setItem("user_address", user_address);
      navigate("/mypage");
    } catch (e) {
      console.log(e);
    }
  };
  const onChangeName = (e) => {
    const newName = e.target.value;
    setUser_name(newName);
  };
  const onChangePw = (e) => {
    const newPw = e.target.value;
    setUser_pw(newPw);
  };
  const onChangeNick = (e) => {
    const newNick = e.target.value;
    setUser_nick(newNick);
  };
  const onChangePhone = (e) => {
    const newPhone = e.target.value;
    setUser_phone(newPhone);
  };
  const onChangeAddress = (e) => {
    const newAdress = e.target.value;
    setUser_address(newAdress);
  };

  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.box}>
        <p className={styles.title}>정보수정</p>
        <input
          type="text"
          name="user_id"
          placeholder={localStorage.getItem("user_id")}
        />

        <input
          type="text"
          name="user_pw"
          onChange={onChangePw}
          placeholder={localStorage.getItem("user_pw")}
        />
        <input
          type="text"
          name="user_name"
          onChange={onChangeName}
          placeholder={localStorage.getItem("user_name")}
        />
        <input
          type="text"
          name="user_jumin"
          placeholder={localStorage.getItem("user_jumin")}
        />
        <input
          type="text"
          name="user_nick"
          onChange={onChangeNick}
          placeholder={localStorage.getItem("user_nick")}
        />
        <input
          type="text"
          name="user_phone"
          onChange={onChangePhone}
          placeholder={localStorage.getItem("user_phone")}
        />
        <input
          type="text"
          name="user_address"
          onChange={onChangeAddress}
          placeholder={localStorage.getItem("user_address")}
        />
        <p className={styles.caution}></p>
        <div className={styles.finalCheck} onClick={handleSubmit}>
          수정
        </div>
      </div>
    </div>
  );
};
export default MemInfo;
