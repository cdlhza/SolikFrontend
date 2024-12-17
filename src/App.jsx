import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProductsPage from "./pages/ProductsPage";
import ProductsFormPage from "./pages/ProductsFormPage";
import CartPage from "./pages/CartPage";
import ProtectedRoute from "./ProtectedRoute";
import ProductDetailPage from "./pages/ProductDetailPage";
import { ProductsProvider } from "./context/ProductContext";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />

              {/* Rutas protegidas */}
              <Route element={<ProtectedRoute />}>
                <Route path="/cart" element={<CartPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/add-product" element={<ProductsFormPage />} />
                <Route path="/products/:id" element={<ProductsFormPage />} />
              </Route>

              {/* Página no encontrada */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </BrowserRouter>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
