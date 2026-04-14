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
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;
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
        Category drinks = getOrCreateCategory("İçecekler");
        Category snacks = getOrCreateCategory("Atıştırmalıklar");
        Category desserts = getOrCreateCategory("Tatlılar");

        Map<String, MenuItem> existingItemsByName = menuItemRepository.findAll().stream()
                .collect(Collectors.toMap(MenuItem::getName, Function.identity(), (first, second) -> first));

        List<MenuItemSeed> menuSeeds = List.of(
                new MenuItemSeed("Kaymakbirası", "Köpüklü kreması, karamel dokusu ve sıcak meyhane havasıyla Hogsmeade akşamlarının vazgeçilmez büyücü klasiği.", new BigDecimal("120.00"), "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80", drinks),
                new MenuItemSeed("Balkabağı Suyu", "Sonbahar şölenlerinden ilham alan, baharatlı balkabağı aromasıyla içinizi ısıtan geleneksel Hogwarts içeceği.", new BigDecimal("95.00"), null, drinks),
                new MenuItemSeed("Amortentia Çayı", "Gül, vanilya ve tarçın katmanlarıyla aşk iksirini anımsatan, buharı bile baş döndüren zarif çay karışımı.", new BigDecimal("125.00"), "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80", drinks),
                new MenuItemSeed("Gillywater", "Serin, berrak ve nane-limon esintili yapısıyla Solungacotu efsanesine selam çakan ferahlatıcı iksir suyu.", new BigDecimal("105.00"), "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80", drinks),
                new MenuItemSeed("Felix Felicis Şurubu", "Altın ışıltılı yüzeyi ve narenciye bitişli tadıyla gün boyu şanslı hissettiren özel şurup karışımı.", new BigDecimal("145.00"), "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80", drinks),
                new MenuItemSeed("Hagrid'in Kaya Kekleri", "Dışı güçlü, içi sürpriz şekilde yumuşak; tarçın ve kuru meyve dokunuşuyla dev dostu bir atıştırmalık.", new BigDecimal("85.00"), "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80", snacks),
                new MenuItemSeed("Ejderha Nefesi Kroketleri", "İsli biber ve çıtır kaplamasıyla ağzınızda sıcak bir kıvılcım bırakan cesur büyücüler için hazırlanmış lokmalar.", new BigDecimal("110.00"), null, snacks),
                new MenuItemSeed("Altın Snitch Atıştırmalıkları", "Baharatlı peynir topları ve altın tozu görünümünde baharat kaplamasıyla yakalaması zor, yemesi kolay bir tabak.", new BigDecimal("99.00"), "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80", snacks),
                new MenuItemSeed("Kazan Pastası", "Çikolatalı dolgusu ve yumuşak iç dokusuyla küçük bir kazanı andıran, ders aralarında kaçamak yapılacak kek.", new BigDecimal("90.00"), "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80", snacks),
                new MenuItemSeed("Mandrake Filizleri", "Taze otlar ve çıtır sebze parçalarıyla hazırlanan, seraların en gürültüsüz ama en lezzetli atıştırmalığı.", new BigDecimal("88.00"), "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80", snacks),
                new MenuItemSeed("Çikolatalı Kurbağa", "Yoğun kakao gövdesi ve koleksiyonluk büyücü kartlarını anımsatan havasıyla rafların en meşhur tatlısı.", new BigDecimal("70.00"), "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=900&q=80", desserts),
                new MenuItemSeed("Bertie Bott'un Fasulyeleri", "Her renk tanesinde farklı bir macera saklayan, cesaret isteyen ama vazgeçilmesi zor büyücü şekerleri.", new BigDecimal("68.00"), "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=900&q=80", desserts),
                new MenuItemSeed("Şeker Tüyü", "Mürekkep yerine şekerli izler bırakan, vanilya aromalı ve hafif çıtır yapıda nostaljik bir tatlı asa.", new BigDecimal("55.00"), null, desserts),
                new MenuItemSeed("Patlayan Bonbonlar", "Ağızda parlayan kıvılcımlar hissi bırakan, meyvemsi dolgulu ve sürprizli dokuda ışıltılı bonbonlar.", new BigDecimal("72.00"), "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80", desserts),
                new MenuItemSeed("Meyan Kökü Asaları", "Uzun çubuk formu, yoğun meyan aroması ve hafif karamel dokusuyla ders arası için ideal büyücü şekeri.", new BigDecimal("60.00"), "https://images.unsplash.com/photo-1516747773440-6f6b4ba8f0a9?auto=format&fit=crop&w=900&q=80", desserts));

        List<MenuItem> menuItemsToPersist = menuSeeds.stream()
                .map(seed -> {
                    MenuItem menuItem = existingItemsByName.getOrDefault(seed.name(), new MenuItem());
                    menuItem.setName(seed.name());
                    menuItem.setDescription(seed.description());
                    menuItem.setPrice(seed.price());
                    menuItem.setImageUrl(seed.imageUrl());
                    menuItem.setCategory(seed.category());
                    return menuItem;
                })
                .toList();

        menuItemRepository.saveAll(menuItemsToPersist);
    }

    private Category getOrCreateCategory(String categoryName) {
        return categoryRepository.findByName(categoryName)
                .orElseGet(() -> categoryRepository.save(Category.builder()
                        .name(categoryName)
                        .build()));
    }

    private record MenuItemSeed(
            String name,
            String description,
            BigDecimal price,
            String imageUrl,
            Category category
    ) {
    }
}
