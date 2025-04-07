package com.emre.Akilli2.el.Satis.Sitesi.controller;

import com.emre.Akilli2.el.Satis.Sitesi.dto.ApiResponse;
import com.emre.Akilli2.el.Satis.Sitesi.dto.CreateUserRequest;
import com.emre.Akilli2.el.Satis.Sitesi.dto.UpdateUserRequest;
import com.emre.Akilli2.el.Satis.Sitesi.exception.EmailException;
import com.emre.Akilli2.el.Satis.Sitesi.exception.UserNotFoundException;
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
        if(repository.existsByEmail(request.getEmail())) throw new EmailException();
        Personel personel=Personel.builder().name(request.getName()).email(request.getEmail())
                .password(request.getPassword())
                .surname(request.getSurname())
                .phoneNumber(request.getPhoneNumber())
                .build();
        repository.save(personel);

        return ResponseEntity.ok(personel);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@RequestBody UpdateUserRequest request,@PathVariable Long id){

        Personel personel=repository.findById(id).orElseThrow(()->new UserNotFoundException());

        personel.setName(request.getName());

        personel.setName(request.getName());
        personel.setSurname(request.getSurname());

        repository.save(personel);

        return ResponseEntity.ok(ApiResponse.ok("Güncelleme başarılı"));
    }




}
