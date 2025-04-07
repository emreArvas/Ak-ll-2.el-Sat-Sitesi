package com.emre.Akilli2.el.Satis.Sitesi.exception;

public class EmailException extends RuntimeException {
    public EmailException(){
        super("Bu Email zaten kullanılıyor.");
    }

}
