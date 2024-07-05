import React from 'react';
import { Grid, Card, CardContent, Typography, CardActionArea, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import LazyImage from 'components/lazyImage/LazyImage';
import Rating from 'components/ratings/Ratings';
import { useGetProducts } from 'hooks/useGetProducts';


const dummyImageURL = "https://img.freepik.com/free-vector/illustration-gallery-icon_53876-27002.jpg?w=1060&t=st=1720106937~exp=1720107537~hmac=c2f2818be61e10d357ce4f779a0ec33c2d5925d0dbb9c0e515c43ec286e4edc2";

interface ProductListProps {
  searchTerm: string;
}

const ProductList: React.FC<ProductListProps> = ({ searchTerm }) => {
  const navigate = useNavigate();
  const { products, error, loading } = useGetProducts(searchTerm);

  const handleCardClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  return (
    <div style={{ maxHeight: '500px', overflow: 'auto' }}>
      <Grid container spacing={4} padding={5}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                '&:hover': {
                  boxShadow: 6,
                }
              }}
            >
              <CardActionArea onClick={() => handleCardClick(product.id)}>
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
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
