package vastra_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import vastra_backend.modal.Product;
import vastra_backend.modal.User;
import vastra_backend.modal.Wishlist;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    @Query("select w.product.id from Wishlist w where w.user = :user")
    List<Long> findProductIdsByUser(User user);

    Optional<Wishlist> findByUserAndProduct(User user, Product product);
}
