import ReCAPTCHA from "react-google-recaptcha"; // 구글 recapcha 인증 AIP 임포트 스타일임포트보다 위에 작성해야함
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactModal from "react-modal"; // 모달 적용부분
import ModalApi from "../../api/ModalApi";
import styles from "../../style/loginstyle/loginpage.module.css";
ReactModal.setAppElement("#root");

const Captcha = ({ onVerify }) => {
  // recapcha 컴포넌트
  function onChange(value) {
    console.log("Captcha value:", value); // 인증 완료 후 토큰 값 콘솔에 출력
    onVerify(value); // 인증 완료 후 부모 컴포넌트에 값 전달
  }
  return (
    <div>
      <ReCAPTCHA
        sitekey="6Lde4OgpAAAAAOcM2qCr9rgVt_yDWl_6kCpDx7_G"
        onChange={onChange}
      />
    </div>
  );
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [caution, setCaution] = useState("");
  const [SuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [FailModalOpen, setFailModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate();
  const handleSuccessCloseModal = () => {
    //모달 닫은 이후 핸들링
    setSuccessModalOpen(false);
    navigate("/"); // Navigate to the home page or any other page
  };
  const handleFailCloseModal = () => {
    setFailModalOpen(false);
  };
  const [captchaValue, setCaptchaValue] = useState(""); // recaptcha 토큰을 저장하기 위한 state
  const [captchaVerified, setCaptchaVerified] = useState(false); // reCAPTCHA 인증 상태
  const API_KEY = "6Lde4OgpAAAAAOcM2qCr9rgVt_yDWl_6kCpDx7_G"; // 사이트키 등록

  useEffect(() => {
    checkInputs(email, password);
  }, [email, password]);

  const checkInputs = (inputEmail, inputPassword) => {
    if (inputEmail !== "" && inputPassword.length > 3) {
      setCaution("확인되었습니다.");
    } else {
      setCaution("값을 입력하세요.");
    }
  };

  const handleLogin = async () => {
    // 로그인 버튼클릭 이후 구현부분
    if (caution === "확인되었습니다.") {
      try {
        const response = await axios.post("http://localhost:8111/users/login", {
          USER_ID: email,
          USER_PW: password,
        });
        // Handle success.
        const user = response.data[0];
        if (user) {
          sessionStorage.setItem("user_id", user.user_id);
          sessionStorage.setItem("user_pw", user.user_pw);
          sessionStorage.setItem("user_name", user.user_name);
          sessionStorage.setItem("user_jumin", user.user_jumin);
          sessionStorage.setItem("user_nick", user.user_nick);
          sessionStorage.setItem("user_phone", user.user_phone);
          sessionStorage.setItem("user_address", user.user_address);
          console.log(user);
          setSuccessModalOpen(true); // Show success modal
        } else {
          // 서버의 응답을 줬지만 성공이 아닌 경우
          setFailModalOpen(true);
        }
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
                  인증에 실패했습니다.
                  <br />
                  이메일 또는 비밀번호를 확인해주세요.
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
              setModalContent(
                "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
              );
              break;
            default:
              setModalContent(
                `오류가 발생했습니다: ${error.response.statusText}`
              );
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
  };
  const handleCaptchaVerify = (value) => {
    setCaptchaValue(value);
    setCaptchaVerified(true);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <p className={styles.imageItem}></p>
          <input
            type="email"
            placeholder="📧   Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="🔑   Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div id="caution" className={styles.caution}>
            {caution}
          </div>
          <p className={styles.loginsub}>
            <Link to="/signup">Sign up</Link>
            <Link to="/findid">Find ID /</Link>
            <Link to="/findpw">Password</Link>
          </p>
          <Captcha onVerify={handleCaptchaVerify} />
          <div
            className={styles.finalCheck}
            onClick={
              caution === "확인되었습니다." && captchaVerified ? handleLogin : null
            }
            style={{
              backgroundColor:
                caution === "확인되었습니다." && captchaVerified
                  ? "rgba(0, 0, 0, 0.6)"
                  : "grey",
              disable:
                caution === "확인되었습니다." && captchaVerified
                  ? "false"
                  : "true",
            }}
          >
            Login
          </div>
        </div>
      </div>
      <ModalApi.SuccessModal
        isOpen={SuccessModalOpen}
        onClose={handleSuccessCloseModal}
        modalTitle={"로그인 성공"}
        modalText={""}
      />
      <ModalApi.FailModal
        isOpen={FailModalOpen}
        onClose={handleFailCloseModal}
        modalTitle={"로그인 실패"}
        modalText={modalContent}
      />
    </>
  );
};

export default LoginPage;
