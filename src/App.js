import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home"
import Courts from "./pages/courts/Courts"
import Disputes from "./pages/disputes/Disputes"
import Dispute from "./pages/dispute/Dispute"
import Court from "./pages/court/Court";
import "./app.css"
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <Topbar />

      <div className="container">

        <Sidebar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courts" element={<Courts />} />
          <Route path="/courts/:courtId" element={<Court />} />
          <Route path="/cases" element={<Disputes />} />
          <Route path="/cases/:disputeId" element={<Dispute />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
