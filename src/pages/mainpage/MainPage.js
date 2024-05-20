import Header from "./Header";
import Background from "./Background";
const MainPage = () => {
  return (
    <>
      <Background backbtn={true} scroll={false}>
        <Header />
      </Background>
    </>
  );
};
export default MainPage;
