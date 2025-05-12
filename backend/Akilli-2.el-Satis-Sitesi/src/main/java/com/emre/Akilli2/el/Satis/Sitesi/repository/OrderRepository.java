package com.emre.Akilli2.el.Satis.Sitesi.repository;

import com.emre.Akilli2.el.Satis.Sitesi.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUserId(Long userId);
}
