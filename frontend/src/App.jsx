import { useMemo, useState } from "react";
import CartDrawer from "./components/CartDrawer";
import MenuSection from "./components/MenuSection";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  function addToCart(item) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });

    setIsCartOpen(true);
  }

  function removeFromCart(itemId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  }

  function updateQuantity(itemId, nextQuantity) {
    if (nextQuantity < 1) {
      removeFromCart(itemId);
      return;
    }

    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: nextQuantity } : item,
      ),
    );
  }

  function finalizeOrder() {
    const fallbackOrders = JSON.parse(
      window.localStorage.getItem("hogsmade-orders") ?? "[]",
    );

    fallbackOrders.push({
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      items: cartItems,
      totalAmount: cartItems.reduce(
        (sum, item) => sum + Number(item.price) * item.quantity,
        0,
      ),
    });

    window.localStorage.setItem(
      "hogsmade-orders",
      JSON.stringify(fallbackOrders),
    );

    setCartItems([]);
    setIsCartOpen(false);
    setShowOrderSuccess(true);
  }

  async function handleCheckout() {
    if (cartItems.length === 0) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            menuItemId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Sipariş oluşturulamadı.");
      }

      finalizeOrder();
    } catch (checkoutError) {
      console.warn(
        "Backend sipariş servisine ulaşılamadı, sipariş yerel olarak tamamlandı.",
        checkoutError,
      );
      finalizeOrder();
    }
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-surface text-on-surface selection:bg-primary/30 selection:text-primary">
      <div className="pointer-events-none fixed inset-0 z-0 grain-texture" />

      <header className="sticky top-0 z-50 w-full bg-[#210e0a]/90 shadow-[0_0_15px_rgba(212,175,55,0.1)] backdrop-blur-xl tonal-shift-low">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 font-label tracking-wide md:px-8">
          <div className="flex items-center gap-2 text-2xl font-bold text-[#f2ca50] transition-transform duration-300 hover:scale-105">
            <span className="material-symbols-outlined text-3xl">auto_fix</span>
            <span className="font-headline">HogsMade Cafe</span>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a
              className="border-b-2 border-[#f2ca50] pb-1 text-[#f2ca50]"
              href="#ana-sayfa"
            >
              Ana Sayfa
            </a>
            <a
              className="text-[#ffb780]/80 transition-colors duration-300 hover:text-[#f2ca50]"
              href="#menu"
            >
              Menu
            </a>
            <a
              className="text-[#ffb780]/80 transition-colors duration-300 hover:text-[#f2ca50]"
              href="#hikaye"
            >
              Hakkımızda
            </a>
          </div>

          <button
            className="relative rounded-full bg-surface-container-low p-2 text-[#f2ca50] transition-transform duration-300 hover:scale-105"
            onClick={() => setIsCartOpen(true)}
            type="button"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-on-primary">
                {cartCount}
              </span>
            ) : null}
          </button>
        </nav>
      </header>

      <main className="relative z-10">
        <section
          id="ana-sayfa"
          className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-6"
        >
          <div className="absolute inset-0 z-0">
            <img
              alt="Hogsmeade atmospherics"
              className="h-full w-full scale-105 object-cover opacity-30"
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface/0 via-surface/80 to-surface" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-label text-sm uppercase tracking-widest text-primary-fixed-dim">
              <span className="material-symbols-outlined text-sm">star</span>
              Sihirle Hazırlandı
            </div>

            <h1 className="font-headline text-5xl font-bold leading-tight text-primary md:text-7xl lg:text-8xl">
              HogsMade Cafe&apos;ye
              <br />
              Hoş Geldiniz
            </h1>

            <p className="mx-auto max-w-2xl font-body text-xl italic text-on-surface-variant md:text-2xl">
              Büyülü içecekler ve Büyük Salon lezzetleri burada, tarihin ve
              efsanelerin kalbinde sizi bekliyor.
            </p>

            <div className="pt-6">
              <a
                className="inline-block rounded-lg bg-primary px-10 py-5 font-label text-lg font-bold text-on-primary shadow-[0_0_20px_rgba(242,202,80,0.3)] transition-all duration-300 hover:scale-105 hover:bg-primary-container"
                href="#menu"
              >
                Büyülü Menüyü Keşfet
              </a>
            </div>
          </div>
        </section>

        <MenuSection addToCart={addToCart} />

        <section
          id="hikaye"
          className="relative overflow-hidden bg-surface-container-lowest/50 py-24"
        >
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-8 md:flex-row">
            <div className="relative w-full md:w-1/2">
              <div className="asymmetric-offset overflow-hidden rounded-xl border border-primary/20 shadow-2xl">
                <img
                  alt="Ancient Library"
                  className="h-[500px] w-full object-cover"
                  src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80"
                />
              </div>

              <div className="absolute -bottom-10 -right-10 flex h-40 w-40 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
                <svg
                  className="h-full w-full animate-[spin_10s_linear_infinite] fill-primary"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="transparent"
                  />
                  <text className="text-[10px] font-bold uppercase tracking-widest">
                    <textPath href="#circlePath">
                      HogsMade Cafe • Büyülü Lezzetler • 1997 •
                    </textPath>
                  </text>
                </svg>
                <span className="material-symbols-outlined absolute text-3xl text-primary">
                  verified
                </span>
              </div>
            </div>

            <div className="w-full space-y-6 md:w-1/2">
              <h2 className="font-headline text-4xl text-primary-fixed">
                Kadim Bir Gelenek
              </h2>
              <p className="font-body text-xl leading-loose text-on-surface">
                Kafemiz, sihrin mutfakla buluştuğu bir tapınaktır. Kullandığımız
                her malzeme, Diagon Yolu&apos;nun en seçkin dükkanlarından ve
                büyücülük dünyasının en güvenilir tariflerinden gelir.
              </p>
              <ul className="space-y-4 font-label text-secondary">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl text-primary">
                    check_circle
                  </span>
                  Günlük taze pişirilen baykuş postası atıştırmalıkları
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl text-primary">
                    check_circle
                  </span>
                  Sınırsız kaymakbirası teklifleri
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-xl text-primary">
                    check_circle
                  </span>
                  Ev cini onaylı reçeteler
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-[#d4af37]/10 bg-[#1a0a07]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 py-8 text-center font-body text-sm italic md:flex-row md:text-left">
          <div className="flex items-center gap-4">
            <span className="font-headline text-lg font-bold text-[#f2ca50]">
              HogsMade Cafe
            </span>
            <span className="text-[#ffb780]/60">
              © 2026 HogsMade Cafe. Sihirle hazırlanmıştır.
            </span>
          </div>
          <div className="flex gap-4 text-[#ffb780]/60">
            <span className="material-symbols-outlined text-[#f2ca50]/40">
              auto_awesome
            </span>
            <span className="material-symbols-outlined text-[#f2ca50]/40">
              castle
            </span>
          </div>
        </div>
      </footer>

      {isCartOpen ? (
        <CartDrawer
          cartItems={cartItems}
          checkout={handleCheckout}
          closeCart={() => setIsCartOpen(false)}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      ) : null}

      {showOrderSuccess ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 px-6 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border border-[#d4af37] bg-[#210e0a] p-8 text-center shadow-[0_0_40px_rgba(0,0,0,0.75)]">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#2d1611] text-3xl shadow-[0_0_18px_rgba(212,175,55,0.2)]">
              🦉
            </div>
            <h3 className="font-headline text-3xl text-[#f2ca50]">
              Siparişiniz Sihirle Alındı! 🦉
            </h3>
            <p className="mt-3 font-body text-lg italic text-[#ffb780]/80">
              Baykuşlarımız en kısa sürede yola çıkacak.
            </p>
            <button
              className="mt-8 inline-flex items-center justify-center rounded-xl border border-[#d4af37]/40 bg-[#d4af37] px-8 py-3 font-label text-sm font-bold uppercase tracking-[0.22em] text-[#3c2f00] shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 hover:bg-[#f2ca50] hover:shadow-[0_0_28px_rgba(212,175,55,0.45)]"
              onClick={() => setShowOrderSuccess(false)}
              type="button"
            >
              Kapat
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;
