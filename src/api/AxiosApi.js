import axios from "axios";
const DOMAIN = "http://localhost:8111";

const AxiosApi = {

  // 회원 가입 여부 확인
  memberRegCheck: async (email) => {
    return await axios.get(DOMAIN + `/users/check?USER_ID=${email}`);
  },
  // 주민등록 DB 조회
  juminRegCheck: async (jumin)=>{
    return await axios.get(DOMAIN+`/users/jumin-check?USER_JUMIN=${jumin}`);
  },
  // 개별 회원 조회
  memberGetOne: async (email) => {
    return await axios.get(DOMAIN + `/my/detail/${email}`);
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
    return await axios.post(DOMAIN + "/mypage/membercheck", member);
  },
  // 회원정보 삭제
  memberDelete: async (user_id) => {
    const member = {
      user_id: user_id,
    };
    return await axios.post(DOMAIN + "/mypage/memberdel", member);
  },
  //찜 목록 불러오기
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
  // 알콜 카테고리 불러오기
  // all은 전체 알콜정보, 아니면 개별 알콜정보
  alcoholSelect: async (category) => {
    return await axios.get(
      DOMAIN + `/alcohol/selectalcohol?category=${category}`
    );
  },
};

export default AxiosApi;
