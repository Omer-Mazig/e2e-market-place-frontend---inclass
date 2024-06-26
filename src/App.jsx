import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/product/:productId" element={<ProductDetailsPage />} />
        <Route path="auth/register" element={<RegisterPage />} />
        <Route path="auth/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
