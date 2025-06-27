import { Button, Container, TextField, Select, MenuItem, FormControl, InputLabel, Box, CircularProgress, Paper, Typography, Fade } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { addProduct } from '../server/api';
import { analyzeImage } from '../utils/geminiApi';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { motion } from 'framer-motion';

const AddProductPage = () => {
    const turkishCities = [
        "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin", "Aydın", "Balıkesir",
        "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır",
        "Edirne", "Elazığ", "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay",
        "Isparta", "Mersin", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir", "Kocaeli",
        "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu",
        "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa",
        "Uşak", "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman", "Şırnak", "Bartın",
        "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
    ];

    const id = localStorage.getItem("id");
    const [body, setBody] = useState({});
    const [errors, setErrors] = useState({});
    const isLogin = localStorage.getItem("isLogin");
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedImage, setImage] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const navigate = useNavigate();

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    }

    const inputChange = (event) => {
        const { name, value } = event.target;
        setBody({ ...body, [name]: value });
        setErrors({});
    }

    const handleChangeImage = (event) => {
        const file = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImage(fileReader.result);
        }
        fileReader.readAsDataURL(file);
    }

    const handleAnalyzeImage = async () => {
        if (!selectedImage) {
            alert("Lütfen önce bir resim yükleyin");
            return;
        }

        if (!body.title || !body.description) {
            alert("Lütfen başlık ve açıklama alanlarını doldurun");
            return;
        }

        setIsAnalyzing(true);
        try {
            const suggestedPrice = await analyzeImage(body.title, body.description);
            if (suggestedPrice) {
                setBody(prev => ({ ...prev, price: suggestedPrice }));
            } else {
                alert("Üzgünüm, fiyat tahmini yapamadım. Lütfen manuel olarak girin.");
            }
        } catch (error) {
            console.error("Error analyzing image:", error);
            alert("Fiyat tahmini sırasında bir hata oluştu. Lütfen manuel olarak girin.");
        } finally {
            setIsAnalyzing(false);
        }
    }

    const productAdd = () => {
        const bodies = {
            title: body.title,
            description: body.description,
            image: selectedImage,
            price: body.price,
            location: selectedLocation
        }
        addProduct(id, bodies).then((res) => {
            if (res.status == 200) {
                alert("Ürün Eklendi")
                navigate("/")
            }
        }).catch((err) => {
            console.log(err.response.data);
            setErrors(err.response.data.errors)
        })
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className={errors?.Description != null ? 'error-m' : ""}>{errors?.Description}</div>
            <div className={errors?.Title != null ? 'error-m' : ""}>{errors?.Title}</div>
            <div className={errors?.Location != null ? 'error-m' : ""}>{errors?.Location}</div>
            <div className={errors?.Price != null ? 'error-m' : ""}>{errors?.Price}</div>
            {isLogin ?
                <Paper 
                    elevation={3}
                    sx={{
                        maxWidth: 800,
                        mx: 'auto',
                        p: 4,
                        mt: 4,
                        borderRadius: 2,
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Typography variant="h1" align="center" gutterBottom sx={{ color: 'primary.main', mb: 4 }}>
                            ARVAS
                        </Typography>
                        <Typography variant="h2" align="center" gutterBottom sx={{ mb: 4 }}>
                            Ürün Ekle
                        </Typography>
                    </motion.div>

                    <Box component="form" className='product-form' sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <Typography variant="h3" gutterBottom>Başlık</Typography>
                            <TextField 
                                fullWidth 
                                onChange={inputChange} 
                                name='title'
                                variant="outlined"
                                sx={{ 
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                    },
                                }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Typography variant="h3" gutterBottom>Açıklama</Typography>
                            <TextField 
                                fullWidth
                                onChange={inputChange} 
                                name='description' 
                                multiline
                                rows={4}
                                variant="outlined"
                                sx={{ 
                                    '& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                            borderColor: 'primary.main',
                                        },
                                    },
                                }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Typography variant="h3" gutterBottom>Fiyat</Typography>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <TextField 
                                    fullWidth
                                    type='number' 
                                    onChange={inputChange} 
                                    name='price'
                                    value={body.price || ''}
                                    variant="outlined"
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleAnalyzeImage}
                                    disabled={isAnalyzing || !selectedImage}
                                    startIcon={isAnalyzing ? <CircularProgress size={20} color="inherit" /> : <AutoAwesomeIcon />}
                                    sx={{
                                        background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
                                        '&:hover': {
                                            background: 'linear-gradient(45deg, #ea580c 30%, #f97316 90%)',
                                        },
                                        minWidth: 200,
                                    }}
                                >
                                    {isAnalyzing ? 'Analiz Ediliyor...' : 'AI ile Fiyat Belirle'}
                                </Button>
                            </Box>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <Typography variant="h3" gutterBottom>Konum</Typography>
                            <FormControl fullWidth>
                                <Select
                                    value={selectedLocation}
                                    onChange={handleLocationChange}
                                    variant="outlined"
                                    sx={{ 
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            '&:hover': {
                                                borderColor: 'primary.main',
                                            },
                                        },
                                    }}
                                >
                                    {turkishCities.map(city => (
                                        <MenuItem key={city} value={city}>{city}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Typography variant="h3" gutterBottom>Resim</Typography>
                            <Box
                                sx={{
                                    border: '2px dashed',
                                    borderColor: 'primary.main',
                                    borderRadius: 2,
                                    p: 3,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        borderColor: 'primary.dark',
                                        backgroundColor: 'rgba(249, 115, 22, 0.04)',
                                    },
                                }}
                                component="label"
                            >
                                <input
                                    type="file"
                                    hidden
                                    onChange={handleChangeImage}
                                    accept="image/*"
                                />
                                <Typography>
                                    {selectedImage ? 'Resmi değiştirmek için tıklayın' : 'Resim yüklemek için tıklayın'}
                                </Typography>
                            </Box>
                            <Fade in={!!selectedImage}>
                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                    <img 
                                        src={selectedImage} 
                                        alt="Yüklenen ürün" 
                                        style={{ 
                                            maxWidth: '300px', 
                                            maxHeight: '300px', 
                                            objectFit: 'contain',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        }} 
                                    />
                                </Box>
                            </Fade>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            <Button 
                                onClick={productAdd} 
                                variant='contained'
                                fullWidth
                                size="large"
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    background: 'linear-gradient(45deg, #f97316 30%, #fb923c 90%)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #ea580c 30%, #f97316 90%)',
                                    },
                                }}
                            >
                                Ürünü Ekle
                            </Button>
                        </motion.div>
                    </Box>
                </Paper> :
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Link to="/admin-login">Bu Sayfayi Görüntüleme Yetkiniz Yok Giriş Yap</Link>
                </motion.div>}
        </motion.div>
    )
}

export default AddProductPage
