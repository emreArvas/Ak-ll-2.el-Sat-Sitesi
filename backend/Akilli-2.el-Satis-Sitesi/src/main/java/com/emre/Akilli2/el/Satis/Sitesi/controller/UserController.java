package com.emre.Akilli2.el.Satis.Sitesi.controller;

import com.emre.Akilli2.el.Satis.Sitesi.dto.CreateUserRequest;
import com.emre.Akilli2.el.Satis.Sitesi.model.Personel;
import com.emre.Akilli2.el.Satis.Sitesi.repository.PersonelRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    private final PersonelRepository repository;

    public UserController(PersonelRepository repository) {
        this.repository = repository;
    }

    @GetMapping("hello")
    public String sayHello(){
        return "Hello";
    }
    @PostMapping("/create")
    public ResponseEntity<?> save(@RequestBody CreateUserRequest request){
        Personel personel=Personel.builder().name(request.getName()).email(request.getEmail())
                .password(request.getPassword())
                .surname(request.getSurname())
                .phoneNumber(request.getPhoneNumber())
                .build();
        repository.save(personel);
        return ResponseEntity.ok(personel);
    }

}
