import styles from "../../style/loginstyle/FindIDPage.module.css";
import BackButton from "./BackButton";
const FindIDPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <BackButton />
        <p className={styles.title}>아이디 찾기</p>
        <div className={styles.imageItem}></div>
        <input type="text" placeholder="이름" />
        <input type="text" placeholder="주민등록번호" />
        <div id="caution" className={styles.caution}></div>
        <div className={styles.finalCheck}>찾기</div>
      </div>
    </div>
  );
};
export default FindIDPage;
