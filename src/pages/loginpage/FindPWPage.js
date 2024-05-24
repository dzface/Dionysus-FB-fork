import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/AxiosApi";
import styles from "../../style/loginstyle/FindPWPage.module.css";
import BackButton from "./BackButton";
import ReactModal from "react-modal"; // 모달 적용부분
import ModalApi from "../../api/ModalApi";
ReactModal.setAppElement("#root"); 

const FindPWPage = () => {
  const navigate = useNavigate();
  // 입력단
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [jumin, setJumin] = useState("");
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

  // 오류메시지 로직 단
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    console.log(email)
  };
  const onChangeUserName = (e) => {
    setUserName(e.target.value);
    console.log(userName)
  };
  const onChangeJumin = (e) => {
    setJumin(e.target.value);
    console.log(jumin)
  };

  // 찾기 결과 출력단
  const [userPw, setUserPw] = useState("");

  // 비번찾기버튼 이벤트 처리 및 결과 출력
  const findPwButton = async (e) => {
    const input_email = document.getElementById("email").value;
    const input_name = document.getElementById("user_name").value;
    const input_jumin = document.getElementById("jumin").value;

    try {
      const showUserPw = await AxiosApi.findPwResult(email, userName, jumin);
      setUserPw(showUserPw);
      if (showUserPw === "") {
        setFailModalOpen(true);
        setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
      } else {
        setSuccessModalOpen(true);
      }
      console.log(showUserPw);
    } catch (error) {
      if (error.response) {
        // 서버가 응답했지만 상태 코드가 2xx 범위를 벗어나는 경우
        switch (error.response.status) {
          case 400:
            setModalContent("잘못된 요청입니다. 입력 값을 확인해주세요.");
            break;
          case 401:
            setModalContent(
              <>
                인증에 실패했습니다.<br />
                자격인증 없음
              </>
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
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <BackButton />
        <p className={styles.title}>비밀번호 찾기</p>
        <div className={styles.imageItem}></div>
        <input id="email" type="text" placeholder="이메일" onChange={onChangeEmail}/>
        <input id="user_name" type="text" placeholder="이름" onChange={onChangeUserName}/>
        <input id="jumin" type="text" placeholder="주민등록번호" onChange={onChangeJumin}/>
        <p></p>
        <div className={styles.finalCheck} onClick={findPwButton}>
          찾기
        </div>
      </div>
      <ModalApi.SuccessModal isOpen={SuccessModalOpen} onClose={handleSuccessCloseModal} modalTitle={"비밀번호 찾기 결과"} modalText={`비밀번호는 ${userPw} 입니다.`}/>
      <ModalApi.FailModal isOpen={FailModalOpen} onClose={handleFailCloseModal} modalTitle={"비밀번호 찾기 실패"} modalText={modalContent}/>
    </div>
  );
};
export default FindPWPage;
