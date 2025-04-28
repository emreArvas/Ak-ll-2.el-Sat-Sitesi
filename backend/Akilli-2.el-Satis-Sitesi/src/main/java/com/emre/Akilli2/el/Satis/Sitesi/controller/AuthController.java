package com.emre.Akilli2.el.Satis.Sitesi.controller;

import com.emre.Akilli2.el.Satis.Sitesi.dto.LoginException;
import com.emre.Akilli2.el.Satis.Sitesi.dto.LoginRequest;
import com.emre.Akilli2.el.Satis.Sitesi.exception.UserNotFoundException;
import com.emre.Akilli2.el.Satis.Sitesi.model.Personel;
import com.emre.Akilli2.el.Satis.Sitesi.repository.PersonelRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final PersonelRepository repository;

    public AuthController(PersonelRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        Personel personel=repository.findByEmail(request.getEmail()).orElseThrow(()->new UserNotFoundException());
        if(!personel.getPassword().equals(request.getPassword())) throw new LoginException();

        return ResponseEntity.ok("Giriş başarılı");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return ResponseEntity.ok("Çıkış başarılı");
    }
}