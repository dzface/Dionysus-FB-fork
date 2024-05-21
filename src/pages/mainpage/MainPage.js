import Header from "./Header";
import Background from "./Background";
import VideoBackground from "./VideoBackground";
const MainPage = ({ hidden, backheight }) => {
  return (
    <>
      {/* 이미지메인배경 */}
      {/* <Background backbtn={true} scroll={false} opacityisTrue={false}>
        <Header />
      </Background> */}
      <VideoBackground>
        <Header />
      </VideoBackground>
    </>
  );
};
export default MainPage;
