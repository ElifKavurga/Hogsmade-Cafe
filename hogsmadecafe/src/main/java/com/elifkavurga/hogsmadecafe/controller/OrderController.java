/**
 * @author Elif Kavurga
 */
package com.elifkavurga.hogsmadecafe.controller;

import com.elifkavurga.hogsmadecafe.dto.OrderRequest;
import com.elifkavurga.hogsmadecafe.entity.Order;
import com.elifkavurga.hogsmadecafe.service.OrderService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody OrderRequest orderRequest) {
        Order savedOrder = orderService.createOrder(orderRequest);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Sipariş başarıyla oluşturuldu.",
                "orderId", savedOrder.getId(),
                "totalAmount", savedOrder.getTotalAmount(),
                "orderDate", savedOrder.getOrderDate()));
    }
}
