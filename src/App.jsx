import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PostRide from "./pages/PostRide";
import FindRides from "./pages/FindRides";
import Index from "./pages/Index";
import Login from "./pages/Login";
import { UserProvider } from "./context/UserContext";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router";

function App() {
  return (
    <UserProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-ride" element={<PostRide />} />
        <Route path="/find-rides" element={<FindRides />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
