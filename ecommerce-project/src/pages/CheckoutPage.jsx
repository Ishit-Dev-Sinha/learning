import dayjs from 'dayjs'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import api from '../api'
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Typography,
  Card,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Divider,
  Link as MuiLink,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export function CheckoutPage({ cart, fetchCartData }) {

    let totalQuantity = 0;

    for (let i of cart) {
        totalQuantity += i.quantity;
    }

    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    const navigate = useNavigate();

    async function fetchDeliveryOptions() {
        const response = await api.get('/delivery-options?expand=estimatedDeliveryTime');
        setDeliveryOptions(response.data);
    }

    async function fetchPaymentSummary() {
        const response = await api.get('/payment-summary');
        setPaymentSummary(response.data);
    }

    useEffect(() => {
        fetchDeliveryOptions();
        fetchPaymentSummary();
    }, [cart]);

    async function updateDeliveryOption(id, productId) {
        try {
            const response = await api.put(`/cart-items/${productId}`, {
                deliveryOptionId: id
            });
            if (response.status === 200) {
                await fetchCartData();
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteCartItem(productId) {
        const response = await api.delete(`/cart-items/${productId}`);
        if (response.status === 204) {
            await fetchCartData();
        }
    }

    async function addCartItem(productId, itemQuantity) {
        itemQuantity++;
        const response = await api.put(`/cart-items/${productId}`, {
            quantity: itemQuantity
        });
        if (response.status === 200) {
            await fetchCartData();
        }
    }

    async function subCartItem(productId, itemQuantity) {
        let response;
        if (itemQuantity > 1) {
            itemQuantity--;
            response = await api.put(`/cart-items/${productId}`, {
                quantity: itemQuantity
            });
        }
        else {
            response = await api.delete(`/cart-items/${productId}`);
        }
        if (response.status === 200 || response.status === 204) {
            await fetchCartData();
        }
    }

    async function createOrder() {
        const response = await api.post('/orders');
        if (response.status === 201) {
            await fetchCartData();
            navigate('/orders');
        }
    }

    return (
        <>
            <title>Checkout Page</title>
            <AppBar position="fixed" color="inherit" elevation={1} sx={{ bgcolor: 'white', height: 60, justifyContent: 'center' }}>
                <Toolbar sx={{ maxWidth: 1100, width: '100%', mx: 'auto', display: 'flex', justifyContent: 'space-between', px: 2 }}>
                    <Box component="a" href="/" sx={{ width: { xs: 'auto', sm: 200 } }}>
                        <Box component="img" src="images/logo.png" sx={{ height: 26, display: { xs: 'none', sm: 'block' } }} />
                        <Box component="img" src="images/mobile-logo.png" sx={{ height: 26, display: { xs: 'block', sm: 'none' } }} />
                    </Box>

                    <Typography variant="h6" sx={{ fontWeight: 500, fontSize: { xs: 18, sm: 22 } }}>
                        Checkout (<MuiLink href="/" sx={{ color: 'primary.main', textDecoration: 'none' }}>{`${totalQuantity} items`}</MuiLink>)
                    </Typography>

                    <Box sx={{ width: { xs: 'auto', sm: 200 }, display: 'flex', justifyContent: 'flex-end' }}>
                        <LockOutlinedIcon sx={{ color: 'grey.600', fontSize: 26 }} />
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="lg" sx={{ mt: '100px', mb: '100px' }}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 2.5 }}>Review your order</Typography>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 350px' },
                    gap: 3,
                    alignItems: 'start'
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {
                            deliveryOptions.length > 0 && cart.map((item) => {
                                let selectedDate;
                                for (let i of deliveryOptions) {
                                    if (i.id === item.deliveryOptionId) {
                                        selectedDate = dayjs(i.estimatedDeliveryTimeMs).format('dddd, MMMM D');
                                    }
                                }
                                return (
                                    <Card key={item.productId} variant="outlined" sx={{ p: 2.5, borderRadius: 1 }}>
                                        <Typography sx={{ color: 'primary.main', fontWeight: 700, fontSize: 18, mb: 2 }}>
                                            {`Delivery date: ${selectedDate}`}
                                        </Typography>

                                        <Box sx={{
                                            display: 'grid',
                                            gridTemplateColumns: { xs: '100px 1fr', md: '100px 1fr 1fr' },
                                            gap: 3
                                        }}>
                                            <Box
                                                component="img"
                                                src={item.product.image}
                                                sx={{ maxWidth: '100%', maxHeight: 120, mx: 'auto', display: 'block', objectFit: 'contain' }}
                                            />

                                            <Box>
                                                <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                                                    {item.product.name}
                                                </Typography>
                                                <Typography fontWeight={700} sx={{ mb: 1, color: 'text.secondary' }}>
                                                    ${item.product.priceCents / 100}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
                                                    <Typography variant="body2">
                                                        Quantity: <b>{item.quantity}</b>
                                                    </Typography>
                                                    <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 0.5, color: 'primary.main', textTransform: 'none' }} onClick={() => addCartItem(item.productId, item.quantity)}>
                                                        Add(+1)
                                                    </Button>
                                                    <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 0.5, color: 'primary.main', textTransform: 'none' }} onClick={() => subCartItem(item.productId, item.quantity)}>
                                                        Remove(-1)
                                                    </Button>
                                                    <Button size="small" variant="text" sx={{ minWidth: 'auto', p: 0.5, color: 'error.main', textTransform: 'none' }} onClick={() => deleteCartItem(item.productId)}>
                                                        Delete
                                                    </Button>
                                                </Box>
                                            </Box>

                                            <FormControl component="fieldset" sx={{ gridColumn: { xs: 'span 2', md: 'auto' } }}>
                                                <Typography fontWeight={700} sx={{ mb: 1 }}>
                                                    Choose a delivery option:
                                                </Typography>
                                                <RadioGroup value={String(item.deliveryOptionId)}>
                                                    {deliveryOptions.map((option) => (
                                                        <FormControlLabel
                                                            key={option.id}
                                                            value={String(option.id)}
                                                            control={<Radio color="primary" size="small" />}
                                                            onChange={() => updateDeliveryOption(option.id, item.productId)}
                                                            label={
                                                                <Box sx={{ my: 0.5 }}>
                                                                    <Typography variant="body2" fontWeight={600} color="primary.main">
                                                                        {dayjs(option.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                                                    </Typography>
                                                                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                                                        {option.priceCents === 0 ? 'FREE Delivery' : `$${option.priceCents / 100} - Shipping`}
                                                                    </Typography>
                                                                </Box>
                                                            }
                                                        />
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                        </Box>
                                    </Card>
                                );
                            })
                        }
                    </Box>

                    <Card variant="outlined" sx={{ p: 2.5, borderRadius: 1 }}>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
                            Payment Summary
                        </Typography>

                        {paymentSummary && (
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Items ({paymentSummary.totalItems}):</Typography>
                                    <Typography variant="body2">${paymentSummary.productCostCents / 100}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Shipping &amp; handling:</Typography>
                                    <Typography variant="body2">${paymentSummary.shippingCostCents / 100}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body2">Total before tax:</Typography>
                                    <Typography variant="body2">${paymentSummary.totalCostBeforeTaxCents / 100}</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                    <Typography variant="body2">Estimated tax (10%):</Typography>
                                    <Typography variant="body2">${paymentSummary.taxCents / 100}</Typography>
                                </Box>

                                <Divider sx={{ my: 1.5 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                    <Typography variant="subtitle1" fontWeight={700} color="error.dark">
                                        Order total:
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight={700} color="error.dark">
                                        ${paymentSummary.totalCostCents / 100}
                                    </Typography>
                                </Box>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    onClick={createOrder}
                                    sx={{ py: 1.2, textTransform: 'none', fontWeight: 600, borderRadius: 1 }}
                                >
                                    Place your order
                                </Button>
                            </>
                        )}
                    </Card>
                </Box>
            </Container>
        </>
    );
}