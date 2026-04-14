/**
 * @author Elif Kavurga
 */
package com.elifkavurga.hogsmadecafe.service;

import com.elifkavurga.hogsmadecafe.entity.MenuItem;
import com.elifkavurga.hogsmadecafe.repository.MenuItemRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
}
