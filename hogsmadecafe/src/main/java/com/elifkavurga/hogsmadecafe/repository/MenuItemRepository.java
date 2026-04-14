/**
 * @author Elif Kavurga
 */
package com.elifkavurga.hogsmadecafe.repository;

import com.elifkavurga.hogsmadecafe.entity.MenuItem;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MenuItemRepository extends JpaRepository<MenuItem, UUID> {
}
