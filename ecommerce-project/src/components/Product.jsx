// STEP 4 (Product Component Migration):
// 1. Useful MUI components to import:
import { Card, Box, Typography, Button, FormControl, Select, MenuItem, Rating, Fade } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
import api from '../api';

export function Product({ product, fetchCartData }) {
    const [quantity, setQuantity] = useState(1);
    const [popupIsVisible, setPopupIsVisible] = useState(false);
    async function addToCart() {
        await api.post('/cart-items', {
            productId: product.id,
            quantity: quantity
        });
        fetchCartData();
        setPopupIsVisible(true);
        setTimeout(() => {
            setPopupIsVisible(false);
        }, 1000);
    }

    function selectQuantity(event) {
        setQuantity(Number(event.target.value));
    }

    return (
          <Card
            variant="outlined"
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              p: 2.5,
              borderRadius: 0,
              borderColor: '#f0f0f0',
            }}
          >
            
            <Box sx={{ height: 180, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
              <Box
                component="img"
                src={product.image}
                sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </Box>

            <Typography
              sx={{
                height: 40,
                mb: 0.5,
                fontSize: 14,
                lineHeight: '20px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
              <Rating value={product.rating.stars} precision={0.5} readOnly size="small" />
              <Typography sx={{ color: 'primary.main', fontSize: 14, ml: 1 }}>
                {product.rating.count}
              </Typography>
            </Box>

            <Typography sx={{ fontWeight: 700, mb: 1.5 }}>
              ${(product.priceCents / 100).toFixed(2)}
            </Typography>

            <FormControl size="small" sx={{ mb: 2, width: 80 }}>
              <Select
                value={quantity}
                onChange={selectQuantity}
                sx={{ height: 32, fontSize: 14, bgcolor: 'white' }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box sx={{ flex: 1 }} />

            <Fade in={popupIsVisible}>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', fontSize: 16, mb: 1, minHeight: 24 }}>
                <CheckCircleIcon sx={{ fontSize: 19, mr: 0.8 }} />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>Added</Typography>
              </Box>
            </Fade>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addToCart}
              sx={{
                textTransform: 'none',
                borderRadius: '5px',
                py: 0.8,
                boxShadow: '0 2px 5px rgba(220, 220, 220, 0.5)',
              }}
            >
              Add to Cart
            </Button>
          </Card>
    );
}