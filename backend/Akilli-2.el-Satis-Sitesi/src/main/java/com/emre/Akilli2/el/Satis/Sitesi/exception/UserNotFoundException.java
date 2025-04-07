package com.emre.Akilli2.el.Satis.Sitesi.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(){
        super("Kullanıcı bulunamadi");
    }
}
