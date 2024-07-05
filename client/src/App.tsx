import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from 'screens/auth/login';
import Register from 'screens/auth/register';

import ProtectedRoute from './protectedRoutes/protectedRoutes';
import ProductDetails from 'screens/main/productDetails';
import ProductListContainer from 'screens/main/ProductListContainer';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductListContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
