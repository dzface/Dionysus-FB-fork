import Footer from "./Footer";
import Header from "./Header";
import Background from "./Background";
import GlobalStyles from "../../global/GlobalStyles";
const MainPage = () => {
  return (
    <>
      <GlobalStyles />
      <Background>
        <Header />
        <Footer />
      </Background>
    </>
  );
};
export default MainPage;
