/**
 * @author Elif Kavurga
 */
package com.elifkavurga.hogsmadecafe.repository;

import com.elifkavurga.hogsmadecafe.entity.Order;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, UUID> {
}
