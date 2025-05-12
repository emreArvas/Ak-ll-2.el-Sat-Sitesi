package com.emre.Akilli2.el.Satis.Sitesi.repository;

import com.emre.Akilli2.el.Satis.Sitesi.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    List<Cart> findByUserIdAndActiveTrue(Long userId);
    void deleteByUserIdAndActiveTrue(Long userId);
}
