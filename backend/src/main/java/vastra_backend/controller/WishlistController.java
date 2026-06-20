package vastra_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vastra_backend.service.WishlistService;

@RestController
@RequestMapping("/wishlist")
@RequiredArgsConstructor
public class WishlistController {

    private final WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<Long>> getMyWishlist(Authentication auth) {

        List<Long> response = wishlistService.getMyWishlist(auth);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Map<String, String>> addToWishlist(@PathVariable Long productId, Authentication auth) {

        wishlistService.addToWishlist(productId, auth);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Product added to wishlist successfully");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Map<String, String>> removeFromeWishlist(@PathVariable Long productId, Authentication auth) {

        wishlistService.removeFromeWishlist(productId, auth);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Product removed to wishlist successfully");

        return ResponseEntity.ok(response);
    }
}
