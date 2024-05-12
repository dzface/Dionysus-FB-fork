import MainPage from "./main_page/MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
const DionysusBody = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default DionysusBody;
