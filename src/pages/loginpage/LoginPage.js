import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../style/loginstyle/loginpage.module.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [caution, setCaution] = useState("");
  const navigate = useNavigate();

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
          navigate("/");
        }
      } catch (error) {
        // Handle error.
        console.log("An error occurred:", error.response);
      }
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
