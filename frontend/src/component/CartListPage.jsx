import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Box, Button, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import { deleteCart } from '../server/api';

const CartListPage = ({ cart }) => {
    const { id, product, user } = cart;
    const { title, description, image, price, location } = product;
    const [isRemoved, setIsRemoved] = useState(false);
    const deleteToCart = () => {
        deleteCart(id).then((res) => {
            if (res.status == 200) {
                alert("Ürün Sepetten Kaldırıldı");
                window.location.reload();
            }
        }).catch((err) => { })
    }
    const handleSnackbarClose = () => {
        setIsRemoved(false);
    }
    const sendDetailPage = () => {
        // Detay sayfasına yönlendirme eklenebilir
    }
    return (
        <Box sx={{ p: 2 }}>
            <Card sx={{
                width: 320,
                borderRadius: 3,
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.06)',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                m: 'auto',
            }}>
                <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                    <IconButton onClick={deleteToCart} color="warning">
                        <ClearIcon />
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={isRemoved}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Ürün sepetten kaldırıldı"
            />
        </Box>
    )
}

export default CartListPage;
