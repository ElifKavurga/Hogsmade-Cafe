/**
 * @author Elif Kavurga
 */
package com.elifkavurga.hogsmadecafe.config;

import com.elifkavurga.hogsmadecafe.entity.Category;
import com.elifkavurga.hogsmadecafe.entity.MenuItem;
import com.elifkavurga.hogsmadecafe.repository.CategoryRepository;
import com.elifkavurga.hogsmadecafe.repository.MenuItemRepository;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final MenuItemRepository menuItemRepository;

    @Override
    public void run(String... args) {
        if (categoryRepository.count() > 0 || menuItemRepository.count() > 0) {
            return;
        }

        Category drinks = categoryRepository.save(Category.builder()
                .name("İçecekler")
                .build());

        Category snacks = categoryRepository.save(Category.builder()
                .name("Atıştırmalıklar")
                .build());

        List<MenuItem> menuItems = List.of(
                MenuItem.builder()
                        .name("Kaymakbirası")
                        .description("Köpüklü tereyağı aroması, karamel notaları ve sıcak büyü şöminesi hissi taşıyan efsane içecek.")
                        .price(new BigDecimal("12.00"))
                        .imageUrl("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80")
                        .category(drinks)
                        .build(),
                MenuItem.builder()
                        .name("Çok Özlü İksir")
                        .description("Parıldayan zümrüt tonu ve gizemli baharat karışımıyla cesur büyücülere hitap eden özel iksir.")
                        .price(new BigDecimal("25.00"))
                        .imageUrl("https://images.unsplash.com/photo-1514361892635-eae31ec8d6f6?auto=format&fit=crop&w=900&q=80")
                        .category(drinks)
                        .build(),
                MenuItem.builder()
                        .name("Hagrid'in Kaya Kekleri")
                        .description("Dışı sert görünümlü, içi sıcak ve baharatlı; yanında çayla servis edilen dev dostu atıştırmalık.")
                        .price(new BigDecimal("8.00"))
                        .imageUrl("https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80")
                        .category(snacks)
                        .build(),
                MenuItem.builder()
                        .name("Çikolatalı Kurbağa Tatlısı")
                        .description("Sihirli kart koleksiyoncularının favorisi olan yoğun kakao dolgulu tatlı lokmalar.")
                        .price(new BigDecimal("15.00"))
                        .imageUrl("https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=900&q=80")
                        .category(snacks)
                        .build());

        menuItemRepository.saveAll(menuItems);
    }
}
