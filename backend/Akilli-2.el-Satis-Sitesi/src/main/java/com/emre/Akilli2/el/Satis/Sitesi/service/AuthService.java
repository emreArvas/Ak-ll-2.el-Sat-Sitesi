package com.emre.Akilli2.el.Satis.Sitesi.service;

import com.emre.Akilli2.el.Satis.Sitesi.dto.LoginRequest;
import com.emre.Akilli2.el.Satis.Sitesi.dto.LoginResponse;

public interface AuthService {
    LoginResponse login(LoginRequest request);
}