import { useMemo, useState } from "react";

const cardOffsetClasses = [
  "",
  "translate-y-4",
  "",
  "-translate-y-2",
  "translate-y-6",
  "",
];

const MENU_ITEMS = [
  {
    id: "drink-1",
    name: "Kaymakbirası",
    description:
      "Köpüklü kreması, karamel dokusu ve sıcak meyhane havasıyla Hogsmeade akşamlarının vazgeçilmez büyücü klasiği.",
    price: 120,
    imageUrl:
      "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=900&q=80",
    category: { name: "İçecekler" },
  },
  {
    id: "drink-2",
    name: "Balkabağı Suyu",
    description:
      "Sonbahar şölenlerinden ilham alan, baharatlı balkabağı aromasıyla içinizi ısıtan geleneksel Hogwarts içeceği.",
    price: 95,
    imageUrl: null,
    category: { name: "İçecekler" },
  },
  {
    id: "drink-3",
    name: "Amortentia Çayı",
    description:
      "Gül, vanilya ve tarçın katmanlarıyla aşk iksirini anımsatan, buharı bile baş döndüren zarif çay karışımı.",
    price: 125,
    imageUrl:
      "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
    category: { name: "İçecekler" },
  },
  {
    id: "drink-4",
    name: "Gillywater",
    description:
      "Serin, berrak ve nane-limon esintili yapısıyla Solungacotu efsanesine selam çakan ferahlatıcı iksir suyu.",
    price: 105,
    imageUrl:
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=900&q=80",
    category: { name: "İçecekler" },
  },
  {
    id: "drink-5",
    name: "Felix Felicis Şurubu",
    description:
      "Altın ışıltılı yüzeyi ve narenciye bitişli tadıyla gün boyu şanslı hissettiren özel şurup karışımı.",
    price: 145,
    imageUrl:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80",
    category: { name: "İçecekler" },
  },
  {
    id: "snack-1",
    name: "Hagrid'in Kaya Kekleri",
    description:
      "Dışı güçlü, içi sürpriz şekilde yumuşak; tarçın ve kuru meyve dokunuşuyla dev dostu bir atıştırmalık.",
    price: 85,
    imageUrl:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    category: { name: "Atıştırmalıklar" },
  },
  {
    id: "snack-2",
    name: "Ejderha Nefesi Kroketleri",
    description:
      "İsli biber ve çıtır kaplamasıyla ağzınızda sıcak bir kıvılcım bırakan cesur büyücüler için hazırlanmış lokmalar.",
    price: 110,
    imageUrl: null,
    category: { name: "Atıştırmalıklar" },
  },
  {
    id: "snack-3",
    name: "Altın Snitch Atıştırmalıkları",
    description:
      "Baharatlı peynir topları ve altın tozu görünümünde baharat kaplamasıyla yakalaması zor, yemesi kolay bir tabak.",
    price: 99,
    imageUrl:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    category: { name: "Atıştırmalıklar" },
  },
  {
    id: "snack-4",
    name: "Kazan Pastası",
    description:
      "Çikolatalı dolgusu ve yumuşak iç dokusuyla küçük bir kazanı andıran, ders aralarında kaçamak yapılacak kek.",
    price: 90,
    imageUrl:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80",
    category: { name: "Atıştırmalıklar" },
  },
  {
    id: "snack-5",
    name: "Mandrake Filizleri",
    description:
      "Taze otlar ve çıtır sebze parçalarıyla hazırlanan, seraların en gürültüsüz ama en lezzetli atıştırmalığı.",
    price: 88,
    imageUrl:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80",
    category: { name: "Atıştırmalıklar" },
  },
  {
    id: "dessert-1",
    name: "Çikolatalı Kurbağa",
    description:
      "Yoğun kakao gövdesi ve koleksiyonluk büyücü kartlarını anımsatan havasıyla rafların en meşhur tatlısı.",
    price: 70,
    imageUrl:
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?auto=format&fit=crop&w=900&q=80",
    category: { name: "Tatlılar" },
  },
  {
    id: "dessert-2",
    name: "Bertie Bott'un Fasulyeleri",
    description:
      "Her renk tanesinde farklı bir macera saklayan, cesaret isteyen ama vazgeçilmesi zor büyücü şekerleri.",
    price: 68,
    imageUrl:
      "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?auto=format&fit=crop&w=900&q=80",
    category: { name: "Tatlılar" },
  },
  {
    id: "dessert-3",
    name: "Şeker Tüyü",
    description:
      "Mürekkep yerine şekerli izler bırakan, vanilya aromalı ve hafif çıtır yapıda nostaljik bir tatlı asa.",
    price: 55,
    imageUrl: null,
    category: { name: "Tatlılar" },
  },
  {
    id: "dessert-4",
    name: "Patlayan Bonbonlar",
    description:
      "Ağızda parlayan kıvılcımlar hissi bırakan, meyvemsi dolgulu ve sürprizli dokuda ışıltılı bonbonlar.",
    price: 72,
    imageUrl:
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80",
    category: { name: "Tatlılar" },
  },
  {
    id: "dessert-5",
    name: "Meyan Kökü Asaları",
    description:
      "Uzun çubuk formu, yoğun meyan aroması ve hafif karamel dokusuyla ders arası için ideal büyücü şekeri.",
    price: 60,
    imageUrl:
      "https://images.unsplash.com/photo-1516747773440-6f6b4ba8f0a9?auto=format&fit=crop&w=900&q=80",
    category: { name: "Tatlılar" },
  },
];

function MenuSection({ addToCart }) {
  const [activeCategory, setActiveCategory] = useState("Tümü");

  const items = MENU_ITEMS;
  const loading = false;
  const error = "";

  const categoryFilters = useMemo(
    () => [
      "Tümü",
      ...Array.from(
        new Set(items.map((item) => item.category?.name).filter(Boolean)),
      ),
    ],
    [items],
  );

  const filteredItems = items.filter((item) => {
    if (activeCategory === "Tümü") {
      return true;
    }

    return item.category?.name === activeCategory;
  });

  function getCategoryLabel(category) {
    if (category === "İçecekler") {
      return "Büyülü İçecekler";
    }

    return category;
  }

  return (
    <section id="menu" className="relative overflow-hidden">
      <style>
        {`
          .parchment-overlay {
            background-image: radial-gradient(circle at center, rgba(244, 231, 195, 0.05) 0%, transparent 70%);
            pointer-events: none;
          }

          .card-glow:hover {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.15);
          }
        `}
      </style>

      <main className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-24 pt-32 md:px-12">
        <div className="parchment-overlay absolute inset-0 z-0" />

        <header className="relative z-10 mb-16 text-center">
          <h1 className="mb-4 font-headline text-5xl text-primary drop-shadow-[0_0_12px_rgba(242,202,80,0.3)] md:text-6xl">
            Sihirli Menümüz
          </h1>
          <p className="mx-auto max-w-2xl font-body text-xl italic text-on-surface-variant">
            Baykuş postasıyla gelen en taze malzemeler ve kadim büyülerle
            hazırlanan lezzet keşfine hoş geldiniz.
          </p>
        </header>

        <div className="relative z-10 mb-16 flex flex-wrap justify-center gap-4">
          {categoryFilters.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-8 py-2 font-label text-sm font-semibold tracking-wider transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-on-primary shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "border border-outline-variant/30 bg-surface-container-high text-on-surface hover:bg-primary-container/20"
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="relative z-10 rounded-lg border border-outline-variant/10 bg-surface-container-low p-10 text-center font-label text-secondary">
            Menü raflardan indiriliyor...
          </div>
        ) : null}

        {error ? (
          <div className="relative z-10 rounded-lg border border-error/20 bg-error-container/30 p-10 text-center font-label text-error">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item, index) => {
              const hasImage =
                typeof item.imageUrl === "string" && item.imageUrl.trim() !== "";

              return (
                <div
                  key={item.id}
                  className={`group flex flex-col overflow-hidden rounded-lg border border-outline-variant/10 bg-surface-container-low transition-all duration-500 hover:-translate-y-2 card-glow ${
                    cardOffsetClasses[index % cardOffsetClasses.length]
                  }`}
                >
                  <div className="relative h-64 overflow-hidden">
                    {hasImage ? (
                      <img
                        alt={item.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        src={item.imageUrl}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-[#2d1611]">
                        <div className="flex flex-col items-center gap-3 text-[#f2ca50]">
                          <span className="material-symbols-outlined text-6xl drop-shadow-[0_0_12px_rgba(242,202,80,0.35)]">
                            auto_fix_high
                          </span>
                          <span className="font-label text-xs uppercase tracking-[0.3em] text-[#ffb780]/75">
                            Sihirli Görsel Yolda
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent" />
                  </div>

                  <div className="flex flex-grow flex-col p-6">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <h3 className="font-headline text-2xl text-primary">
                        {item.name}
                      </h3>
                      <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-label text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
                        {getCategoryLabel(item.category?.name)}
                      </span>
                    </div>
                    <p className="flex-grow font-body leading-relaxed text-on-surface-variant">
                      {item.description}
                    </p>

                    <div className="mt-6 flex items-center justify-between">
                      <span className="font-headline text-xl text-secondary">
                        {Number(item.price).toFixed(0)} TL
                      </span>
                      <button
                        className="group/btn flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-primary transition-all duration-300 hover:bg-primary hover:text-on-primary"
                        onClick={() => addToCart(item)}
                        type="button"
                      >
                        <span className="font-label text-xs font-bold uppercase tracking-widest">
                          Sepete Ekle
                        </span>
                        <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:rotate-45">
                          auto_fix
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </main>
    </section>
  );
}

export default MenuSection;
