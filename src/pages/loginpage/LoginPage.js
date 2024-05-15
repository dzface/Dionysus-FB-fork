import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../style/loginstyle/loginpage.module.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [caution, setCaution] = useState("");

  useEffect(() => {
    checkInputs(email, password);
  }, [email, password]);

  const checkInputs = (inputEmail, inputPassword) => {
    if (inputEmail !== "" && inputPassword !== "") {
      setCaution("확인되었습니다.");
    } else {
      setCaution("값을 입력하세요.");
    }
  };

  const handleLogin = () => {
    if (caution === "확인되었습니다.") {
      // 로그인 로직 추가
      console.log("로그인되었습니다.");
    }
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
          <div
            className={styles.finalCheck}
            onClick={handleLogin}
            style={{
              cursor: caution === "확인되었습니다." ? "pointer" : "not-allowed",
            }}
          >
            Login
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
