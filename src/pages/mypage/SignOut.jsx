import styles from "../../style/mypagestyle/SignOut.module.css";
import BackButton from "../loginpage/BackButton";

const SignOut = () => {
  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.box}>
        <p className={styles.title}>회원탈퇴</p>
        <div className={styles.imageItem}></div>

        <input type="text" placeholder="이름" />
        <input type="text" placeholder="주민등록번호" />
        <p></p>
        <div className={styles.finalCheck}>탈퇴</div>
      </div>
    </div>
  );
};
export default SignOut;
