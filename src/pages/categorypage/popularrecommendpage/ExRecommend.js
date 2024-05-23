// import React, { useState } from "react";
// import styled from "styled-components";
// import Common from "../Common/Common";
// import Recommend2 from "./Recommend2";
// import bg from "../../../img/popularrecommendpageimg/pexels-pixabay-2145.jpg";

// const Container = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 20px;
//   position: absolute;

//   h1 {
//     width: 280px;
//     height: 50px;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 21px;
//     margin-bottom: 20px;
//     border-radius: 20px;
//     background-color: rgba(0, 0, 0, 0.4);
//     color: #ffffff;
//   }
// `;

// const ThemeContainer = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-wrap: wrap;
//   gap: 20px;
//   margin: 30px;
// `;

// const ThemeItem = styled.div`
//   width: ${({ isBig }) => (isBig ? "855px" : "400px")};
//   height: ${({ isBig }) => (isBig ? "600px" : "300px")};
//   background-color: ${({ bgColor }) => bgColor};
//   cursor: pointer;
//   transition: width 0.5s ease, height 0.5s ease;
//   position: ${({ isBig }) => (isBig ? "absolute" : "relative")};
//   z-index: ${({ isBig }) => (isBig ? "2" : "1")};
//   border-radius: 5% 5%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ItemTitle = styled.div`
//   width: 100%;
//   height: 148px;
//   font-weight: bold;
//   color: white;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const ItemTitleText = styled.p`
//   margin-top: 20px;
//   font-size: ${({ isBig }) => (isBig ? "20px" : "25px")};
// `;

// const ThemeItemImage = styled.img`
//   margin-top: 5px;
//   width: 100%;
//   height: 100%;
//   object-fit: fill;
//   border-radius: 0 0 5% 5%;
// `;

// const Wrapper = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   position: ${({ isBig }) => (isBig ? "absolute" : "relative")};
// `;

// const RecommendIconDiv = styled.div`
//   width: 100%;
//   height: 480px;
//   background-color: rgba(0, 0, 0, 0.8);
//   border-radius: 0 0 5% 5%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-wrap: wrap;
// `;

// const IconBox = styled.div`
//   width: 327px;
//   height: 240px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const IconImg = styled.img`
//   width: 150px;
//   height: 150px;
//   border-radius: 50%;
//   transition: transform 0.2s ease;
  
//   &:hover {
//     transform: scale(0.9);
//   }
// `;

// const CommonBox = styled.div`
//   position: ${({ showRecommend2 }) =>
//     showRecommend2 ? "absolute" : "relative"};
// `;

// const Recommend = () => {
//   const [isBig, setIsBig] = useState(null);
//   // const [foodBig, setfoodBig] = useState(null); // 수정
//   const [showRecommend2, setShowRecommend2] = useState(false);
//   const [selectedIcon, setSelectedIcon] = useState(null);
  
//   const toggleSize = (index) => {
//     setIsBig(isBig === index ? null : index);
    
//   };



//   const handleIconClick = (index, iconName) => {
//     setSelectedIcon(iconName);
//     // toggleSize(index);
//     setShowRecommend2(true);
//   };
//   const iconThemes = {
//     0: ["행복", "슬픔", "화남", "사랑"],
//     1: ["맑음", "흐림", "비", "눈"],
//     2: ["한식", "일식", "양식", "중식"],
//   };
//   // 아이콘 이미지의 동적 경로 생성 함수
//   const getIconImagePath = (index, themeIndex) => {

//     return `${process.env.PUBLIC_URL}/recommendationicon/${iconThemes[themeIndex][index]}.png`;
//   };

//   return (
//     <Container>
//       <h1>다양한 주류 추천</h1>
//       <ThemeContainer>
//         {showRecommend2 ? (
//           <Recommend2 iconThemes={iconThemes}/>
          
//         ) : (
//           <>
//             {[
//               { title: "기분에 따른 추천", bgColor: "rgba(112, 101, 19, 1)" },
//               { title: "날씨에 따른 추천", bgColor: "rgba(182, 113, 20, 1)" },
//               { title: "음식에 따른 추천", bgColor: "rgba(82, 1, 33, 1)" },
//             ].map((theme, index) => (
//               <ThemeItem
//                 key={index}
//                 onClick={() => toggleSize(index)}
//                 isBig={isBig === index}
//                 bgColor={theme.bgColor}
//               >
//                 {isBig === index ? (
//                   <Wrapper>
//                     <ItemTitle>
//                       <ItemTitleText isBig={isBig}>{theme.title}</ItemTitleText>
//                     </ItemTitle>
//                     <RecommendIconDiv>
//                       {[0, 1, 2, 3].map((iconIndex) => (
//                         <IconBox key={iconIndex}>
//                           <IconImg
//                             src={getIconImagePath(iconIndex, index)}
//                             onClick={() => handleIconClick(index)}
//                           />
//                         </IconBox>
//                       ))}
//                     </RecommendIconDiv>
//                   </Wrapper>
//                 ) : (
//                   <Wrapper>
//                     <ItemTitle>
//                       <ItemTitleText isBig={isBig}>{theme.title}</ItemTitleText>
//                     </ItemTitle>
//                     <ThemeItemImage src={bg} alt="와인 이미지" />
//                   </Wrapper>
//                 )}
//               </ThemeItem>
//             ))}
//           </>
//         )}
//       </ThemeContainer>
//       <CommonBox showRecommend2={showRecommend2}>
//         <Common />
//       </CommonBox>
//     </Container>
//   );
// };

// export default Recommend;
