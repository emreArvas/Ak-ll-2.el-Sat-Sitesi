import React, { useState } from 'react'
import { Card, CardContent, CardMedia, Typography, Box, Button, useTheme, useMediaQuery, Snackbar, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { addCart } from '../server/api'

const ProductsPage = ({ product }) => {
    const { title, description, price, image, location } = product
    const navigate = useNavigate()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleClick = () => {
        navigate(`/product/${product.id}`);
    }

    const handleAddToCart = async (e) => {
        
        e.stopPropagation();
        try {
            const userId = localStorage.getItem('id');
            if (!userId) {
                navigate('/login');
                return;
            }
            if (product.userId.toString() === userId) {
                setSnackbar({
                    open: true,
                    message: 'Kendi ürününüzü sepete ekleyemezsiniz!',
                    severity: 'error'
                });
                return;
            }else{
                await addCart(userId, product.id);
                setSnackbar({
                    open: true,
                    message: 'Ürün sepete eklendi!',
                    severity: 'success'
                });
            }
            
           
        } catch (error) {
            console.error('Error adding to cart:', error);
            setSnackbar({
                open: true,
                message: 'Ürün sepete eklenirken bir hata oluştu!',
                severity: 'error'
            });
        }
    }

    return (
        <>
            <Card 
                onClick={handleClick}
                sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    }
                }}
            >
                <Box sx={{ 
                    width: '100%', 
                    height: isMobile ? 180 : 220, 
                    position: 'relative', 
                    mb: 1, 
                    mt: 1, 
                    bgcolor: '#ffffff', 
                    borderRadius: 2,
                    overflow: 'hidden'
                }}>
                    {image && image.includes('image') ? (
                        <CardMedia
                            component="img"
                            image={image}
                            alt={title}
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: 2,
                                background: '#ffffff',
                                transition: 'transform 0.3s ease-in-out',
                                '&:hover': {
                                    transform: 'scale(1.05)'
                                }
                            }}
                        />
                    ) : image && image.includes('video') ? (
                        <video 
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: 8,
                                background: '#fff',
                            }}
                            controls
                            onClick={(e) => e.stopPropagation()}
                        >
                            <source src={image} type="video/mp4" />
                        </video>
                    ) : null}
                </Box>
                <CardContent sx={{ 
                    flexGrow: 1, 
                    p: { xs: 1.5, sm: 2 }, 
                    pt: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}>
                    <Typography 
                        variant="h6" 
                        component="div"
                        sx={{ 
                            fontWeight: 600,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            color: 'primary.main',
                            fontSize: { xs: '1rem', sm: '1.1rem' }
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            fontSize: { xs: '0.875rem', sm: '0.9rem' }
                        }}
                    >
                        {description}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                            fontSize: { xs: '0.875rem', sm: '0.9rem' },
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                        }}
                    >
                        📍 {location}
                    </Typography>
                    <Box sx={{ 
                        mt: 'auto',
                        pt: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                fontWeight: 700, 
                                color: 'primary.main',
                                fontSize: { xs: '1.1rem', sm: '1.25rem' }
                            }}
                        >
                            {price} TL
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {product.user.id !== localStorage.getItem('id') ? (
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={handleAddToCart}
                                    sx={{
                                        minWidth: 'auto',
                                        p: 0.5,
                                        background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #ea580c 30%, #f97316 90%)',
                                        }
                                    }}
                                >
                                    <ShoppingCartIcon fontSize="small" />
                                </Button>
                            ) : (
                                <Button
                                    size="small"
                                    variant="outlined"
                                    disabled
                                    sx={{
                                        minWidth: 'auto',
                                        p: 0.5,
                                        borderColor: 'text.disabled',
                                        color: 'text.disabled'
                                    }}
                                >
                                    <ShoppingCartIcon fontSize="small" />
                                </Button>
                            )}
                        </Box>
                    </Box>
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
        </>
    )
}

export default ProductsPage
