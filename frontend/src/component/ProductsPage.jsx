import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Typography, Box, Button } from '@mui/material';
import React from 'react';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { addCart } from '../server/api';
import { useNavigate } from 'react-router-dom';

const ProductsPage = ({ product }) => {
    const { id, title, description, image, price, location, userId, user, datePosted } = product;
    const USERID = localStorage.getItem('id');
    const navigate = useNavigate();
    
    const addCartClick = () => {
        if (userId == USERID) {
            alert("Kendi Ürününü Sepete Ekleyemezsin");
        } else {
            addCart(USERID, id).then((res) => {
                if (res.status == 200) {
                    alert("Ürün Sepete Eklendi");
                    navigate("/carts");
                }
            }).catch((err) => { });
        }
    };

    return (
        <Card 
            sx={{ 
                width: 280,
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: 3,
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)',
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'translateY(-6px) scale(1.03)',
                },
                backgroundColor: 'secondary.main',
                m: 'auto'
            }}
        >
            <CardHeader
                avatar={
                    <Avatar 
                        sx={{ 
                            bgcolor: 'primary.main',
                            width: 40,
                            height: 40
                        }}
                    >
                        {user.username.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={<Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>{user.username}</Typography>}
                subheader={<Typography variant="caption" color="text.secondary">{new Date(datePosted).toLocaleDateString('tr-TR')}</Typography>}
                sx={{ pb: 0 }}
            />
            <Box sx={{ width: '100%', height: 140, position: 'relative', mb: 1, mt: 1, bgcolor: 'secondary.light', borderRadius: 2 }}>
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
                            background: 'secondary.light',
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
                    >
                        <source src={image} type="video/mp4" />
                    </video>
                ) : null}
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardContent sx={{ flexGrow: 1, p: 2, pt: 0 }}>
                    <Typography 
                        gutterBottom 
                        variant="h6" 
                        component="div"
                        sx={{ 
                            fontWeight: 600,
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 1,
                            WebkitBoxOrient: 'vertical',
                            color: 'primary.main'
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                            mb: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                        }}
                    >
                        {description}
                    </Typography>
                    <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ mb: 1 }}
                    >
                        {location}
                    </Typography>
                    <Typography 
                        variant="h6" 
                        sx={{ fontWeight: 700, mt: 1, color: 'primary.main' }}
                    >
                        {price} TL
                    </Typography>
                </CardContent>
                <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<AddShoppingCartIcon />}
                        onClick={addCartClick}
                        sx={{
                            fontWeight: 600,
                            fontSize: 16,
                            borderRadius: 2
                        }}
                    >
                        Sepete Ekle
                    </Button>
                </CardActions>
            </Box>
        </Card>
    );
};

export default ProductsPage;
