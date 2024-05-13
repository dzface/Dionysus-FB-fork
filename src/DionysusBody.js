import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/mainpage/MainPage";
import SideBar from "./pages/mainpage/SideBar";
const DionysusBody = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/SideBar" element={<SideBar />} />
      </Routes>
    </Router>
  );
};

export default DionysusBody;
