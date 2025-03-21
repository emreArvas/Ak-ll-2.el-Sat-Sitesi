package com.emre.Akilli2.el.Satis.Sitesi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateUserRequest {
    private String name;
    private String password;

    private String surname;

    private String email;

    private String phoneNumber;
}
