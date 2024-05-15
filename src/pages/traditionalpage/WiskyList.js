import { useState } from "react";
import { IconContext } from "react-icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import StarRating from "./StarRating";

const WiskyList = () => {
  const [whiskeys, setWhiskeys] = useState([
    {
      id: 1,
      name: "맥카랜 트리플 우드",
      price: 50000,
      alcoholContent: "40%",
      volume: "700ml",
      rating: 4.5,
      type: "스카치",
      liked: false,
      review: []
    },
    {
      id: 2,
      name: "아벨라우어 18년",
      price: 100000,
      alcoholContent: "43%",
      volume: "750ml",
      rating: 4.8,
      type: "스카치",
      liked: false,
      review: []
    },
    {
      id: 3,
      name: "글렌피딕 12년",
      price: 40000,
      alcoholContent: "40%",
      volume: "700ml",
      rating: 4.3,
      type: "스카치",
      liked: false,
      review: []
    },
    {
      id: 4,
      name: "라그불린 16년",
      price: 80000,
      alcoholContent: "46%",
      volume: "750ml",
      rating: 4.6,
      type: "스카치",
      liked: false,
      review: []
    },
    {
      id: 5,
      name: "라피고 10년",
      price: 60000,
      alcoholContent: "43%",
      volume: "700ml",
      rating: 4.4,
      type: "아이슬란드",
      liked: false,
      review: []
    },
    {
      id: 6,
      name: "이슬레이 10년",
      price: 55000,
      alcoholContent: "43%",
      volume: "700ml",
      rating: 4.2,
      type: "스카치",
      liked: false,
      review: []
    },
    {
      id: 7,
      name: "볼튜모어 12년",
      price: 45000,
      alcoholContent: "40%",
      volume: "700ml",
      rating: 4.1,
      type: "아이슬란드",
      liked: false,
      review: []
    },
    {
      id: 8,
      name: "맥카랜 에디션 2",
      price: 70000,
      alcoholContent: "48%",
      volume: "750ml",
      rating: 4.7,
      type: "스카치",
      liked: false,
      review: []
    },
    {
      id: 9,
      name: "매켈란 골드",
      price: 85000,
      alcoholContent: "43%",
      volume: "700ml",
      rating: 4.6,
      type: "아이슬란드",
      liked: false,
      review: []
    },
    {
      id: 10,
      name: "올드포스트 12년",
      price: 60000,
      alcoholContent: "40%",
      volume: "750ml",
      rating: 4.3,
      type: "아일랜드",
      liked: false,
      review: []
    },
    {
      id: 11,
      name: "라가불린 12년",
      price: 55000,
      alcoholContent: "43%",
      volume: "700ml",
      rating: 4.4,
      type: "스카치",
      liked: false,
      review: []
    },
    {
      id: 12,
      name: "글렌피딕 15년",
      price: 70000,
      alcoholContent: "43%",
      volume: "750ml",
      rating: 4.5,
      type: "스카치",
      liked: false,
      review: []
    },
    {
      id: 13,
      name: "칼톤 14년",
      price: 75000,
      alcoholContent: "46%",
      volume: "700ml",
      rating: 4.6,
      type: "스카치",
      liked: false,
      review: []
    },
    {
      id: 14,
      name: "윌리엄 러브래드 12년",
      price: 65000,
      alcoholContent: "40%",
      volume: "700ml",
      rating: 4.7,
      type: "버번",
      liked: false,
      review: []
    },
    {
      id: 15,
      name: "레드브레스트 12년",
      price: 60000,
      alcoholContent: "40%",
      volume: "750ml",
      rating: 4.5,
      type: "아일랜드",
      liked: false,
      review: []
    },
  ]);

  const [user, setUser] = useState(null); // 사용자 정보 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [likedWhiskeys, setLikedWhiskeys] = useState([]); // 찜한 목록 상태
  const [ratings, setRatings] = useState({}); // 별점 상태
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState({});
  
 
  

  // 검색어 입력 핸들러
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // 찜하기 버튼 클릭 시 상태 업데이트
  const toggleLike = (id) => {
    const updatedWhiskeys = whiskeys.map((whiskey) =>
      whiskey.id === id ? { ...whiskey, liked: !whiskey.liked } : whiskey
    );

    setWhiskeys(updatedWhiskeys);

    // 찜한 경우
    if (!likedWhiskeys.includes(id)) {
      setLikedWhiskeys([...likedWhiskeys, id]);
    } else {
      // 찜 해제한 경우
      setLikedWhiskeys(likedWhiskeys.filter((whiskeyId) => whiskeyId !== id));
    }
  };

  // 별점 선택 핸들러
  const handleRate = (id, rate) => {
    setRatings({ ...ratings, [id]: rate });
  };

  
  // 회원가입 핸들러
  const handleSignUp = (userData) => {
    setUser(userData);
  };
  
  // 사용자가 찜한 목록 보기
  const handleViewLikedWhiskeys = () => {
    // 찜한 목록을 필터링하여 반환
    return whiskeys.filter((whiskey) => likedWhiskeys.includes(whiskey.id));
  };

  // 후기 입력 핸들러
  const handleReview = (id, review) => {
    const updatedWhiskeys = whiskeys.map((whiskey) =>
      whiskey.id === id ? { ...whiskey, review: review } : whiskey
    );
    setWhiskeys(updatedWhiskeys);
  };

  // 후기 목록 보기 핸들러
  const handleViewReviews = (id) => {
    return whiskeys.find((whiskey) => whiskey.id === id)?.review || "후기가 없습니다.";
  };

  // 입력 값이 변경될 때 호출되는 함수
  const handleReviewInputChange = (e) => {
    setReviewText(e.target.value);
  };



  return (
    <div>
      <h2>위스키 목록</h2>
      {/* 검색 입력란 */}
      <input
        type="text"
        placeholder="위스키를 검색하세요"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {/* 위스키 목록 상태를 매핑하여 리스트로 출력 */}
        {whiskeys
          .filter((whiskey) =>
            whiskey.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((whiskey) => (
            <li key={whiskey.id}>
              <strong>{whiskey.name}</strong>
              <ul>
                <li>가격: {whiskey.price}원</li>
                <li>도수: {whiskey.alcoholContent}</li>
                <li>용량: {whiskey.volume}</li>
                <li>별점: {whiskey.rating}</li>
                <li>주종: {whiskey.type}</li>
                <li>
                  별점:
                  <StarRating
                    ratingProps={ratings[whiskey.id] || 0}
                    onRate={(rate) => handleRate(whiskey.id, rate)}
                  />
                </li>
                <li>
                  {/* 찜하기 버튼 */}
                  <span onClick={() => toggleLike(whiskey.id)}>
                    {whiskey.liked ? <FaHeart color="red" /> : <FaRegHeart />}
                  </span>
                </li>
               {/* 후기 입력란 */}
               <li>
                  <input
                    type="text"
                    placeholder="후기를 작성하세요"
                    value={whiskey.review || ""}
                    onChange={(e) => handleReview(whiskey.id, e.target.value)}
                  />
                </li>
              {/* 후기 저장 버튼 */}
              <li>
                <button onClick={() => handleReview(whiskey.id, reviewText)}>
                  후기 저장
                </button>
              </li>
               
              </ul>
            </li>
          ))}
      </ul>

      {/* 회원가입 양식 */}
      {!user && <SignUpForm onSignUp={handleSignUp} />}
      {/* 찜한 목록 보기 */}
      {user && (
        <div>
          <h3>내가 찜한 목록</h3>
          <ul>
            {handleViewLikedWhiskeys().map((whiskey) => (
              <li key={whiskey.id}>{whiskey.name}</li>
            ))}
          </ul>
        </div>
      )}
      {/* 리뷰 목록 */}
      <h2>리뷰 목록</h2>
      <ul>
        {whiskeys.map((whiskey) => (
          <li key={whiskey.id}>
            <strong>{whiskey.name}</strong>: {handleViewReviews(whiskey.id)}
          </li>
        ))}
      </ul>
    </div>
  );
};

// 회원가입 양식 컴포넌트
const SignUpForm = ({ onSignUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    onSignUp(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>회원가입</h3>
      <input
        type="text"
        placeholder="사용자 이름"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">가입하기</button>
    </form>
  );
};

export default WiskyList;