import React from "react";
import ReactModal from "react-modal";
import styles from "../style/loginstyle/ModalApi.module.css";
import { BiSolidDrink } from "react-icons/bi"; //성공 이미지
import { MdNoDrinks } from "react-icons/md"; // 실패 이미지
const ModalApi = {
  SuccessModal: ({ isOpen, onClose, modalTitle, modalText }) => {
    return (
      <ReactModal isOpen={isOpen} onRequestClose={onClose} overlayClassName={styles.overlay} className={styles.modal}>
        <div className={styles.container}>
          <div>
            <h2 className={styles.modalTitle}>{modalTitle}</h2>
          </div>
          <div><BiSolidDrink size="100" color="rgb(0,255,100)"/></div>
          <div><h2 className={styles.modalText}>{modalText}</h2></div>
          <div>
            <button className={styles.closeButton} onClick={onClose}>닫기</button>
          </div>
        </div>
      </ReactModal>
    );
  },
  FailModal: ({ isOpen, onClose, modalTitle, modalText }) => {
    return (
      <ReactModal isOpen={isOpen} onRequestClose={onClose} overlayClassName={styles.overlay} className={styles.modal}>
        <div className={styles.container}>
          <div><h2 className={styles.modalTitle}>{modalTitle}</h2></div>
          <div> <MdNoDrinks size="100" color="rgb(230,0,100)"/></div>
          
          <div><button className={styles.closeButton} onClick={onClose}>닫기</button></div>
        </div>
      </ReactModal>
    );
  },
};
export default ModalApi;
