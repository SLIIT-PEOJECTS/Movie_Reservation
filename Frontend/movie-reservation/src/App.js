import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Register from "./components/Registration";

// Immport Router Files
import Dashboard from "./components/dashboard/DashboardLoder";
import DisplayAllMovie from "./pages/Movies/DisplayAll";
import AddMovie from "./pages/Movies/AddMovie";
import UpdateMovie from "./pages/Movies/UpdateMovie";
import DisplayAllTheater from "./pages/Theater/DisplayAll";
import AddTheater from "./pages/Theater/AddTheater";
import UpdateTheater from "./pages/Theater/UpdateTheater";
import AddManager from "./pages/Manager/AddManager";
import DisplayManager from "./pages/Manager/DisplayAll";
import UpdateManager from "./pages/Manager/UpdateManager";
import DetailView from "./components/DetailView";
import AdminLogin from "./pages/Manager/Login";
import PrivateRoute from "./Services/PrivateRouteManager";
import AddSession from "./pages/SessionManager/AddSession";
import DisplayAllSession from "./pages/SessionManager/DisplayAll";
import ManagerProfile from "./pages/Manager/ManagerProfile";
import MovieProfile from "./pages/Movies/MovieProfile";
import Popup from "./components/Popup";
import UpdateSession from "./pages/SessionManager/UpdateSession";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Private Route for Manager User */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/movie" element={<DisplayAllMovie />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/new-movie" element={<AddMovie />} />
            <Route path="/update-movie/:id" element={<UpdateMovie />} />
            <Route path="/theater" element={<DisplayAllTheater />} />
            <Route path="/new-theater" element={<AddTheater />} />
            <Route path="/update-theater/:id" element={<UpdateTheater />} />
            <Route path="/new-manager" element={<AddManager />} />
            <Route path="/manager" element={<DisplayManager />} />
            <Route path="/update-manager/:id" element={<UpdateManager />} />
            <Route path="/update-profile/:id" element={<ManagerProfile />} />
            <Route path="/movie-profile/:id" element={<MovieProfile />} />
            <Route path="/new-session" element={<AddSession />} />
            <Route path="/session" element={<DisplayAllSession />} />
            <Route path="/update-session/:id" element={<UpdateSession />} />
          </Route>

          {/* Public Route */}
          <Route path="/register" element={<Register />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart/:moviename" element={<Cart />} />
          <Route path="/view/:movieid" element={<DetailView />} />
          <Route path="/popup" element={<Popup />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
