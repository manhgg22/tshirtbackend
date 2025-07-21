import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from '@mui/material';
import { RootState } from '../redux/store';
import { removeItem, updateQuantity } from '../redux/cartSlice';
import CartTable from '../components/CartTable';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleUpdateQuantity = (productId: string, designId: string | undefined, newQuantity: number) => {
    dispatch(updateQuantity({ productId, designId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId: string, designId: string | undefined) => {
    dispatch(removeItem({ productId, designId }));
  };

  return (
    <Container sx={{ py: 4 }}>
      <CartTable
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </Container>
  );
};

export default CartPage;
