import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from 'screens/auth/login/Login';
import Register from 'screens/auth/register/Register';
import ProductList from 'screens/home/Products';
import ProtectedRoute from './protectedRoutes/protectedRoutes';
import ProductDetail from 'screens/home/ProductDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
