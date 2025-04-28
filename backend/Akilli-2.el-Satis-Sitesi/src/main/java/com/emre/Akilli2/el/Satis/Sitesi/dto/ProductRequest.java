package com.emre.Akilli2.el.Satis.Sitesi.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductRequest {
    private String title;
    private String description;
    private BigDecimal price;
    private String category;
    private String condition;
    private Long sellerId;
    private String location;
    private List<String> images;
}