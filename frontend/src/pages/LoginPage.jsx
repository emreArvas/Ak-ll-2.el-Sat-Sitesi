
import { TextField ,Button} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { signIn } from '../redux/Reducer/UserReducer'
import { loginUser } from '../server/api'

const LoginPage = () => {
    const [body, setBody] = useState({})
    const [error, setError] = useState("");
    const isLogin = localStorage.getItem("isLogin");
    const navigate = useNavigate();
    const inputChange = (event) => {
        const { name, value } = event.target;
        setBody({ ...body, [name]: value })
        console.log(body);
    }
    const buttonClick=() => {
        loginUser(body).then((res) => {
            console.log(res);
            if (res.status == 200) {
                alert("Giriş Başarılı")
                navigate("/")
                localStorage.setItem("isLogin","true");
                localStorage.setItem("id",res.data)
                setError("");
            }
        }).catch((err) => {
            console.log(err.response);
            setError("Email veya Şifre yanlış");
      })
    }
    return (

        <div>
            {isLogin=="true" ?<>Zaten giriş Yaptın</> :<div>
                <div className='error-m'>{error}</div>
          <form className='login-form'>
                <h1>Giriş Yap</h1>
              <div className='inputDiv'>
          <TextField onChange={inputChange} label={"Email Adresi"}  className='login-input' placeholder='Email Adresi*' name='email'></TextField>
        </div>
              <div className='inputDiv'>
                  <TextField  onChange={inputChange}  label={"Şifre"}  type='password' className='login-input' placeholder='Şifre*' name='password'></TextField>
        </div>
           <Button  onClick={buttonClick}  id='login-button' size='large' variant='contained'>Giriş</Button>
              
              <div className='link-div'>
                  <Link to="/createuser" className='link-login'>Kayıt Ol</Link>
                
              <Link className='link-login'>Şifremi Unuttum</Link>
              </div>
          </form>
    </div> }
            
    </div>
  )
}

export default LoginPage
