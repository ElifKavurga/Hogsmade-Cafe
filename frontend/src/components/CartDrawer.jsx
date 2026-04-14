import { useState } from "react";

function CartDrawer({
  cartItems,
  removeFromCart,
  updateQuantity,
  closeCart,
  checkout,
}) {
  const [activeTab, setActiveTab] = useState("sepet");
  const [deliveryForm, setDeliveryForm] = useState({
    fullName: "",
    owlAddress: "",
    flightNote: "",
  });
  const [paymentForm, setPaymentForm] = useState({
    vaultNumber: "",
    magicCode: "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );
  const serviceFee = cartItems.length > 0 ? 15 : 0;
  const total = subtotal + serviceFee;

  function handlePrimaryAction() {
    if (activeTab === "sepet") {
      setActiveTab("teslimat");
      return;
    }

    if (activeTab === "teslimat") {
      setActiveTab("ödeme");
      return;
    }

    checkout();
  }

  function getPrimaryButtonLabel() {
    if (activeTab === "sepet") {
      return "Teslimat Bilgilerine Geç";
    }

    if (activeTab === "teslimat") {
      return "Ödeme Adımına Geç";
    }

    return "Siparişi Tamamla";
  }

  function renderCartTab() {
    return (
      <>
        {cartItems.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#d4af37]/20 bg-[#2d1611]/30 p-6 text-center">
            <h4 className="mb-2 text-lg font-bold text-[#f2ca50]">Sepetin boş</h4>
            <p className="text-sm text-[#ffb780]/70">
              Menümüzden birkaç büyülü lezzet seç ve siparişini hazırlayalım.
            </p>
          </div>
        ) : null}

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="group relative flex items-center gap-4 rounded-xl border border-transparent bg-[#2d1611]/40 p-3 transition-all duration-300 hover:border-[#f2ca50]/20"
          >
            <button
              className="absolute right-3 top-3 text-[#ffb780]/45 transition-colors hover:text-[#f2ca50]"
              onClick={() => removeFromCart(item.id)}
              type="button"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>

            <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-[#d4af37]/20">
              <img
                alt={item.name}
                className="h-full w-full object-cover"
                src={item.imageUrl}
              />
            </div>

            <div className="flex-1 pr-7">
              <h4 className="text-lg font-bold leading-tight text-[#f2ca50]">
                {item.name}
              </h4>
              <p className="mb-2 font-label text-xs text-[#ffb780]/60">
                {item.category?.name || "HogsMade Özel"}
              </p>
              <div className="flex items-center justify-between gap-4">
                <span className="font-bold text-on-surface">
                  {(Number(item.price) * item.quantity).toFixed(2)} TL
                </span>
                <div className="flex items-center gap-3 rounded-full border border-[#d4af37]/20 bg-[#210e0a] px-2 py-1">
                  <button
                    className="flex items-center text-[#ffb780] transition-colors hover:text-primary"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">remove</span>
                  </button>
                  <span className="min-w-[1rem] text-center font-label text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    className="flex items-center text-[#ffb780] transition-colors hover:text-primary"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 rounded-xl border border-dashed border-[#d4af37]/30 bg-gradient-to-br from-[#2d1611] to-[#3a251f] p-4">
          <div className="mb-2 flex items-center gap-3">
            <span className="material-symbols-outlined text-[#f2ca50]">
              auto_fix_high
            </span>
            <span className="text-sm font-bold text-[#f2ca50]">Büyülü Tavsiye</span>
          </div>
          <p className="text-xs italic leading-relaxed text-[#ffb780]/80">
            Yanında &quot;Çikolatalı Kurbağa&quot; ister misiniz? Menümüzdeki diğer tatlıları da keşfetmeyi unutmayın.
          </p>
        </div>
      </>
    );
  }

  function renderDeliveryTab() {
    return (
      <div className="space-y-5 rounded-2xl border border-[#d4af37]/15 bg-[#2d1611]/35 p-5">
        <div>
          <h4 className="font-headline text-2xl text-[#f2ca50]">
            Baykuş Teslimat Bilgileri
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[#ffb780]/70">
            Siparişinizin doğru kuleye ulaşması için teslimat büyülerini eksiksiz girin.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="font-label text-xs font-semibold uppercase tracking-[0.24em] text-[#ffb780]/75">
            Büyücü Adı Soyadı
          </span>
          <input
            className="w-full rounded-xl border border-[#d4af37]/20 bg-[#210e0a] px-4 py-3 font-body text-on-surface outline-none transition-all placeholder:text-[#ffb780]/30 focus:border-[#f2ca50]/50 focus:ring-2 focus:ring-[#f2ca50]/10"
            onChange={(event) =>
              setDeliveryForm((current) => ({
                ...current,
                fullName: event.target.value,
              }))
            }
            placeholder="Örn. Hermione Granger"
            type="text"
            value={deliveryForm.fullName}
          />
        </label>

        <label className="block space-y-2">
          <span className="font-label text-xs font-semibold uppercase tracking-[0.24em] text-[#ffb780]/75">
            Baykuş Teslimat Adresi
          </span>
          <input
            className="w-full rounded-xl border border-[#d4af37]/20 bg-[#210e0a] px-4 py-3 font-body text-on-surface outline-none transition-all placeholder:text-[#ffb780]/30 focus:border-[#f2ca50]/50 focus:ring-2 focus:ring-[#f2ca50]/10"
            onChange={(event) =>
              setDeliveryForm((current) => ({
                ...current,
                owlAddress: event.target.value,
              }))
            }
            placeholder="Örn. Gryffindor Kulesi, 7. Pencere"
            type="text"
            value={deliveryForm.owlAddress}
          />
        </label>

        <label className="block space-y-2">
          <span className="font-label text-xs font-semibold uppercase tracking-[0.24em] text-[#ffb780]/75">
            Uçuş Notu
          </span>
          <textarea
            className="min-h-28 w-full resize-none rounded-xl border border-[#d4af37]/20 bg-[#210e0a] px-4 py-3 font-body text-on-surface outline-none transition-all placeholder:text-[#ffb780]/30 focus:border-[#f2ca50]/50 focus:ring-2 focus:ring-[#f2ca50]/10"
            onChange={(event) =>
              setDeliveryForm((current) => ({
                ...current,
                flightNote: event.target.value,
              }))
            }
            placeholder="Örn. Baykuşun Büyük Salon penceresinden yaklaşmasına izin verin."
            value={deliveryForm.flightNote}
          />
        </label>
      </div>
    );
  }

  function renderPaymentTab() {
    return (
      <div className="space-y-5 rounded-2xl border border-[#d4af37]/15 bg-[#2d1611]/35 p-5">
        <div>
          <h4 className="font-headline text-2xl text-[#f2ca50]">
            Gringotts Ödeme Ritüeli
          </h4>
          <p className="mt-2 text-sm leading-relaxed text-[#ffb780]/70">
            Kasanızın sihirli bilgilerini girin, goblinler ödemenizi güvenle işlesin.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="font-label text-xs font-semibold uppercase tracking-[0.24em] text-[#ffb780]/75">
            Gringotts Kasa/Kart Numarası
          </span>
          <input
            className="w-full rounded-xl border border-[#d4af37]/20 bg-[#210e0a] px-4 py-3 font-body text-on-surface outline-none transition-all placeholder:text-[#ffb780]/30 focus:border-[#f2ca50]/50 focus:ring-2 focus:ring-[#f2ca50]/10"
            onChange={(event) =>
              setPaymentForm((current) => ({
                ...current,
                vaultNumber: event.target.value,
              }))
            }
            placeholder="Örn. 394-713-HP"
            type="text"
            value={paymentForm.vaultNumber}
          />
        </label>

        <label className="block space-y-2">
          <span className="font-label text-xs font-semibold uppercase tracking-[0.24em] text-[#ffb780]/75">
            Sihirli Şifre
          </span>
          <input
            className="w-full rounded-xl border border-[#d4af37]/20 bg-[#210e0a] px-4 py-3 font-body text-on-surface outline-none transition-all placeholder:text-[#ffb780]/30 focus:border-[#f2ca50]/50 focus:ring-2 focus:ring-[#f2ca50]/10"
            onChange={(event) =>
              setPaymentForm((current) => ({
                ...current,
                magicCode: event.target.value,
              }))
            }
            placeholder="••••••••"
            type="password"
            value={paymentForm.magicCode}
          />
        </label>

        <div className="rounded-xl border border-dashed border-[#d4af37]/20 bg-[#210e0a]/60 p-4">
          <p className="text-xs leading-relaxed text-[#ffb780]/75">
            Goblin güvenlik protokolü aktif. Tüm ödemeler büyü mühürleriyle korunur.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[90] bg-[#000000]/60 backdrop-blur-sm"
        onClick={closeCart}
      />

      <aside className="fixed right-0 top-0 z-[100] flex h-full w-full flex-col rounded-l-2xl border-l border-[#d4af37]/20 bg-[#210e0a] bg-opacity-95 p-0 font-['Noto_Serif'] leading-relaxed antialiased shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl md:w-96">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        />

        <header className="relative z-10 px-8 pb-6 pt-10">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-[#f2ca50] drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">
                Büyülü Sepetim
              </h2>
              <p className="mt-1 font-label text-sm uppercase tracking-wide text-[#ffb780]/70">
                Hogsmeade Seçkileri
              </p>
            </div>
            <button
              className="text-[#ffb780]/60 transition-colors hover:text-[#f2ca50]"
              onClick={closeCart}
              type="button"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
        </header>

        <nav className="relative z-10 mb-6 px-4">
          <div className="flex items-center justify-between rounded-full border border-[#d4af37]/10 bg-[#2d1611] p-1">
            {[
              { key: "sepet", label: "Sepet" },
              { key: "teslimat", label: "Teslimat" },
              { key: "ödeme", label: "Ödeme" },
            ].map((tab) => {
              const isActive = activeTab === tab.key;

              return (
                <button
                  key={tab.key}
                  className={`flex-1 rounded-full py-2 text-center font-label text-xs transition-all ${
                    isActive
                      ? "bg-[#f2ca50]/10 font-bold text-[#f2ca50]"
                      : "text-[#ffb780]/70 hover:text-[#f2ca50]"
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                  type="button"
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="relative z-10 flex-1 space-y-6 overflow-y-auto px-8 py-2">
          {activeTab === "sepet" ? renderCartTab() : null}
          {activeTab === "teslimat" ? renderDeliveryTab() : null}
          {activeTab === "ödeme" ? renderPaymentTab() : null}
        </div>

        <footer className="relative z-10 border-t border-[#d4af37]/20 bg-gradient-to-t from-[#1b0906] to-[#210e0a] p-8">
          <div className="mb-8 space-y-3">
            <div className="flex items-center justify-between font-label text-sm text-[#ffb780]/60">
              <span>Ara Toplam</span>
              <span>{subtotal.toFixed(2)} TL</span>
            </div>
            <div className="flex items-center justify-between font-label text-sm text-[#ffb780]/60">
              <span>Hizmet Bedeli</span>
              <span>{serviceFee.toFixed(2)} TL</span>
            </div>
            <div className="flex items-center justify-between border-t border-[#d4af37]/10 pt-3">
              <span className="text-xl font-bold text-[#f2ca50]">Toplam Tutar</span>
              <span className="text-2xl font-black text-[#f2ca50] drop-shadow-[0_0_5px_rgba(242,202,80,0.3)]">
                {total.toFixed(2)} TL
              </span>
            </div>
          </div>

          <button
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#d4af37] py-5 font-headline text-lg font-black uppercase tracking-widest text-[#3c2f00] shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 ease-in-out hover:bg-[#f2ca50] hover:shadow-[0_0_35px_rgba(212,175,55,0.6)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#d4af37] disabled:hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
            disabled={cartItems.length === 0}
            onClick={handlePrimaryAction}
            type="button"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              auto_stories
            </span>
            {getPrimaryButtonLabel()}
          </button>
          <p className="mt-4 text-center font-label text-[10px] uppercase tracking-widest text-[#ffb780]/40">
            Gringotts onaylı ödeme sistemi
          </p>
        </footer>
      </aside>
    </>
  );
}

export default CartDrawer;
