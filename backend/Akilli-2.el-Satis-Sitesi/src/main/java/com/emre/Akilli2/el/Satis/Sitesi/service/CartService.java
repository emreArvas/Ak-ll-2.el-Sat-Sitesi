package com.emre.Akilli2.el.Satis.Sitesi.service;

import com.emre.Akilli2.el.Satis.Sitesi.model.Cart;
import com.emre.Akilli2.el.Satis.Sitesi.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart addToCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public List<Cart> getCartItems(Long userId) {
        return cartRepository.findByUserIdAndActiveTrue(userId);
    }

    public Cart updateCartItem(Long id, Cart cart) {
        Optional<Cart> existingCart = cartRepository.findById(id);
        if (existingCart.isPresent()) {
            Cart updatedCart = existingCart.get();
            updatedCart.setQuantity(cart.getQuantity());
            updatedCart.setTotalPrice(cart.getTotalPrice());
            return cartRepository.save(updatedCart);
        }
        throw new RuntimeException("Cart item not found");
    }

    public void removeCartItem(Long id) {
        cartRepository.deleteById(id);
    }

    public void clearCart(Long userId) {
        cartRepository.deleteByUserIdAndActiveTrue(userId);
    }
}
