package com.emre.Akilli2.el.Satis.Sitesi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private Long userId;
    private String email;
}