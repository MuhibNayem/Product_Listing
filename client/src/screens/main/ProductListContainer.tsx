import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Typography, Container, Box } from '@mui/material';

import { AppDispatch } from 'store';
import { logout } from 'store/authSlice';
import ProductList from './productList';


const ProductListContainer: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <Typography variant="h4" component="h2" gutterBottom>
        Product List
      </Typography>
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 4 }}
      />
      <ProductList searchTerm={searchTerm} />
    </Container>
  );
};

export default ProductListContainer;
