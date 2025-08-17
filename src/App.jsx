import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import PostRide from "./pages/PostRide";
import FindRides from "./pages/FindRides";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Navigation from "./components/Navigation";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/post-ride" element={<PostRide />} />
        <Route path="/find-rides" element={<FindRides />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
