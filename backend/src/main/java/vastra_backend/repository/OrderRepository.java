package vastra_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import vastra_backend.modal.Order;
import vastra_backend.modal.User;

public interface  OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUser(User user);
    
    
}
