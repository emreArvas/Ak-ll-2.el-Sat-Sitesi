import { AppBar, Box, Toolbar, TextField, Button, IconButton, Badge, Typography } from '@mui/material'
import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { Link, useNavigate } from 'react-router-dom'

const TopBar = () => {
  const isLogin = localStorage.getItem('isLogin')
  const navigate = useNavigate()

  const logoutClick = () => {
    localStorage.setItem('isLogin', "false")
    navigate("/login")
  }

  return (
    <AppBar position="sticky" elevation={1} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Arvas Market
            </Typography>
          </Link>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            backgroundColor: 'grey.100',
            borderRadius: 2,
            px: 2,
            py: 0.5,
            width: 400
          }}>
            <SearchIcon sx={{ color: 'grey.500', mr: 1 }} />
            <TextField
              placeholder="Ürün ara..."
              variant="standard"
              fullWidth
              InputProps={{ disableUnderline: true }}
              sx={{ 
                '& .MuiInputBase-input': { 
                  py: 1,
                  fontSize: '0.9rem'
                }
              }}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isLogin === "true" ? (
            <>
              <Button
                startIcon={<AttachMoneyIcon />}
                variant="text"
                component={Link}
                to="/myproducts"
                sx={{ color: 'text.primary' }}
              >
                Ürünlerim
              </Button>
              <Button
                startIcon={<AttachMoneyIcon />}
                variant="text"
                component={Link}
                to="/myorders"
                sx={{ color: 'text.primary' }}
              >
                Siparişlerim
              </Button>
              <Button
                startIcon={<AttachMoneyIcon />}
                variant="text"
                component={Link}
                to="/incomingorders"
                sx={{ color: 'text.primary' }}
              >
                Gelen Siparişler
              </Button>
              <Button
                startIcon={<AddIcon />}
                variant="contained"
                component={Link}
                to="/productAdd"
                sx={{ 
                  backgroundColor: 'primary.main',
                  '&:hover': { backgroundColor: 'primary.dark' }
                }}
              >
                Ürün Ekle
              </Button>
              <IconButton component={Link} to="/carts" sx={{ color: 'text.primary' }}>
                <Badge badgeContent={0} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Button
                startIcon={<AccountCircleIcon />}
                variant="outlined"
                onClick={logoutClick}
                sx={{ 
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': { 
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.light',
                    color: 'primary.dark'
                  }
                }}
              >
                Çıkış Yap
              </Button>
            </>
          ) : (
            <>
              <IconButton component={Link} to="/carts" sx={{ color: 'text.primary' }}>
                <Badge badgeContent={0} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton component={Link} to="/likes" sx={{ color: 'text.primary' }}>
                <Badge badgeContent={0} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
              <Button
                startIcon={<AccountCircleIcon />}
                variant="contained"
                component={Link}
                to="/login"
                sx={{ 
                  backgroundColor: 'primary.main',
                  '&:hover': { backgroundColor: 'primary.dark' }
                }}
              >
                Giriş Yap
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
