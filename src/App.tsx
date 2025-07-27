import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth";
import Dashboard from "./pages/dashboard";
import Layout from "./components/layout";
import Sale from "./pages/sale";
import Product from "./pages/product";
import Order from "./pages/order";
import { useState } from "react";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("refreshToken");
  });

  if (isLoggedIn) {
    const loginTimestamp = localStorage.getItem("login_timestamp");
    const oneDay = 24 * 60 * 60 * 1000;

    if (loginTimestamp && Date.now() - Number(loginTimestamp) > oneDay) {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("login_timestamp");
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Layout /> : <Navigate to="/login" replace />}
      >
        {/* A work around so the "/" isn't gonna come up without any thing to put in outlet ( break the ui)  */}
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="sale" element={<Sale />} />
        <Route path="product" element={<Product />} />
        <Route path="order" element={<Order />} />
      </Route>

      {/* Show login only if not logged in */}
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage setIsLoggedIn={setIsLoggedIn} />
          )
        }
      />
    </Routes>
  );
}

export default App;
