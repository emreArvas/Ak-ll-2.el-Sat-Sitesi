import { AppBar, Box, Toolbar, Button, IconButton, Badge, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AddIcon from '@mui/icons-material/Add'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import MenuIcon from '@mui/icons-material/Menu'
import { Link, useNavigate } from 'react-router-dom'

const TopBar = () => {
  const isLogin = localStorage.getItem('isLogin')
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const logoutClick = () => {
    localStorage.setItem('isLogin', "false")
    navigate("/login")
  }

  const menuItems = isLogin === "true" ? [
    { text: 'Ürünlerim', icon: <AttachMoneyIcon />, to: '/myproducts' },
    { text: 'Siparişlerim', icon: <AttachMoneyIcon />, to: '/myorders' },
    { text: 'Gelen Siparişler', icon: <AttachMoneyIcon />, to: '/incomingorders' },
  ] : []

  return (
    <AppBar position="sticky" elevation={0} sx={{ 
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(8px)',
      borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
    }}>
      <Toolbar sx={{ 
        justifyContent: 'space-between', 
        py: 1.5,
        maxWidth: 'lg',
        width: '100%',
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h5" sx={{ 
              fontWeight: 800,
              background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.5px'
            }}>
              Arvas Market
            </Typography>
          </Link>
        </Box>

        {isMobile ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton 
              component={Link} 
              to="/carts" 
              sx={{ 
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(249, 115, 22, 0.08)'
                }
              }}
            >
              <Badge badgeContent={0} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              sx={{ 
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'rgba(249, 115, 22, 0.08)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1.5,
            '& .MuiButton-root': {
              minWidth: 'auto',
              px: 2
            }
          }}>
            {isLogin === "true" ? (
              <>
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    startIcon={item.icon}
                    variant="text"
                    component={Link}
                    to={item.to}
                    sx={{ 
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'rgba(249, 115, 22, 0.08)'
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  variant="contained"
                  component={Link}
                  to="/productAdd"
                  sx={{ 
                    ml: 1,
                    background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #ea580c 30%, #f97316 90%)',
                    }
                  }}
                >
                  Ürün Ekle
                </Button>
                <IconButton 
                  component={Link} 
                  to="/carts" 
                  sx={{ 
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'rgba(249, 115, 22, 0.08)'
                    }
                  }}
                >
                  <Badge badgeContent={0} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <Button
                  startIcon={<AccountCircleIcon />}
                  variant="outlined"
                  onClick={logoutClick}
                  sx={{ 
                    ml: 1,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': { 
                      borderColor: 'primary.dark',
                      backgroundColor: 'rgba(249, 115, 22, 0.08)',
                      color: 'primary.dark'
                    }
                  }}
                >
                  Çıkış Yap
                </Button>
              </>
            ) : (
              <>
                <IconButton 
                  component={Link} 
                  to="/carts" 
                  sx={{ 
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'rgba(249, 115, 22, 0.08)'
                    }
                  }}
                >
                  <Badge badgeContent={0} color="error">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <IconButton 
                  component={Link} 
                  to="/likes" 
                  sx={{ 
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'rgba(249, 115, 22, 0.08)'
                    }
                  }}
                >
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
                    ml: 1,
                    background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #ea580c 30%, #f97316 90%)',
                    }
                  }}
                >
                  Giriş Yap
                </Button>
              </>
            )}
          </Box>
        )}

        {isMobile && mobileMenuOpen && (
          <Box sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'white',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            py: 2,
            px: 2
          }}>
            {isLogin === "true" ? (
              <>
                {menuItems.map((item, index) => (
                  <Button
                    key={index}
                    startIcon={item.icon}
                    fullWidth
                    variant="text"
                    component={Link}
                    to={item.to}
                    sx={{ 
                      justifyContent: 'flex-start',
                      py: 1.5,
                      color: 'text.primary',
                      '&:hover': {
                        backgroundColor: 'rgba(249, 115, 22, 0.08)'
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
                <Button
                  startIcon={<AddIcon />}
                  fullWidth
                  variant="contained"
                  component={Link}
                  to="/productAdd"
                  sx={{ 
                    mt: 1,
                    background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #ea580c 30%, #f97316 90%)',
                    }
                  }}
                >
                  Ürün Ekle
                </Button>
                <Button
                  startIcon={<AccountCircleIcon />}
                  fullWidth
                  variant="outlined"
                  onClick={logoutClick}
                  sx={{ 
                    mt: 1,
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': { 
                      borderColor: 'primary.dark',
                      backgroundColor: 'rgba(249, 115, 22, 0.08)',
                      color: 'primary.dark'
                    }
                  }}
                >
                  Çıkış Yap
                </Button>
              </>
            ) : (
              <Button
                startIcon={<AccountCircleIcon />}
                fullWidth
                variant="contained"
                component={Link}
                to="/login"
                sx={{ 
                  background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #ea580c 30%, #f97316 90%)',
                  }
                }}
              >
                Giriş Yap
              </Button>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
