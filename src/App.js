import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./pages/mainpage/SideBar";
import GlobalStyles from "./global/GlobalStyles";
import UserStore from "./global/UserStore";
import CommomBackground from "./global/CommonBackground";
function App() {
  return (
    <>
      <GlobalStyles />
      <UserStore>
        <Router>
          <Routes>
            <Route element={<SideBar />}>
              <Route path="/" element={<CommomBackground />} />
            </Route>
          </Routes>
        </Router>
      </UserStore>
    </>
  );
}

export default App;
