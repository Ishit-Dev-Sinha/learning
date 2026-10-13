import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Header } from '../components/Header.jsx';
import { Product } from '../components/Product.jsx'
import api from '../api';

export function HomePage({ cartItems, fetchCartData }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const response = await api.get('/products');
            setProducts(response.data);
        }

        fetchProducts();
    }, []);

    return (
        <>
            <title>Ecommerce project</title>

            <Header cart={cartItems} />

            <Box component="main" sx={{ mt: '60px' }}>
                <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                    xl: 'repeat(6, 1fr)',
                    },
                }}
                >
                {products.map((product) => (
                    <Product
                    key={product.id}
                    product={product}
                    fetchCartData={fetchCartData}
                    />
                ))}
                </Box>
            </Box>
        </>
    );
}