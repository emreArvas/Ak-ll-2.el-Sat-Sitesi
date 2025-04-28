package com.emre.Akilli2.el.Satis.Sitesi.service;

import com.emre.Akilli2.el.Satis.Sitesi.dto.ProductRequest;
import com.emre.Akilli2.el.Satis.Sitesi.model.Product;
import java.util.List;

public interface ProductService {
    Product createProduct(ProductRequest request);
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product updateProduct(Long id, ProductRequest request);
    void deleteProduct(Long id);
    List<Product> getProductsByUserId(Long userId);
    List<Product> searchProducts(String keyword, Double minPrice, Double maxPrice, String category);
}