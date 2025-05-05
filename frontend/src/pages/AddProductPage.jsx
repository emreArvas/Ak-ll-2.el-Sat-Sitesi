
import { Button, Container, TextField,Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link,useNavigate } from 'react-router-dom';
import { addProduct } from '../server/api';

const AddProductPage = () => {
    const turkishCities = [
        "Adana",
  "Adıyaman",
  "Afyonkarahisar",
  "Ağrı",
  "Amasya",
  "Ankara",
  "Antalya",
  "Artvin",
  "Aydın",
  "Balıkesir",
  "Bilecik",
  "Bingöl",
  "Bitlis",
  "Bolu",
  "Burdur",
  "Bursa",
  "Çanakkale",
  "Çankırı",
  "Çorum",
  "Denizli",
  "Diyarbakır",
  "Edirne",
  "Elazığ",
  "Erzincan",
  "Erzurum",
  "Eskişehir",
  "Gaziantep",
  "Giresun",
  "Gümüşhane",
  "Hakkari",
  "Hatay",
  "Isparta",
  "Mersin",
  "İstanbul",
  "İzmir",
  "Kars",
  "Kastamonu",
  "Kayseri",
  "Kırklareli",
  "Kırşehir",
  "Kocaeli",
  "Konya",
  "Kütahya",
  "Malatya",
  "Manisa",
  "Kahramanmaraş",
  "Mardin",
  "Muğla",
  "Muş",
  "Nevşehir",
  "Niğde",
  "Ordu",
  "Rize",
  "Sakarya",
  "Samsun",
  "Siirt",
  "Sinop",
  "Sivas",
  "Tekirdağ",
  "Tokat",
  "Trabzon",
  "Tunceli",
  "Şanlıurfa",
  "Uşak",
  "Van",
  "Yozgat",
  "Zonguldak",
  "Aksaray",
  "Bayburt",
  "Karaman",
  "Kırıkkale",
  "Batman",
  "Şırnak",
  "Bartın",
  "Ardahan",
  "Iğdır",
  "Yalova",
  "Karabük",
  "Kilis",
  "Osmaniye",
  "Düzce"
  ];
  const id = localStorage.getItem("id");
  const [body, setBody] = useState({});
  const [errors, setErrors] = useState({});
    const isLogin = localStorage.getItem("isLogin");
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedImage, setImage] = useState("");
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
    const productAdd=() => {
      const bodies = {
        title: body.title,
        description: body.title,
        image: selectedImage,
        price: body.price,
        location : selectedLocation
      }
      addProduct(id, bodies).then((res) => {
        console.log(res);
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
      
      <div>
        <div className={errors?.Description!=null ? 'error-m' : ""}>{errors?.Description}</div>
        <div className={errors?.Title!=null ? 'error-m' : ""}>{errors?.Title}</div>
        <div className={errors?.Location!=null ? 'error-m' : ""}>{errors?.Location}</div>
        <div className={errors?.Price!=null ? 'error-m' : ""}>{errors?.Price}</div>
          {isLogin ?
              <form className='product-form' >
                  <h1 id='title'>Arvas</h1>
                  <h3 id='title'>Ürün Ekle</h3>
                  <Container id='form-container'>
                      <label ><h3>Başlık</h3> </label>
                      <TextField onChange={inputChange} name='title'></TextField>
                  </Container>
               
                    <Container id='form-container'>
                      <label ><h3>Açıklama</h3></label>
                      <TextField onChange={inputChange} name='description'  multiline
        rows={4} 
                          sx={{ maxHeight: 200, overflow: 'auto' }}  ></TextField>
                
                  </Container>
                    
                
                   <Container id='form-container'>
                      <label ><h3>Fiyat</h3></label>
                      <TextField type='number' onChange={inputChange} name='price'></TextField>
                    </Container>
                     <Container id='form-container'>
                        <FormControl>
                             <label ><h3>Konum</h3></label>
                            <Select
                                labelId="location-label"
                                id="location-select"
                                value={selectedLocation}
                                onChange={handleLocationChange}
                            >
                                {turkishCities.map(city => (
                                    <MenuItem key={city} value={city}>{city}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Container>
                    <Container id='form-container'>
                      <label ><h3>Resim</h3></label>
                      <input onChange={handleChangeImage} name='image' type='file'></input>
                  </Container>
                  
         
          <Button  onClick={productAdd} id='product-button'  variant='contained'>Ürünü Ekle</Button>
    
                 
                  
          </form> :
              <Link to="/admin-login">Bu Sayfayi Görüntüleme Yetkiniz Yok Giriş Yap</Link>}
    </div>
  )
}

export default AddProductPage
