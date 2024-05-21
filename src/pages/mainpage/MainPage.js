import Header from "./Header";
import Background from "./Background";
const MainPage = () => {
  return (
    <>
      <Background backbtn={true} scroll={false} opacityisTrue={false}>
        <Header />
      </Background>
    </>
  );
};
export default MainPage;
