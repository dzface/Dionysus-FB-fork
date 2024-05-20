import styles from "../../style/mypagestyle/MemInfo.module.css";
import BackButton from "../loginpage/BackButton";

const MemInfo = () => {
  return (
    <div className={styles.container}>
      <BackButton />
      <div className={styles.box}>
        <p className={styles.title}>정보수정</p>
        <input type="text" placeholder="이메일 | {" />
        <input type="text" placeholder="비밀번호" />
        <input type="text" placeholder="이름" />
        <input type="text" placeholder="주민등록번호" />
        <input type="text" placeholder="닉네임" />
        <input type="text" placeholder="핸드폰 번호" />
        <input type="text" placeholder="주소" />
        <p className={styles.caution}></p>
        <div className={styles.finalCheck}>수정</div>
      </div>
    </div>
  );
};
export default MemInfo;
