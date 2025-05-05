import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button, Snackbar } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';
import { cancelOrder } from '../server/api';

const MyOrderListPage = ({ order }) => {
    const { id, product,orderStatus,datePostes } = order;
    const { image, title, description ,price,location} = product;
    const deleteToOrder =async() => {
        try { 
            await cancelOrder(id);
            alert("Sipariş iptal edildi")
            window.location.reload();
        } catch (err) {
          alert("Sipariş iptal edilemedi")
      }
    }
    const sendDetailPage=() => {
      
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
                      <Typography id='price' variant='body1'>{orderStatus}</Typography>
                      <br />
                      <br />
                      <Button onClick={deleteToOrder} id='delete' color='error' variant='outlined'>İPTAL</Button>
                </CardContent>
            </Card>
           
        </div>
    </div>
  )
}

export default MyOrderListPage
