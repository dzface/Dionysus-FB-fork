import axios from "axios";
const DOMAIN = "http://localhost:8111";

const AxiosApi = {
  SOCKET_URL: "ws://localhost:8111/",
  // 개별 회원 조회
  memberSelect: async (user_id) => {
    const member = {
      user_id: user_id,
    };
    return await axios.post(DOMAIN + "/mypage/memberselect", member);
  },
  // 회원 정보 수정
  menberUpdate: async (
    user_id,
    user_pw,
    user_name,
    user_jumin,
    user_nick,
    user_phone,
    user_address
  ) => {
    const member = {
      user_id: user_id,
      user_pw: user_pw,
      user_name: user_name,
      user_jumin: user_jumin,
      user_nick: user_nick,
      user_phone: user_phone,
      user_address: user_address,
    };
    return await axios.put(DOMAIN + "/mypage/memberupdate", member);
  },
  // 이름 주민번호 체크
  memberCheck: async (user_name, user_jumin) => {
    const member = {
      user_name: user_name,
      user_jumin: user_jumin,
    };
    return await axios.post(DOMAIN + "/mypage/memcheck", member);
  },
  // 회원정보 삭제
  memberDelete: async (user_id) => {
    const member = {
      user_id: user_id,
    };
    return await axios.post(DOMAIN + "/mypage/memberdel", member);
  },

  jjimAlcohol: async (
    user_id,
    alcohol_name,
    country_of_origin,
    com,
    abv,
    volume,
    price
  ) => {
    const alcohol = {
      user_id: user_id,
      alcohol_name: alcohol_name,
      country_of_origin: country_of_origin,
      com: com,
      abv: abv,
      volume: volume,
      price: price,
    };
    return await axios.post(DOMAIN + "/mypage/jjimalcohol", alcohol);
  },
};

export default AxiosApi;
