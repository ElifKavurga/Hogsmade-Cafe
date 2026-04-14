/**
 * @author Elif Kavurga
 */
package com.elifkavurga.hogsmadecafe.repository;

import com.elifkavurga.hogsmadecafe.entity.Category;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, UUID> {

    Optional<Category> findByName(String name);
}
