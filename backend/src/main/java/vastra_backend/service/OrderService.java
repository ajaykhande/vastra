package vastra_backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import vastra_backend.enums.OrderStatus;
import vastra_backend.modal.Order;
import vastra_backend.modal.Product;
import vastra_backend.modal.User;
import vastra_backend.repository.OrderRepository;
import vastra_backend.repository.ProductRepository;
import vastra_backend.repository.UserRepository;
import vastra_backend.requestDTO.OrderRequest;
import vastra_backend.responseDTO.OrderResponse;

@Service
@RequiredArgsConstructor
public class OrderService {

        private final OrderRepository orderRepository;
        private final UserRepository userRepository;
        private final ProductRepository productRepository;
        private final ProductVariantService productVariantService;

        public List<OrderResponse> getMyOrders(Authentication auth) {

                User user = userRepository.findByEmail(auth.getName())
                                .orElseThrow(() -> new RuntimeException("User not found"));

                List<Order> orders = orderRepository.findByUser(user);

                return orders.stream().map(order -> {
                        OrderResponse or = new OrderResponse();
                        or.setId(order.getId());
                        or.setProductId(order.getProductId());
                        or.setSize(order.getSize());
                        or.setQuantity(order.getQuantity());
                        or.setOrderDate(order.getOrderDate());
                        or.setTotalAmount(order.getTotalAmount());
                        or.setStatus(order.getStatus());
                        return or;
                }).toList();
        }

        public void orderPlace(OrderRequest request, Authentication authentication) {

                String email = authentication.getName();

                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new RuntimeException("User not found"));

                Product product = productRepository.findById(request.getProductId())
                                .orElseThrow(() -> new RuntimeException("Product not found"));
                Double totalAmount = product.getCurrentPrice() * request.getQuantity();

                Order order = new Order();

                order.setProductId(request.getProductId());
                order.setSize(request.getSize());
                order.setQuantity(request.getQuantity());
                order.setTotalAmount(totalAmount);

                order.setUser(user);
                order.setStatus(OrderStatus.PLACED);
                order.setOrderDate(LocalDateTime.now());

                productVariantService.reduceStock(
                                order.getProductId(),
                                order.getSize(),
                                order.getQuantity());

                orderRepository.save(order);
        }

        public void orderCancel(Long orderId, Authentication auth) {

                User user = userRepository.findByEmail(auth.getName())
                                .orElseThrow(() -> new RuntimeException("User not found"));

                Order order = orderRepository.findById(orderId)
                                .orElseThrow(() -> new RuntimeException("Order not found"));

                if (!order.getUser().getId().equals(user.getId())) {
                        throw new RuntimeException("You cannot cancel this order");
                }

                if (order.getStatus() == OrderStatus.CANCELLED) {
                        throw new RuntimeException("Order already cancelled");
                }

                productVariantService.restoreStock(
                                order.getProductId(),
                                order.getSize(),
                                order.getQuantity());

                order.setStatus(OrderStatus.CANCELLED);
                orderRepository.save(order);
        }
}
