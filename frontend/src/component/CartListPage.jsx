import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Box, Button, Snackbar, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { deleteCart } from '../server/api';

const CartListPage = ({ cart }) => {
    const { id, product, user } = cart;
    const { title, description, image, price, location } = product;
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const deleteToCart = () => {
        deleteCart(id).then((res) => {
            if (res.status == 200) {
                setSnackbar({
                    open: true,
                    message: 'Ürün sepetten kaldırıldı',
                    severity: 'success'
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }).catch((err) => {
            setSnackbar({
                open: true,
                message: 'Ürün sepetten kaldırılırken bir hata oluştu',
                severity: 'error'
            });
        });
    }

    return (
        <Box sx={{ p: 2 }}>
            <Card sx={{
                width: '100%',
                borderRadius: 3,
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                m: 'auto',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)',
                }
            }}>
                <Box sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8,
                    zIndex: 1
                }}>
                    <IconButton 
                        onClick={deleteToCart} 
                        sx={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(4px)',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 1)',
                                transform: 'scale(1.1)'
                            },
                            transition: 'all 0.2s ease-in-out'
                        }}
                    >
                        <ClearIcon sx={{ color: 'error.main' }} />
                    </IconButton>
                </Box>
                <Box sx={{ width: '100%', height: 140, position: 'relative', mb: 1, mt: 1 }}>
                    {image && image.includes('image') ? (
                        <CardMedia
                            component="img"
                            image={image}
                            alt={title}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                background: '#fff',
                                borderRadius: 2,
                            }}
                        />
                    ) : image && image.includes('video') ? (
                        <video
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: 8,
                                background: '#fff',
                            }}
                            controls
                        >
                            <source src={image} type="video/mp4" />
                        </video>
                    ) : null}
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 2, pt: 0 }}>
                    <Typography variant='h6' color="primary" sx={{ fontWeight: 700 }}>{title}</Typography>
                    <Typography variant='body2' color="text.secondary" sx={{ mb: 1 }}>{description}</Typography>
                    <Typography variant='h6' color="primary" sx={{ fontWeight: 700 }}>{price} TL</Typography>
                </CardContent>
            </Card>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleCloseSnackbar} 
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default CartListPage;
