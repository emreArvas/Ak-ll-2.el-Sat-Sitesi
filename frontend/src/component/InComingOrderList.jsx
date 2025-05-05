import { Avatar, Container, Select, FormControl, MenuItem, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button, Snackbar } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import { cancelOrder, updateOrderStatus } from '../server/api';

const InComingOrderList = ({ order }) => {
    const status = [
        "Sipariş Alındı", "Onaylandı", "Kargoda", "Teslim Edildi"
    ];
    const [body, setBody] = useState({ status: null })
    const [orderS, setOrderS] = useState("");
    const { id, product, orderStatus, datePosted } = order;
    const { image, title, description, price, location } = product;
    
    const handleStatusChange = (event) => {
        setOrderS(event.target.value);
    }

    const deleteToOrder = async () => {
        try {
            await cancelOrder(id);
            alert("Sipariş iptal edildi")
            window.location.reload();
        } catch (err) {
            alert("Sipariş iptal edilemedi")
        }
    }

    const updateToStatus = async () => {
        setBody({ status: orderS });
        try {
            console.log(body); // 
            const res = await updateOrderStatus(id, body);
            if (res.status === 200) {
                alert("Sipariş Durumu Güncellendi")
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    }

    const sendDetailPage = () => {
        // Detay sayfasına gitmek için gerekli işlemler eklenebilir
    }

    return (
        <div>
            <div id='products'>
                <Card id='product-card'>
                    <Button onClick={sendDetailPage}>
                        {image && image.includes('image') ?
                            <CardMedia
                                component="img"
                                height={220}
                                image={image}
                                alt=""
                                sx={{
                                    objectFit: 'contain',
                                }}
                            /> : image && image.includes('video') ?
                                <video height={217} width='100%' controls>
                                    <source src={image} type="video/mp4" />
                                </video> : null
                        }
                    </Button>
                    <CardContent>
                        <Typography variant='h5'>{title}</Typography>
                        <br />
                        <Typography variant='h6'>
                            {description}
                        </Typography>
                        <br />
                        <Container id='form-container'>
                            <FormControl>
                                <label ><h3>Sipariş Durumu: { orderStatus}</h3></label>
                                <Select
                                    labelId="location-label"
                                    id="location-select"
                                    placeholder={orderStatus}                                    value={orderS}
                                    onChange={handleStatusChange}
                                >
                                    {status.map((stat, index) => {
                                        return <MenuItem key={index} value={stat}>{stat}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Container>
                        <br />
                        <br />
                        <Button onClick={updateToStatus} id='update' color='error' variant='outlined'>GÜNCELLE</Button>
                        <br />
                        <br />
                        <Button onClick={deleteToOrder} id='delete' color='error' variant='outlined'>İPTAL</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default InComingOrderList;
