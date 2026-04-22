import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RecipeDetailPage from "./pages/RecipeDetailPage/RecipeDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
