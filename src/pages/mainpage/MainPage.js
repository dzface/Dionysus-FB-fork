import Header from "./Header";
import VideoBackground from "./VideoBackground";
import ImageUploader from "../../firebase/profileupload/ImageUploader";
const MainPage = ({ hidden, backheight }) => {
  return (
    <VideoBackground>
      <Header />
      {/* <ImageUploader /> */}
    </VideoBackground>
  );
};
export default MainPage;
