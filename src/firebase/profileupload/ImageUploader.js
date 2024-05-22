import React, { useState } from "react";
import { storage } from "./ProfileImgUpload";
import styled from "styled-components";

const ImageProfileDiv = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > .classimgcircle {
    width: auto;
    height: auto;
    border-radius: 50%;
  }
  & > label {
    cursor: pointer;
    width: 100px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    margin-bottom: 10px;
  }

  & > input[type="file"] {
    display: none;
  }

  & > button {
    cursor: pointer;
    width: 100px;
    height: 40px;
    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > div > img {
    width: 100px;
    height: 100px;
    margin-top: 20px;
    object-fit: cover;
  }
`;

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = () => {
    if (file) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      fileRef.put(file).then(() => {
        console.log("File uploaded successfully!");
        fileRef.getDownloadURL().then((url) => {
          console.log("저장경로 확인 : " + url);
          setUrl(url);
        });
      });
    }
  };

  return (
    <ImageProfileDiv>
      <div className="classimgcircle">
        {url && <img src={url} alt="uploaded" />}
      </div>
      <label htmlFor="fileInput">Choose File</label>
      <input id="fileInput" type="file" onChange={handleFileInputChange} />
      <button onClick={handleUploadClick}>Upload</button>
    </ImageProfileDiv>
  );
};

export default ImageUploader;
