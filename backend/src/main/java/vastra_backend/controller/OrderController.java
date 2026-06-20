package vastra_backend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import vastra_backend.requestDTO.OrderRequest;
import vastra_backend.responseDTO.OrderResponse;
import vastra_backend.service.OrderService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getMyOrders(Authentication auth) {

        List<OrderResponse> response = orderService.getMyOrders(auth);

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> orderPlace(@RequestBody OrderRequest order,
            Authentication authentication) {

        orderService.orderPlace(order, authentication);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Order placed Successfully");

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/cancel/{orderId}")
    public ResponseEntity<Map<String, String>> orderCancel(@PathVariable Long orderId, Authentication auth) {

        orderService.orderCancel(orderId, auth);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Order canceled successfully");

        return ResponseEntity.ok(response);
    }

}
