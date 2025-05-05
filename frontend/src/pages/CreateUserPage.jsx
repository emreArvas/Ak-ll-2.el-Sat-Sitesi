import { TextField ,Button} from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUser } from '../server/api'

const CreateUserPage = () => {
    const [body, setBody] = useState({});
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const inputChange=(event) => {
        const { name, value } = event.target;
        setBody({ ...body, [name]: value })
        setError("")
    }
    const buttonClick=() => {
        createUser(body).then((res) => { 
            console.log(res)
            if (res.status == 200) {
                alert("Kayıt Başarılı")
                navigate("/login") 
            }
        }).catch((err) => {
            console.log(err.response);
            setError(err.response.data.errors);
      })
    }
  return (
    <div>
        <form className='login-form'>
              <h1>Kayıt Ol</h1>
              <div  className='inputDiv'>
                  <TextField onChange={inputChange}  className='login-input' placeholder='Kullanici Adi giriniz *' name='username'></TextField>
              </div>
                   <div className="invalid-feedback">
          {error?.Username}
        </div>
              <div className='inputDiv'>
                  <TextField  onChange={inputChange} type='email' className='login-input' placeholder='Email Adresi*' name='email'></TextField>
              </div>
                <div className="invalid-feedback">
          {error?.Email}
        </div>
              <div className='inputDiv'>
                  <TextField  onChange={inputChange} type='password' className='login-input' placeholder='Şifre*' name='password'></TextField>
              </div>
                <div className="invalid-feedback">
          {error?.Password}
        </div>
              <Button  onClick={buttonClick} id='login-button' size='large' variant='contained'>
                  Kayıt
              </Button>
          </form>
    </div>
  )
}

export default CreateUserPage
