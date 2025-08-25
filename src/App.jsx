import "./App.css";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import PostRide from "./pages/PostRide";
import FindRides from "./pages/FindRides";
import Index from "./pages/Index";
import DriverDashboard from "./pages/DriverDashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { UserProvider } from "./context/UserContext";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router";
import Footer from "./components/Footer";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {
  return (
    <UserProvider>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-rides"
          element={
            <ProtectedRoute requiredRole={{ isDriver: true }}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post-ride"
          element={
            <ProtectedRoute requiredRole={{ isDriver: true }}>
              <PostRide />
            </ProtectedRoute>
          }
        />
        <Route path="/find-rides" element={<FindRides />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </UserProvider>
  );
}

export default App;
