import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RecipeDetailPage from "./pages/RecipeDetailPage/RecipeDetailPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import FavoritesPage from "./pages/FavoritesPage/FavoritePage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import DailyRecipePage from "./pages/DailyRecipePage/DailyRecipePage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    // 1. Cambiamos el fragmento invisible por un div con tu clase contenedora
    <div className="app-container">
      <Navbar />

      {/* 2. Envolvemos las rutas en tu clase que se estira (flex-grow) */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/daily" element={<DailyRecipePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
