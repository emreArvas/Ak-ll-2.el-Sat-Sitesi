import React from 'react'
import { Card, CardContent, CardMedia, Typography, Box, Button, useTheme, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteIcon from '@mui/icons-material/Favorite'

const ProductsPage = ({ product }) => {
    const { title, description, price, image, location } = product
    const navigate = useNavigate()
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    const handleClick = () => {
        navigate(`/product/${product.id}`)
    }

    return (
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
                bgcolor: 'secondary.light', 
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
                            background: 'secondary.light',
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
                        <Button
                            size="small"
                            variant="outlined"
                            sx={{
                                minWidth: 'auto',
                                p: 0.5,
                                borderColor: 'primary.main',
                                color: 'primary.main',
                                '&:hover': {
                                    borderColor: 'primary.dark',
                                    backgroundColor: 'rgba(249, 115, 22, 0.08)',
                                }
                            }}
                        >
                            <FavoriteIcon fontSize="small" />
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
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
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default ProductsPage
