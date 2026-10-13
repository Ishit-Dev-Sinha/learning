import { Header } from '../components/Header.jsx';
import { useEffect, useState, Fragment } from 'react';
import dayjs from 'dayjs';
import api from '../api';
import { Container, Box, Typography, Card, Button, Stack } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { Link as RouterLink } from 'react-router';

export function OrdersPage({ cart, fetchCartData }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            const response = await api.get('/orders?expand=products');
            setOrders(response.data);
        }

        fetchOrders();
    }, []);

    return (
        <>
            <Header cart={cart} />

            <Container maxWidth="md" sx={{ mt: '100px', mb: '100px' }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>Your Orders</Typography>

                <Stack spacing={4}>
                    {
                        orders.map((order) => {
                            return (
                                <Card key={order.id} variant="outlined" sx={{ borderRadius: 1.5, overflow: 'hidden' }}>
                                    <Box sx={{
                                        bgcolor: '#f5f5f5',
                                        p: 2.5,
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        justifyContent: 'space-between',
                                        gap: 2
                                    }}>
                                        <Box sx={{ display: 'flex', gap: 4 }}>
                                            <Box>
                                                <Typography variant="caption" fontWeight={700} color="text.secondary">Order Placed:</Typography>
                                                <Typography variant="body2">{dayjs(order.orderTimeMs).format('MMMM DD')}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" fontWeight={700} color="text.secondary">Total:</Typography>
                                                <Typography variant="body2">{`$${order.totalCostCents / 100}`}</Typography>
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="caption" fontWeight={700} color="text.secondary">Order ID:</Typography>
                                            <Typography variant="body2">{order.id}</Typography>
                                        </Box>
                                    </Box>

                                    <Box sx={{
                                        p: 3,
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr', sm: '110px 1fr 180px' },
                                        gap: 3,
                                        alignItems: 'center'
                                    }}>
                                        {
                                            order.products.map((product) => {
                                                return (
                                                    <Fragment key={product.product.id}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                                            <Box component="img" src={product.product.image} sx={{ maxWidth: 110, maxHeight: 110, objectFit: 'contain' }} />
                                                        </Box>

                                                        <Box>
                                                            <Typography fontWeight={700} sx={{ mb: 0.5 }}>{product.product.name}</Typography>
                                                            <Typography variant="body2" sx={{ mb: 0.5 }}>{`Arriving on: ${dayjs(product.estimatedDeliveryTimeMs).format('MMMM DD')}`}</Typography>
                                                            <Typography variant="body2" sx={{ mb: 1.5 }}>{`Quantity: ${product.quantity}`}</Typography>
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                size="small"
                                                                startIcon={<ReplayIcon />}
                                                                onClick={async () => {
                                                                    await api.post('/cart-items', {
                                                                        productId: product.id,
                                                                        quantity: 1
                                                                    });
                                                                    fetchCartData();
                                                                }}
                                                                sx={{ textTransform: 'none', borderRadius: 1 }}
                                                            >
                                                                Add to Cart
                                                            </Button>
                                                        </Box>

                                                        <Box sx={{ alignSelf: { xs: 'stretch', sm: 'start' } }}>
                                                            <Button
                                                                variant="outlined"
                                                                color="inherit"
                                                                fullWidth
                                                                component={RouterLink}
                                                                to="/tracking"
                                                                sx={{ textTransform: 'none', borderColor: '#ccc' }}
                                                            >
                                                                Track package
                                                            </Button>
                                                        </Box>
                                                    </Fragment>
                                                );
                                            })
                                        }
                                    </Box>
                                </Card>
                            );
                        })
                    }
                </Stack>
            </Container>
        </>
    );
}