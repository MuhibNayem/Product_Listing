import React, { useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetProducts } from '../../hooks/useGetProducts';
import { RootState } from 'store';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  TextField, 
  Container, 
  Button 
} from '@mui/material';
import { logout } from '../../store/authSlice';
import { AppDispatch } from 'store';
import Rating from 'components/ratings/Ratings';
import LazyImage from 'components/lazyImage/LazyImage';


const dummyImageURL = "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=1060&t=st=1720106937~exp=1720107537~hmac=c2f2818be61e10d357ce4f779a0ec33c2d5925d0dbb9c0e515c43ec286e4edc2";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { products, error } = useGetProducts(searchTerm, token);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Button variant="contained" color="secondary" onClick={handleLogout} sx={{ mt: 2, mb: 2 }}>
        Logout
      </Button>
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
      <div style={{ maxHeight: '500px', overflow: 'auto' }}>
        <Grid container spacing={4} padding={5}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <LazyImage
                  src={product.image ?? dummyImageURL}
                  alt={product.title}
                  height={140}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${product.price}
                  </Typography>
                  <Rating value={product.rating} readOnly />
                  <Typography variant="body2" color="text.secondary">
                    Stock: {product.stock}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
};

export default Products;
