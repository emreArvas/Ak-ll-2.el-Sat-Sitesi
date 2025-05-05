import React, { useEffect, useState } from 'react'
import { getProducts } from '../server/api'
import ProductsPage from '../component/ProductsPage'
import { Box, Container, Grid, Typography } from '@mui/material'

const HomePage = () => {
    const [products, setProducts] = useState([]);
   
    useEffect(() => {
        getProducts()
            .then((res) => {
                setProducts(res.data);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            });
    }, []);

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" sx={{ 
                    fontWeight: 700,
                    mb: 2,
                    color: 'text.primary'
                }}>
                    Tüm Ürünler
                </Typography>
            </Box>
            
            <Grid 
                container 
                spacing={4}
                sx={{
                    '& > .MuiGrid-item': {
                        display: 'flex',
                        justifyContent: 'center'
                    }
                }}
            >
                {products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <ProductsPage product={product} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default HomePage