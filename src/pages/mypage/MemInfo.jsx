import styles from "../../style/mypagestyle/MemInfo.module.css";
import BackButton from "../loginpage/BackButton";
import { useState, useEffect } from "react";
import AxiosApi from "../../api/AxiosApi";
import { useNavigate } from "react-router-dom";
import LoginCheckComponent from "../loginpage/LoginCheckComponent";
import ReactModal from "react-modal";
import ModalApi from "../../api/ModalApi";
ReactModal.setAppElement("#root");

const MemInfo = () => {
  const [member, setMember] = useState("");
  const [user_id, setUser_id] = useState("");
  const [user_pw, setUser_pw] = useState("");
  const [passwordError, setPasswordError] = useState();
  const [user_name, setUser_name] = useState("");
  const [user_nick, setUser_nick] = useState("");
  const [user_phone, setUser_phone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [user_address, setUser_address] = useState("");

  // 유효성 검사
  const [isPassword, setIsPassword] = useState(true);
  const [isPhone, setIsPhone] = useState(true);
  // 기본상태 입력(숨김)
  const [SuccessModalOpen, setSuccessModalOpen] = useState(false);
  const handleSuccessCloseModal = () => {
    setSuccessModalOpen(false);
    navigate("/mypage"); // Navigate to the home page or any other page
  };

  const navigate = useNavigate();

  useEffect(() => {
    const memberInfo = async () => {
      try {
        const rsp = await AxiosApi.memberSelect(
          sessionStorage.getItem("user_id")
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
  }, []);

  const handleSubmit = async () => {
    try {
      await AxiosApi.memberUpdate(
        user_pw,
        user_name,
        user_nick,
        user_phone,
        user_address,
        user_id
      );
      sessionStorage.setItem("user_pw", user_pw);
      sessionStorage.setItem("user_name", user_name);
      sessionStorage.setItem("user_nick", user_nick);
      sessionStorage.setItem("user_phone", user_phone);
      sessionStorage.setItem("user_address", user_address);
      setSuccessModalOpen(true); // Show success modal
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

    if (!newPw) {
      setPasswordError("");
      setUser_pw(member.newPw);
      setIsPassword(true);
      return; // 입력이 없으면 이후 코드 실행 안 함
    }
    // 비밀번호 검증 함수
    if (validatePassword(newPw)) {
      setPasswordError("");
      setIsPassword(true);
    } else {
      setPasswordError("영어와 숫자를 포함한 8글자 이상이어야 합니다.");
      setIsPassword(false);
    }
  };
  // 비밀번호 유효성 검증 함수
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  const onChangeNick = (e) => {
    const newNick = e.target.value;
    setUser_nick(newNick);
  };
  const onChangePhone = (e) => {
    const newPhone = e.target.value;
    // 하이픈을 제거하고 숫자만 남김
    const formattedPhone = newPhone.replace(/-/g, "");
    setUser_phone(member.user_phone);
    // 입력이 없는 경우
    if (!newPhone) {
      setPhoneError("");
      setUser_phone(member.user_phone);
      setIsPhone(true);
      return; // 입력이 없으면 이후 코드 실행 안 함
    }
    // 유효성 검사
    if (validatePhone(formattedPhone)) {
      setPhoneError("");
      setIsPhone(true);
    } else {
      setPhoneError("올바른 전화번호를 입력하세요.");
      setIsPhone(false);
      if (validatePhone(member.user_phone) == null) {
        setIsPhone(true);
      }
    }

    setUser_phone(formattedPhone);
  };
  // 전화번호 유효성 검사 함수
  const validatePhone = (phone) => {
    const regex = /^01[016789]\d{8}$/;
    return regex.test(phone);
  };

  const onChangeAddress = (e) => {
    const newAdress = e.target.value;
    setUser_address(newAdress);
  };

  const isFormValid = isPassword && isPhone;

  return (
    <>
      <div className={styles.container}>
        <LoginCheckComponent></LoginCheckComponent>
        <BackButton />
        <div className={styles.box}>
          <p className={styles.title}>정보수정</p>
          <input
            type="text"
            name="user_id"
            placeholder={member.user_id}
            disabled
            className={styles.idInput}
          />

          <input
            type="text"
            name="user_pw"
            onChange={onChangePw}
            placeholder={member.user_pw}
            defaultValue={member.user_pw}
          />
          {passwordError && (
            <p
              style={{
                color: "red",
                marginTop: "-28px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {passwordError}
            </p>
          )}
          <input
            type="text"
            name="user_name"
            onChange={onChangeName}
            placeholder={member.user_name}
            defaultValue={member.user_name}
          />
          <input
            type="text"
            name="user_jumin"
            placeholder={member.user_jumin}
            disabled
            className={styles.juminInput}
          />
          <input
            type="text"
            name="user_nick"
            onChange={onChangeNick}
            placeholder={member.user_nick}
            defaultValue={member.user_nick}
          />
          <input
            type="text"
            name="user_phone"
            onChange={onChangePhone}
            placeholder={member.user_phone}
            defaultValue={member.user_phone}
          />
          {phoneError && (
            <p
              style={{
                color: "red",
                marginTop: "-28px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {phoneError}
            </p>
          )}
          <input
            type="text"
            name="user_address"
            onChange={onChangeAddress}
            placeholder={member.user_address}
            defaultValue={member.user_address}
          />
          {/* <p className={styles.caution}></p> */}
          <div
            className={styles.finalCheck}
            style={{
              cursor: isFormValid ? "pointer" : "not-allowed",
              backgroundColor: isFormValid ? "rgba(0, 0, 0, 0.6)" : "grey",
            }}
            onClick={isFormValid ? handleSubmit : null}
          >
            수정
          </div>
        </div>
      </div>
      <ModalApi.SuccessModal
        isOpen={SuccessModalOpen}
        onClose={handleSuccessCloseModal}
        modalTitle={"회원 정보 수정"}
        modalText={"수정되었습니다."}
      />
    </>
  );
};
export default MemInfo;
