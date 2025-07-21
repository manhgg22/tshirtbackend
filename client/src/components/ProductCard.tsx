import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import { Product } from '../types';
import { Box } from '@mui/material';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }}>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={`http://localhost:5000${product.image}`}
          alt={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            ${product.price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={onAddToCart}
            fullWidth
            sx={{ mt: 2 }}
          >
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductCard;
