import React from 'react';
import {
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  CircularProgress,
} from '@mui/material';

import { useGetProductById } from 'hooks/useGetProductById';
import Rating from 'components/ratings/Ratings';

const ProductDetail: React.FC = () => {
  const { product, error, loading } = useGetProductById();

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  if (!product) {
    return <Typography variant="h6">Product not found.</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img src={product.image} alt={product.title} style={{ maxWidth: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Price: ${product?.price?.toFixed(2)}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Discount: {product.discountPercentage}%
            </Typography>
            <Typography variant="body1" gutterBottom>
              Rating: <Rating value={product.rating} readOnly />
            </Typography>
            <Typography variant="body1" gutterBottom>
              Stock: {product.stock}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Brand: {product.brand}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Category: {product.category}
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Add to Cart
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetail;
