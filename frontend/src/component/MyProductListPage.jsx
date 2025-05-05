
import {Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Container, IconButton, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DoneIcon from '@mui/icons-material/Done';

import {Button} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteProduct, updateProduct } from '../server/api';
import { Link, useNavigate } from 'react-router-dom'


const MyProductListPage = ({ product }) => {
    const { id, title, description, image, price, location, userId, user, datePosted } = product
    const [body, setBody] = useState({
        title: title,
        description: description,
        price : price
    });
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();
      const offEditMode=() => {
        setEdit(false);
    }
    const onEditMode=() => {
        setEdit(true);
    }
    const delProduct=() => {
        deleteProduct(id).then((res) => {
            if (res.status == 200) {
                alert("Ürün Silindi");
                navigate("/myproducts")
                 window.location.reload();
            }
        }).catch((err) => {
            console.log(err);
          });
    }
    const editProduct=() => {
        const bodies = {
            title: body.title,
            description: body.description,
            image: image,
            price : body.price,
            location : location
        }
        //console.log(bodies);
        updateProduct(id, bodies).then((res) => {
            if (res.status == 200) {
                alert("Ürün Güncellendi")
                window.location.reload();
            }
        }).catch((err)=>{console.log(err.response.date)})
    }
    const inputChange=(event) => {
        const { name, value } = event.target;
        setBody({ ...body, [name]: value });
    }
  return (
     <div id='products'>    
 <Card id='product-card'>
                <CardHeader
                    avatar={<Avatar>{user.username.charAt(0)}</Avatar>}
                    title={user.username}
              />
              {edit ? <CardContent>
                         <Container id='form-container'>
                      <TextField  onChange={inputChange} defaultValue={title} label="Başlık" name='title'></TextField>
                        </Container>
                  
                        <br />
                         <Container id='form-container'>
                     
                            <TextField onChange={inputChange} defaultValue={description} label="Açıklama" name='description'  multiline
        rows={4} 
                          sx={{ maxHeight: 200, width: 330, overflow: 'auto' }}  ></TextField>
                 
                        </Container>
               
                         <br />
                        
                          <Container id='form-container'>
                      
                      <TextField onChange={inputChange} defaultValue={price} label="Fiyat" type='number' name='price'></TextField>
                        </Container>
                       
                         <Container id='form-container'>
                      
                      
                        </Container>
                        
                    </CardContent>: <Button>
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
                        <video height={280} width='100%' controls>
                            <source src={image} type="video/mp4" />
                        </video> : null
                }  
</Button>}
              
  <Typography variant='h6'>
             {title} 
            </Typography>
            
                    <br />
                    <Typography id='price' variant='body1'>{price} TL</Typography>
                <CardActions id='action'>
                    <div className='product-action'>
                        <IconButton onClick={edit ? offEditMode : onEditMode}>
                            <EditIcon></EditIcon>
                        </IconButton >
                        <Typography>{edit ? "İptal" : "Düzenle" }</Typography>
                    </div>
                   
                    <div className='product-action'>
                        <IconButton onClick={edit ? editProduct : delProduct} >
                            {edit ? <DoneIcon></DoneIcon>:
                            <DeleteIcon></DeleteIcon>
                            }
                            
                        </IconButton>
                        <Typography>{edit ? "Tamam" : "Sil" }</Typography>
                    </div>
                </CardActions>
            </Card>
        
           
        </div>
  )
 
}

export default MyProductListPage
