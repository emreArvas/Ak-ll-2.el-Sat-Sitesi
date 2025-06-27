import React, { useEffect, useState } from 'react'
import { getInComingOrders } from '../server/api';
import InComingOrderList from '../component/InComingOrderList';
import { Container, Typography, Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const InComingOrdersPage = () => {
    const userId = localStorage.getItem("id");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getInComingOrders(userId).then((res) => {
            setOrders(res.data);
        }).catch((err) => { console.log(err) })
    }, []);

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
                        Gelen Siparişler
                    </Typography>
                </Box>

                <Grid 
                    container 
                    spacing={{ xs: 2, sm: 3, md: 4 }}
                    sx={{
                        '& > .MuiGrid-item': {
                            display: 'flex',
                            justifyContent: 'center'
                        }
                    }}
                >
                    {orders.length > 0 ? (
                        orders.map((order, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <InComingOrderList order={order} />
                                </motion.div>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
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
                                    Henüz gelen siparişiniz bulunmuyor
                                </Typography>
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Container>
        </motion.div>
    )
}

export default InComingOrdersPage

