import { Header } from '../components/Header.jsx';
import { Container, Box, Typography, Link as MuiLink, LinearProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router';

export function TrackingPage({ cart = [] }) {
    return (
        <>
            <Header cart={cart} />

            <Container maxWidth="md" sx={{ mt: '100px', mb: '100px' }}>
                <Box sx={{ maxWidth: 600, mx: 'auto' }}>
                    <MuiLink
                        component={RouterLink}
                        to="/orders"
                        sx={{ color: 'primary.main', textDecoration: 'none', display: 'inline-block', mb: 3.5, fontWeight: 500 }}
                    >
                        View all orders
                    </MuiLink>

                    <Typography variant="h5" fontWeight={700} sx={{ mb: 1.5 }}>
                        Arriving on Monday, June 13
                    </Typography>

                    <Typography sx={{ mb: 0.5 }}>
                        Black and Gray Athletic Cotton Socks - 6 Pairs
                    </Typography>

                    <Typography sx={{ mb: 3 }}>
                        Quantity: 1
                    </Typography>

                    <Box
                        component="img"
                        src="images/products/athletic-cotton-socks-6-pairs.jpg"
                        sx={{ maxWidth: 150, maxHeight: 150, my: 3, display: 'block' }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, fontSize: { xs: 16, sm: 18 }, fontWeight: 500 }}>
                        <Typography color="text.secondary">Preparing</Typography>
                        <Typography sx={{ color: 'primary.main', fontWeight: 700 }}>Shipped</Typography>
                        <Typography color="text.secondary">Delivered</Typography>
                    </Box>

                    <LinearProgress
                        variant="determinate"
                        value={50}
                        sx={{
                            height: 25,
                            borderRadius: 12,
                            bgcolor: 'grey.300',
                            border: '1px solid #c8c8c8',
                            '& .MuiLinearProgress-bar': { bgcolor: 'primary.main', borderRadius: 12 }
                        }}
                    />
                </Box>
            </Container>
        </>
    );
}