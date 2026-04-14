/**
 * @author Elif Kavurga
 */
package com.elifkavurga.hogsmadecafe.service;

import com.elifkavurga.hogsmadecafe.dto.OrderItemRequest;
import com.elifkavurga.hogsmadecafe.dto.OrderRequest;
import com.elifkavurga.hogsmadecafe.entity.MenuItem;
import com.elifkavurga.hogsmadecafe.entity.Order;
import com.elifkavurga.hogsmadecafe.entity.OrderItem;
import com.elifkavurga.hogsmadecafe.repository.MenuItemRepository;
import com.elifkavurga.hogsmadecafe.repository.OrderRepository;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final MenuItemRepository menuItemRepository;

    @Transactional
    public Order createOrder(OrderRequest orderRequest) {
        if (orderRequest == null || orderRequest.getItems() == null || orderRequest.getItems().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sipariş en az bir ürün içermelidir.");
        }

        List<OrderItemRequest> itemRequests = orderRequest.getItems();
        LinkedHashSet<UUID> menuItemIds = itemRequests.stream()
                .map(OrderItemRequest::getMenuItemId)
                .collect(Collectors.toCollection(LinkedHashSet::new));

        if (menuItemIds.contains(null)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Her sipariş kaleminde geçerli bir menuItemId olmalıdır.");
        }

        Map<UUID, MenuItem> menuItemMap = menuItemRepository.findAllById(menuItemIds).stream()
                .collect(Collectors.toMap(MenuItem::getId, Function.identity()));

        if (menuItemMap.size() != menuItemIds.size()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Siparişteki bazı menü ürünleri bulunamadı.");
        }

        Order order = Order.builder()
                .orderDate(LocalDateTime.now())
                .totalAmount(BigDecimal.ZERO)
                .orderItems(new ArrayList<>())
                .build();

        BigDecimal totalAmount = BigDecimal.ZERO;

        for (OrderItemRequest itemRequest : itemRequests) {
            Integer quantity = itemRequest.getQuantity();
            if (quantity == null || quantity < 1) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Ürün adedi en az 1 olmalıdır.");
            }

            MenuItem menuItem = menuItemMap.get(itemRequest.getMenuItemId());
            BigDecimal linePrice = menuItem.getPrice();

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .menuItem(menuItem)
                    .quantity(quantity)
                    .price(linePrice)
                    .build();

            order.getOrderItems().add(orderItem);
            totalAmount = totalAmount.add(linePrice.multiply(BigDecimal.valueOf(quantity.longValue())));
        }

        order.setTotalAmount(totalAmount);
        return orderRepository.save(order);
    }
}
