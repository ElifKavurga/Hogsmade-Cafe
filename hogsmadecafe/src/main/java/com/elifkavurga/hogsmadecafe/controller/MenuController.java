/**
 * @author Elif Kavurga
 */
package com.elifkavurga.hogsmadecafe.controller;

import com.elifkavurga.hogsmadecafe.entity.MenuItem;
import com.elifkavurga.hogsmadecafe.service.MenuItemService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class MenuController {

    private final MenuItemService menuItemService;

    @GetMapping
    public List<MenuItem> getMenuItems() {
        return menuItemService.getAllMenuItems();
    }
}
