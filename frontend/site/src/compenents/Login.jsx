import React from 'react';

const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Hoşgeldiniz</h2>
        <input type="email" placeholder="Mail" required />
        <input type="password" placeholder="Şifre" required />
        <button type="Gönder">Login</button>
        <p className="signup-text">Hesabınız Yok mu? <a href="#">Kayıt Ol</a></p>
      </form>
    </div>
  );
};

export default Login;
