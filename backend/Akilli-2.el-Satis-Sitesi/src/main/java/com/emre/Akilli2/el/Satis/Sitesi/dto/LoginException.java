package com.emre.Akilli2.el.Satis.Sitesi.dto;

public class LoginException extends RuntimeException {
    public LoginException(){
        super("Şifre Yanlış");
    }
}
