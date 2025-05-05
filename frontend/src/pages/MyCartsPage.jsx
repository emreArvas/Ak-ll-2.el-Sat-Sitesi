import React, { useEffect, useState } from 'react';
import CartListPage from '../component/CartListPage';
import { createOrder, deleteCart, listCart } from '../server/api';
import { Button } from '@mui/material';

const MyCartsPage = () => {
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    listCart(userId)
      .then((res) => {
        setCarts(res.data);
        const total = res.data.reduce((acc, cart) => acc + cart.product.price, 0);
        setTotalPrice(total);
      })
      .catch((err) => console.error(err));
    
   
  }, [userId]); 

   const payOrder = async () => {
    try {
      for (const cart of carts) {
        await createOrder(userId, cart.product.id);
        await deleteCart(cart.id);
      }
      const updatedCart = await listCart(userId);
      setCarts(updatedCart.data);
      setTotalPrice(0); 
      alert("Ödendi");
    } catch (err) {
      console.error(err);
    }
  };
  
  return (
    <div>
      <h1 style={{textAlign : 'center'}}>Sepetim</h1>
      <div className='orderDiv'>
        <div className='paymentDiv'>
          {carts.map((cart, index) => (
            <CartListPage key={index} cart={cart} />
          ))}
        </div>
        <div className='paymentDiv'>
          <h2>Toplam Fiyat: {totalPrice} Tl</h2>
          <Button onClick={payOrder} id='product-button' variant='contained'>
            Öde
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyCartsPage;
