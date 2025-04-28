package com.emre.Akilli2.el.Satis.Sitesi.repository;

import com.emre.Akilli2.el.Satis.Sitesi.model.Personel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonelRepository extends JpaRepository<Personel, Long> {
    
    // Email ile kullanıcı bulma
    Optional<Personel> findByEmail(String email);
    
    // Email kontrolü
    boolean existsByEmail(String email);
    



}
