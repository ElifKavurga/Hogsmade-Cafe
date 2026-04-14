import { useEffect, useState } from "react";

const categoryFilters = [
  "Tümü",
  "Büyülü İçecekler",
  "Atıştırmalıklar",
  "Tatlılar",
];

const cardOffsetClasses = [
  "",
  "translate-y-4",
  "",
  "-translate-y-2",
  "translate-y-6",
  "",
];

function MenuSection({ addToCart }) {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadItems() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("http://localhost:8081/api/menu", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Menü verileri alınamadı.");
        }

        const data = await response.json();
        setItems(data);
      } catch (fetchError) {
        if (fetchError.name !== "AbortError") {
          setError(
            "Menü şu anda yüklenemiyor. Lütfen backend servisinin çalıştığını kontrol edin.",
          );
        }
      } finally {
        setLoading(false);
      }
    }

    loadItems();

    return () => controller.abort();
  }, []);

  const filteredItems = items.filter((item) => {
    if (activeCategory === "Tümü") {
      return true;
    }

    if (activeCategory === "Büyülü İçecekler") {
      return ["Büyülü İçecekler", "İçecekler"].includes(item.category?.name);
    }

    return item.category?.name === activeCategory;
  });

  return (
    <section className="relative overflow-hidden">
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
            Baykuş postasıyla gelen en taze malzemeler ve kadim büyülerle hazırlanan lezzet keşfine hoş geldiniz.
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
                {category}
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
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`group flex flex-col overflow-hidden rounded-lg border border-outline-variant/10 bg-surface-container-low transition-all duration-500 hover:-translate-y-2 card-glow ${
                  cardOffsetClasses[index % cardOffsetClasses.length]
                }`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={item.imageUrl}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low to-transparent" />
                </div>

                <div className="flex flex-grow flex-col p-6">
                  <h3 className="mb-2 font-headline text-2xl text-primary">{item.name}</h3>
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
            ))}
          </div>
        ) : null}
      </main>
    </section>
  );
}

export default MenuSection;
