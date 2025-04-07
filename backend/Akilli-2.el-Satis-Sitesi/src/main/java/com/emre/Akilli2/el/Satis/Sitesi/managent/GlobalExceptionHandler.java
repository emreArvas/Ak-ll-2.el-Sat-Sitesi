package com.emre.Akilli2.el.Satis.Sitesi.managent;

import com.emre.Akilli2.el.Satis.Sitesi.dto.ApiResponse;
import com.emre.Akilli2.el.Satis.Sitesi.exception.EmailException;
import com.emre.Akilli2.el.Satis.Sitesi.exception.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice  // hataların yönetimin yapacağımız sınıf
public class GlobalExceptionHandler {
    @ExceptionHandler({EmailException.class,})
    ResponseEntity<ApiResponse<Void>> badRequestException(RuntimeException ex, HttpServletRequest http){
        ApiResponse response=ApiResponse.<Void>builder().status(400).path(http.getRequestURI())
                .message(ex.getMessage()).localDateTime(LocalDateTime.now()).build();

        return ResponseEntity.badRequest().body(response);

    }
   // 404
    @ExceptionHandler({UserNotFoundException.class})
    ResponseEntity<ApiResponse<Void>> notFoundException(RuntimeException ex, HttpServletRequest http){
        ApiResponse response=ApiResponse.<Void>builder().status(404).path(http.getRequestURI())
                .message(ex.getMessage()).localDateTime(LocalDateTime.now()).build();

        return ResponseEntity.status(404).body(response);

    }
}
