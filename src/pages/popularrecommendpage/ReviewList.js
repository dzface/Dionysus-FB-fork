import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 100%;
  margin: 20px;
  padding: 0 20px;
  border: 2px solid #ccc;
  border-radius: 8px;

  @media (min-width: 768px) {
    max-width: 800px;
    margin: 20px auto;
  }
`;

const Title = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;

  @media (max-width: 480px) {
    padding: 6px;
    font-size: 14px;
  }
`;

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const StyledLi = styled.li`
  margin-bottom: 20px;
`;

const ReviewInput = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ReviewButton = styled.button`
  margin-top: 5px;
  padding: 6px 10px;
  font-size: 14px;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ReviewListStyle = styled.ul`
  padding-left: 20px;
`;

const ReviewItem = styled.li`
  margin-bottom: 10px;
`;

const ReviewActions = styled.div`
  margin-top: 5px;
  border: 5px solid black;
`;

const EditButton = styled.button`
  margin-right: 5px;
  padding: 6px 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${(props) => (props.isEdit ? "#ffc107" : "#28a745")};
  color: ${(props) => (props.isEdit ? "#212529" : "#fff")};
`;

const DeleteButton = styled.button`
  margin-right: 5px;
  padding: 6px 10px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #dc3545;
  color: #fff;
`;

// 진짜 사용자 데이터
const realUsers = [
  { id: 1, username: "user1", password: "password1", name: "User1" },
  { id: 2, username: "user2", password: "password2", name: "User2" },
  { id: 3, username: "user3", password: "password3", name: "User3" },
];

// 위스키 리스트 데이터
const whiskeyList = [
  {
    name: "맥카랜",
    reviews: [
      { content: "훌륭한 위스키입니다.", user: realUsers[0] },
      { content: "매우 부드럽고 깊은 맛이 좋습니다.", user: realUsers[1] },
      { content: "가격 대비 훌륭한 제품입니다.", user: realUsers[2] },
      { content: "내가 마신 것 중 최고의 위스키!", user: realUsers[0] },
      {
        content: "이 가격에 이 정도의 퀄리티는 흔하지 않습니다.",
        user: realUsers[1],
      },
    ],
  },
  {
    name: "글렌피딕",
    reviews: [
      {
        content: "부드럽고 고급스러운 향과 맛이 좋습니다.",
        user: realUsers[1],
      },
      { content: "훌륭한 퀄리티의 위스키입니다.", user: realUsers[2] },
      { content: "정말 맛있는 위스키예요!", user: realUsers[0] },
      { content: "여기에 리뷰를 추가합니다.", user: null },
      { content: "또 다른 리뷰입니다.", user: null },
    ],
  },
  {
    name: "아베라웨일",
    reviews: [
      { content: "아주 좋은 향이 나요.", user: realUsers[2] },
      {
        content: "이 가격에 이 정도 퀄리티면 참 좋습니다.",
        user: realUsers[0],
      },
      { content: "너무 부드럽고 맛있어요.", user: realUsers[1] },
      { content: "리뷰가 또 추가되었습니다.", user: null },
      { content: "마지막 리뷰입니다.", user: null },
    ],
  },
  {
    name: "아르베클렌",
    reviews: [
      { content: "간단하고 시원한 맛이 좋습니다.", user: realUsers[0] },
      {
        content: "다양한 풍미를 느낄 수 있는 위스키입니다.",
        user: realUsers[1],
      },
      { content: "이 가격에 이 정도면 만족합니다.", user: realUsers[2] },
      { content: "또 다른 리뷰를 추가합니다.", user: null },
      { content: "마지막으로 리뷰를 작성합니다.", user: null },
    ],
  },
];

// 리스트 컴포넌트
const ReviewList = () => {
  const [reviews, setReviews] = useState(
    whiskeyList.map((whiskey) => ({
      ...whiskey,
      reviewInput: "",
      user: null,
      showAllReviews: false,
    }))
  );
  const [currentUser, setCurrentUser] = useState(null); // 현재 사용자

  // 로그인 함수
  const handleLogin = (username, password) => {
    const user = realUsers.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setCurrentUser(user);
    } else {
      alert("잘못된 사용자 이름 또는 비밀번호입니다.");
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleReviewChange = (event, index) => {
    const newReviews = [...reviews];
    newReviews[index].reviewInput = event.target.value;
    newReviews[index].user = currentUser; // 리뷰를 작성한 사용자 설정
    setReviews(newReviews);
  };

  const handleSubmit = (index) => {
    const newReviews = [...reviews];
    const newReviewContent = newReviews[index].reviewInput.trim(); // 입력한 리뷰 내용 (공백 제거)
    if (newReviewContent !== "") {
      // 리뷰 내용이 비어있지 않은 경우에만 추가
      const newReview = { content: newReviewContent, user: currentUser };
      newReviews[index].reviews.unshift(newReview); // 새로운 리뷰를 배열의 맨 앞에 추가
      newReviews[index].reviewInput = ""; // 입력 필드 초기화
      setReviews(newReviews);
    } else {
      alert("리뷰 내용을 입력해주세요!");
    }
  };
  const handleDelete = (whiskeyIndex, reviewIndex) => {
    const newReviews = [...reviews];
    if (
      newReviews[whiskeyIndex].reviews[reviewIndex].user &&
      newReviews[whiskeyIndex].reviews[reviewIndex].user.id === currentUser.id
    ) {
      newReviews[whiskeyIndex].reviews.splice(reviewIndex, 1);
      setReviews(newReviews);
    } else {
      alert("해당 리뷰를 삭제할 권한이 없습니다.");
    }
  };

  const handleEdit = (whiskeyIndex, reviewIndex) => {
    const newReviews = [...reviews];
    if (
      newReviews[whiskeyIndex].reviews[reviewIndex].user &&
      newReviews[whiskeyIndex].reviews[reviewIndex].user.id === currentUser.id
    ) {
      const editedReview = prompt(
        "리뷰를 수정하세요:",
        newReviews[whiskeyIndex].reviews[reviewIndex].content
      );
      if (editedReview !== null) {
        newReviews[whiskeyIndex].reviews[reviewIndex].content = editedReview;
        setReviews(newReviews);
      }
    } else {
      alert("해당 리뷰를 수정할 권한이 없습니다.");
    }
  };

  const toggleShowAllReviews = (index) => {
    const newReviews = [...reviews];
    newReviews[index].showAllReviews = !newReviews[index].showAllReviews;
    setReviews(newReviews);
  };

  return (
    <div>
      <h1>위스키 리스트</h1>
      {currentUser ? (
        <div>
          현재 사용자: {currentUser.name}
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          로그인이 필요합니다.
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const username = event.target.elements.username.value;
              const password = event.target.elements.password.value;
              handleLogin(username, password);
            }}
          >
            <input type="text" name="username" placeholder="사용자 이름" />
            <input type="password" name="password" placeholder="비밀번호" />
            <button type="submit">로그인</button>
          </form>
        </div>
      )}
      <ul>
        {reviews.map((whiskey, whiskeyIndex) => (
          <li key={whiskeyIndex}>
            {whiskey.name}:
            <input
              type="text"
              value={whiskey.reviewInput}
              onChange={(event) => handleReviewChange(event, whiskeyIndex)}
              placeholder="리뷰를 입력하세요"
            />
            <button onClick={() => handleSubmit(whiskeyIndex)}>
              리뷰 추가
            </button>
            <div>
              <ul>
                {whiskey.reviews
                  .slice(0, whiskey.showAllReviews ? undefined : 3)
                  .map((review, reviewIndex) => (
                    <li key={reviewIndex}>
                      {review.content} - 작성자:{" "}
                      {review.user ? review.user.name : "익명"}
                      {review.user && review.user.id === currentUser?.id && (
                        <>
                          <button
                            onClick={() =>
                              handleEdit(whiskeyIndex, reviewIndex)
                            }
                          >
                            수정
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(whiskeyIndex, reviewIndex)
                            }
                          >
                            삭제
                          </button>
                        </>
                      )}
                    </li>
                  ))}
              </ul>
              <button onClick={() => toggleShowAllReviews(whiskeyIndex)}>
                {whiskey.showAllReviews ? "간략히 보기" : "더 보기"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
