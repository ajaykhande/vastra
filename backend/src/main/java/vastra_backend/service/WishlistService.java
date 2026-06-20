package vastra_backend.service;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vastra_backend.modal.Product;
import vastra_backend.modal.User;
import vastra_backend.modal.Wishlist;
import vastra_backend.repository.ProductRepository;
import vastra_backend.repository.UserRepository;
import vastra_backend.repository.WishlistRepository;

@Service
@RequiredArgsConstructor
public class WishlistService {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public void addToWishlist(Long productId, Authentication auth) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (wishlistRepository.findByUserAndProduct(user, product).isPresent()) {
            throw new RuntimeException("Product already in wishlist");
        }

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setProduct(product);
        wishlistRepository.save(wishlist);
    }

    public List<Long> getMyWishlist(Authentication auth) {

        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return wishlistRepository.findProductIdsByUser(user);
    }

    public void removeFromeWishlist(Long productId, Authentication auth) {

        User user = userRepository.findByEmail(auth.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Wishlist wishlist = wishlistRepository.findByUserAndProduct(user, product)
                .orElseThrow(() -> new RuntimeException("Product already removed from wishlist"));
        wishlistRepository.delete(wishlist);
    }

}
