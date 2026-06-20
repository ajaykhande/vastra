package vastra_backend.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vastra_backend.enums.Size;
import vastra_backend.modal.ProductVariant;
import vastra_backend.repository.ProductVariantRepository;

@Service
@RequiredArgsConstructor
public class ProductVariantService {

    private final ProductVariantRepository productVariantRepository;

    public void reduceStock(Long productId, Size size, int quantity) {

        ProductVariant productVariant = productVariantRepository.findByProductIdAndSize(productId, size)
                .orElseThrow(() -> new RuntimeException("Product Variant not found"));

        if (productVariant.getStock() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }

        productVariant.setStock(productVariant.getStock() - quantity);
        productVariantRepository.save(productVariant);
    }

    public void restoreStock(Long ProductId, Size size, int quantity) {

        ProductVariant pv = productVariantRepository.findByProductIdAndSize(ProductId, size)
                .orElseThrow(() -> new RuntimeException("Product variant not found"));

        pv.setStock(pv.getStock() + quantity);
        productVariantRepository.save(pv);
    }

}
