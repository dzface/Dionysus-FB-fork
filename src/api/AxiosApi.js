import axios from "axios";
const DOMAIN = "http://localhost:8111";

const AxiosApi = {
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
  // all은 전체 알콜정보, 아니면 개별 알콜정보 orderBy를 통해서 sort해서 넘어옴.
  alcoholSelect: async (category, sortBy) => {
    try {
      return await axios.get(
        DOMAIN + `/alcohol/selectalcohol?category=${category}&sortBy=${sortBy}`
      );
    } catch (error) {
      console.error("Error select alcohol", error);
      throw error;
    }
  },
  //input으로 알콜명 검색하면 해당되는 내용 select
  searchAlcohols : async (category, searchTerm) => {
    try {
      return await axios.get(`${DOMAIN}/search/selectsearch?category=${category}&searchTerm=${searchTerm}`);
    } catch (error) {
      console.error("Error searching alcohols:", error);
      throw error;
    }
  },
  addReview: async (alcoholName, review) => {
    try {
      const response = await axios.post(`${DOMAIN}/review/insertreview`, {
        alcohol_name: alcoholName,
        review,
      });
      return response.data;
    } catch (error) {
      console.error("Error adding review:", error);
      throw error;
    }
  },
  updateReview: async (alcoholName, review) => {
    try {
      const response = await axios.put(`${DOMAIN}/review/updatereview`, {
        alcohol_name: alcoholName,
        review,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating review:", error);
      throw error;
    }
  },
  deleteReview: async (alcoholName) => {
    try {
      const response = await axios.delete(`${DOMAIN}/review/deletereview`, {
        params: { alcohol_name: alcoholName },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting review:", error);
      throw error;
    }
  },
  addScore: async (alcoholName, score) => {
    return axios.post(`${DOMAIN}/score/add`, { alcoholName, score });
  },
  updateScore: async (alcoholName, score) => {
    return axios.put(`${DOMAIN}/score/update`, { alcoholName, score });
  },
  fetchAverageScore: async (alcoholName) => {
    return axios.get(`${DOMAIN}/score/average`, {
      params: { alcoholName },
    });
  },
  fetchJjim: async (userId) => {
    return axios.get(`${DOMAIN}/jjim`, { params: { userId } });
  },
  addJjim: async (alcoholName) => {
    return axios.post(`${DOMAIN}/jjim/add`, { alcoholName });
  },
  removeJjim: async (alcoholName) => {
    return axios.delete(`${DOMAIN}/jjim/remove`, {
      params: { alcoholName },
    });
  },
};

export default AxiosApi;
