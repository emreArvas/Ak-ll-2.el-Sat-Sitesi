package com.emre.Akilli2.el.Satis.Sitesi.service.impl;

import com.emre.Akilli2.el.Satis.Sitesi.dto.ProductRequest;
import com.emre.Akilli2.el.Satis.Sitesi.model.Product;
import com.emre.Akilli2.el.Satis.Sitesi.repository.ProductRepository;
import com.emre.Akilli2.el.Satis.Sitesi.service.ProductService;
import com.emre.Akilli2.el.Satis.Sitesi.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    @Transactional
    public Product createProduct(ProductRequest request) {
        Product product = new Product();
        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setCondition(request.getCondition());
        product.setSellerId(request.getSellerId());
        product.setLocation(request.getLocation());
        product.setImages(request.getImages());
        product.setActive(true);

        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findByActiveTrue();
    }

    @Override
    public Product getProductById(Long id) {
        return productRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ürün bulunamadı: " + id));
    }

    @Override
    @Transactional
    public Product updateProduct(Long id, ProductRequest request) {
        Product product = getProductById(id);

        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setCategory(request.getCategory());
        product.setCondition(request.getCondition());
        product.setLocation(request.getLocation());
        product.setImages(request.getImages());

        return productRepository.save(product);
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        product.setActive(false);
        productRepository.save(product);
    }

    @Override
    public List<Product> getProductsByUserId(Long userId) {
        return productRepository.findBySellerIdAndActiveTrue(userId);
    }

    @Override
    public List<Product> searchProducts(String keyword, Double minPrice, Double maxPrice, String category) {
        List<Product> products = productRepository.findByActiveTrue();

        return products.stream()
                .filter(product -> keyword == null ||
                        product.getTitle().toLowerCase().contains(keyword.toLowerCase()) ||
                        product.getDescription().toLowerCase().contains(keyword.toLowerCase()))
                .filter(product -> minPrice == null || product.getPrice().doubleValue() >= minPrice)
                .filter(product -> maxPrice == null || product.getPrice().doubleValue() <= maxPrice)
                .filter(product -> category == null || product.getCategory().equalsIgnoreCase(category))
                .collect(Collectors.toList());
    }
}