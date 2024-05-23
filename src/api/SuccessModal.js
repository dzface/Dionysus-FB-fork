import React from 'react';
import ReactModal from 'react-modal';

const SuccessModal = ({ isOpen, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          backgroundColor: '#646cffaa', // Dark background color
          color: '#fff', // Light text color
          border: 'none',
          borderRadius: '8px',
          maxWidth: '400px',
          maxHeight: '200px',
          margin: 'auto',
          padding: '20px'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)' // Dark overlay
        },
      }}
    >
      <h2>로그인 성공</h2>
      <p>로그인에 성공하였습니다!</p>
      <button onClick={onClose}>닫기</button>
    </ReactModal>
  );
};

export default SuccessModal;