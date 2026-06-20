package vastra_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import vastra_backend.modal.Product;

public interface  ProductRepository extends JpaRepository<Product, Long> {
    
}
