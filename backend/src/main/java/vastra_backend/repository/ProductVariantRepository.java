package vastra_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import vastra_backend.enums.Size;
import vastra_backend.modal.ProductVariant;

public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {

    Optional<ProductVariant> findByProductIdAndSize(Long productId, Size size);
}
