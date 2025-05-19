import React, { useEffect, useState } from 'react'
import { getProducts } from '../server/api'
import ProductsPage from '../component/ProductsPage'
import { Box, Container, Grid, Typography, useTheme, useMediaQuery } from '@mui/material'

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
   
    useEffect(() => {
        getProducts()
            .then((res) => {
                setProducts(res.data);
                setFilteredProducts(res.data);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            });
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter(product => 
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchQuery, products]);

    return (
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
                    Tüm Ürünler
                </Typography>
                <div style={{
                    position: 'relative',
                    maxWidth: '600px',
                    margin: '0 auto',
                    marginBottom: '2rem'
                }}>
                    <input
                        type="text"
                        placeholder="Ürün ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: isMobile ? '0.75rem 1rem' : '1rem 1.5rem',
                            paddingLeft: isMobile ? '2.5rem' : '3rem',
                            fontSize: isMobile ? '0.875rem' : '1rem',
                            border: '2px solid #e2e8f0',
                            borderRadius: '12px',
                            backgroundColor: '#f8fafc',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#f97316';
                            e.target.style.boxShadow = '0 0 0 3px rgba(249, 115, 22, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
                        }}
                    />
                    <svg
                        style={{
                            position: 'absolute',
                            left: isMobile ? '0.75rem' : '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: isMobile ? '16px' : '20px',
                            height: isMobile ? '16px' : '20px',
                            color: '#94a3b8'
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
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
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <ProductsPage product={product} />
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
                                {searchQuery ? 'Arama sonucu bulunamadı' : 'Henüz ürün bulunmuyor'}
                            </Typography>
                        </Box>
                    </Grid>
                )}
            </Grid>
        </Container>
    )
}

export default HomePage