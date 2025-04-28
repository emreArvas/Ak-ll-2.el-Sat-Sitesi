package com.emre.Akilli2.el.Satis.Sitesi.repository;

import com.emre.Akilli2.el.Satis.Sitesi.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByActiveTrue();
    Optional<Product> findByIdAndActiveTrue(Long id);
    List<Product> findBySellerIdAndActiveTrue(Long sellerId);
}
