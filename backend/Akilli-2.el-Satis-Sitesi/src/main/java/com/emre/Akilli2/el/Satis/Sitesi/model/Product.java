package com.emre.Akilli2.el.Satis.Sitesi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false)
    private BigDecimal price;
    
    private String category;
    
    private String condition; // Ürünün durumu (yeni, az kullanılmış, kullanılmış vb.)
    
    @Column(nullable = false)
    private Long sellerId; // Satıcı ID'si
    
    private String location; // Satış lokasyonu
    
    @Column(nullable = false)
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    @Column(columnDefinition = "boolean default true")
    private boolean active = true;
    
    @ElementCollection
    private List<String> images; // Ürün fotoğrafları
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
