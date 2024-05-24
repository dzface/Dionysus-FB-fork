import { useState } from "react";
import styles from "../../style/loginstyle/FindIDPage.module.css";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import { Axios } from "axios";
import ReactModal from "react-modal"; // 모달 적용부분
import ModalApi from "../../api/ModalApi";
ReactModal.setAppElement("#root"); 

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
  // 모달 내용
  const [SuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [FailModalOpen, setFailModalOpen] = useState(false);
  const [modalContent, setModalContent] =useState("")
  const handleSuccessCloseModal = () => { //모달 닫은 이후 핸들링
    setSuccessModalOpen(false);
    // navigate("/"); // Navigate to the home page or any other page
  };
  const handleFailCloseModal = () => {
    setFailModalOpen(false);
  };

  // 아이디찾기 버튼 이벤트 및 결과 출력
  const findIdButton = async (e) => {
    const input_name = document.getElementById("user_name").value;
    const input_jumin = document.getElementById("jumin").value
    try {
      const showUserId = await AxiosApi.findIdResult(userName, jumin);
      setUserId(showUserId);
      if (showUserId === "") {
        setFailModalOpen(true);
        setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
      } else {
        setSuccessModalOpen(true);
      }
      // console.log(showUserId);
    }catch (error) {
      if (error.response) {
        // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어나는 경우
        switch (error.response.status) {
          case 400:
            setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
            break;
          case 401:
            setModalContent(
              "잘못된 요청입니다. 입력 값을 확인해주세요."
            );
        console.log();
            break;
          case 403:
            setModalContent("접근 권한이 없습니다.");
            break;
          case 404:
            setModalContent("서버를 찾을 수 없습니다.");
            break;
          case 500:
            setModalContent("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            break;
          default:
            setModalContent(`오류가 발생했습니다: ${error.response.statusText}`);
        }
      } else if (error.request) {
        // 요청이 서버에 도달하지 못한 경우 (네트워크 오류 등)
        setModalContent("서버가 응답하지 않습니다.");
      } else {
        // 요청을 설정하는 중에 오류가 발생한 경우
        setModalContent(`오류가 발생했습니다: ${error.message}`);
      }
      setFailModalOpen(true);
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
      <ModalApi.SuccessModal isOpen={SuccessModalOpen} onClose={handleSuccessCloseModal} modalTitle={"아이디 찾기 결과"} modalText={`아이디는 ${userId} 입니다.`}/>
      <ModalApi.FailModal isOpen={FailModalOpen} onClose={handleFailCloseModal} modalTitle={"아이디 찾기 실패"} modalText={modalContent}/>
    </div>
  );
};
export default FindIDPage;
