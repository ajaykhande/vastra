package vastra_backend.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vastra_backend.enums.Size;
import vastra_backend.modal.Product;
import vastra_backend.modal.ProductVariant;
import vastra_backend.repository.ProductRepository;
import vastra_backend.requestDTO.AddProductRequest;
import vastra_backend.requestDTO.AddProductVariantRequest;
import vastra_backend.responseDTO.ProductResponse;
import vastra_backend.responseDTO.ProductVariantResponse;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductResponse> getAllProducts() {

        List<Product> products = productRepository.findAll();

        return products.stream().map(p -> {
            ProductResponse pr = new ProductResponse();
            pr.setId(p.getId());
            pr.setCompany(p.getCompany());
            pr.setName(p.getName());
            pr.setOriginalPrice(p.getOriginalPrice());
            pr.setCurrentPrice(p.getCurrentPrice());
            pr.setImageUrl(p.getImageUrl());
            pr.setReturnPeriod(p.getReturnPeriod());

            int discount = (int) ((p.getOriginalPrice() - p.getCurrentPrice())
                    / p.getOriginalPrice() * 100);
            pr.setDiscount(discount);

            List<ProductVariantResponse> pvrList = p.getVariants().stream().map(pv -> {
                ProductVariantResponse pvr = new ProductVariantResponse();
                pvr.setSize(pv.getSize());
                pvr.setStock(pv.getStock());
                return pvr;
            }).toList();
            pr.setVariants(pvrList);
            return pr;
        }).toList();

    }

    public void addProduct(AddProductRequest request) {

        Product product = new Product();

        product.setCompany(request.getCompany());
        product.setName(request.getName());
        product.setOriginalPrice(request.getOriginalPrice());
        product.setCurrentPrice(request.getCurrentPrice());
        product.setImageUrl(request.getImageUrl());
        product.setReturnPeriod(request.getReturnPeriod());

        List<ProductVariant> variantList = new ArrayList<>();

        for (AddProductVariantRequest dto : request.getVariants()) {
            ProductVariant variant = new ProductVariant();

            variant.setSize(dto.getSize());
            variant.setStock(dto.getStock());

            variant.setProduct(product);
            variantList.add(variant);
        }

        product.setVariants(variantList);

        productRepository.save(product);
    }

    public void updateProduct(Long id, AddProductRequest request) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setCompany(request.getCompany());
        product.setName(request.getName());
        product.setOriginalPrice(request.getOriginalPrice());
        product.setCurrentPrice(request.getCurrentPrice());
        product.setImageUrl(request.getImageUrl());
        product.setReturnPeriod(request.getReturnPeriod());

        Map<Size, ProductVariant> existingVariants = product.getVariants().stream()
                .collect(Collectors.toMap(ProductVariant::getSize, v -> v));

        for (AddProductVariantRequest pvr : request.getVariants()) {

            ProductVariant pv = existingVariants.get(pvr.getSize());
            pv.setStock(pvr.getStock());
        }
        productRepository.save(product);
    }

    public void deleteProduct(Long id) {

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        productRepository.delete(product);
    }
}
