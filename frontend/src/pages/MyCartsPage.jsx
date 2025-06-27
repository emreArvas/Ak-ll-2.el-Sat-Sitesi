import React, { useEffect, useState } from 'react';
import CartListPage from '../component/CartListPage';
import { createOrder, deleteCart, listCart } from '../server/api';
import { Button, Container, Typography, Box, Paper, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ 
          mb: { xs: 3, sm: 4 },
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
              background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            Sepetim
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {carts.length > 0 ? (
              <Grid container spacing={2}>
                {carts.map((cart, index) => (
                  <Grid item xs={12} key={index}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <CartListPage cart={cart} />
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box sx={{ 
                textAlign: 'center',
                py: 4,
                color: 'text.secondary',
                backgroundColor: 'rgba(249, 115, 22, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(249, 115, 22, 0.1)'
              }}>
                <Typography variant="h6" sx={{ 
                  color: 'primary.main',
                  fontWeight: 500
                }}>
                  Sepetiniz boş
                </Typography>
              </Box>
            )}
          </Grid>

          {carts.length > 0 && (
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Paper 
                  elevation={3}
                  sx={{ 
                    p: 3,
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 2,
                      fontWeight: 600,
                      color: 'text.primary'
                    }}
                  >
                    Sipariş Özeti
                  </Typography>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3,
                    pb: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="h6" color="text.secondary">
                      Toplam Tutar
                    </Typography>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700,
                        color: 'primary.main'
                      }}
                    >
                      {totalPrice} TL
                    </Typography>
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={payOrder}
                    startIcon={<ShoppingCartCheckoutIcon />}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #ea580c 30%, #f97316 90%)',
                      }
                    }}
                  >
                    Ödemeyi Tamamla
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          )}
        </Grid>
      </Container>
    </motion.div>
  );
};

export default MyCartsPage;
