package vastra_backend.responseDTO;

import java.time.LocalDateTime;

import lombok.Data;
import vastra_backend.enums.OrderStatus;
import vastra_backend.enums.Size;

@Data
public class OrderResponse {

    private Long id;
    private Long productId;
    private Size size;
    private int quantity;
    private LocalDateTime orderDate;
    private Double totalAmount;
    private OrderStatus status;
    
}
