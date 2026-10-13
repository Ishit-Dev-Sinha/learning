import { AppBar, Toolbar, Box, InputBase, IconButton, Badge, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router'

export function Header(props) {

    let totalQuantity = 0;

    for (let i of (props.cart || [])) {
        totalQuantity += i.quantity;
    }

    return (
           <AppBar position="fixed" sx={{ bgcolor: '#084f2d', height: '60px', justifyContent: 'center' }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: '15px !important' }}>
            
              <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center' }}>
                {/* Desktop logo: visible on screens sm (600px) and up */}
                <Box
                  component="img"
                  src="images/logo-white.png"
                  sx={{ height: 26, display: { xs: 'none', sm: 'block' } }}
                />
                {/* Mobile logo: visible only on extra-small screens */}
                <Box
                  component="img"
                  src="images/mobile-logo-white.png"
                  sx={{ height: 26, display: { xs: 'block', sm: 'none' } }}
                />
              </Box>

              <Box
                sx={{
                  flex: 1,
                  maxWidth: 850,
                  mx: 2,
                  display: 'flex',
                  bgcolor: 'white',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  height: 40,
                  alignItems: 'center',
                }}
              >
                <InputBase
                  placeholder="Search"
                  sx={{ flex: 1, px: 2, fontSize: 16 }}
                />
                <IconButton
                  sx={{
                    bgcolor: 'secondary.main', // your light green (#baffbe)
                    borderRadius: 0,
                    height: '100%',
                    width: 45,
                    '&:hover': { bgcolor: '#a3f5a8' },
                  }}
                >
                  <SearchIcon sx={{ color: 'black' }} />
                </IconButton>
              </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                width: { xs: 'auto', sm: 180 },
                gap: 2,
              }}
            >
              <Typography
                component={Link}
                to="/orders"
                sx={{
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: 15,
                  p: '5px 8px',
                  borderRadius: 1,
                  '&:hover': { border: '1px solid white' },
                }}
              >
                Orders
              </Typography>
              <Box
                component={Link}
                to="/checkout"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  p: '5px 8px',
                  borderRadius: 1,
                  '&:hover': { border: '1px solid white' },
                }}
              >
                <Badge badgeContent={totalQuantity} color="error">
                  <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
                </Badge>
                <Typography sx={{ ml: 1, fontWeight: 700, fontSize: 15 }}>Cart</Typography>
              </Box>
            </Box>
            </Toolbar>
        </AppBar>
    );
}