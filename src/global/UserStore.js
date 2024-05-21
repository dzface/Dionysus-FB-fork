import { createContext, useState, useEffect } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [bgimgurl, setBgimgurl] = useState(localStorage.getItem("bgimg"));
  const [name, setName] = useState(
    localStorage.getItem("name") || "로그인 해주세요"
  );
  const [profileimg, setProfileimg] = useState(
    localStorage.getItem("pfimg") || "이미지 없음"
  );
  const [category, setCategory] = useState(
    localStorage.getItem("category") || "all"
  );
  useEffect(() => {
    localStorage.setItem("bgimg", bgimgurl);
  }, [bgimgurl]);

  useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  useEffect(() => {
    localStorage.setItem("pfimg", profileimg);
  }, [profileimg]);

  useEffect(() => {
    localStorage.setItem("category", category);
  }, [category]);
  return (
    <UserContext.Provider
      value={{
        bgimgurl,
        setBgimgurl,
        name,
        setName,
        profileimg,
        setProfileimg,
        category,
        setCategory,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;
