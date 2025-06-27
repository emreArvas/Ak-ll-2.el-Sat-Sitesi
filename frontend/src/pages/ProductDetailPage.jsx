import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../server/api';
import { 
    Container, 
    Box, 
    Typography, 
    CircularProgress,
    Paper,
    Grid,
    Divider
} from '@mui/material';

const ProductDetailPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProduct(id);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!product) {
        return (
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Typography variant="h5" color="error" align="center">
                    Ürün bulunamadı
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                width: '100%',
                                height: { xs: '300px', md: '500px' },
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: '#f8fafc',
                                borderRadius: 2,
                                overflow: 'hidden'
                            }}
                        >
                            {product.image && product.image.includes('image') ? (
                                <Box
                                    component="img"
                                    src={product.image}
                                    alt={product.title}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.05)'
                                        }
                                    }}
                                />
                            ) : product.image && product.image.includes('video') ? (
                                <video 
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'contain',
                                        borderRadius: 8,
                                    }}
                                    controls
                                >
                                    <source src={product.image} type="video/mp4" />
                                </video>
                            ) : (
                                <Typography variant="body1" color="text.secondary">
                                    Görsel bulunamadı
                                </Typography>
                            )}
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {product.title}
                        </Typography>
                        <Typography 
                            variant="h5" 
                            color="primary" 
                            sx={{ 
                                fontWeight: 'bold',
                                mb: 2,
                                color: '#f97316'
                            }}
                        >
                            {product.price} TL
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body1" paragraph>
                            {product.description}
                        </Typography>
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="subtitle1" color="text.secondary">
                                Konum: {product.location}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                Satıcı: {product.sellerName}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ProductDetailPage; 