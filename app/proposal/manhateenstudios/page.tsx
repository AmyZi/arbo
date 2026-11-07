"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  ShoppingBag,
  Plus,
  Minus,
  X,
  Zap,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Truck,
  Menu,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const PRICE = 110;
const FREE_SHIPPING_AT = 100;

const COLORS = [
  { name: "Off-Black", hex: "#1c1c1c", tone: "#2a2a2a" },
  { name: "Faded Olive", hex: "#7a7c5a", tone: "#8d8f6b" },
  { name: "Raw Off-White", hex: "#ece8de", tone: "#f4f1e9" },
] as const;

const SIZES = [
  { label: "S", stock: 14 },
  { label: "M", stock: 11 },
  { label: "L", stock: 3 },
  { label: "XL", stock: 2 },
  { label: "XXL", stock: 12 },
] as const;

const hoodies = [
  "https://res.cloudinary.com/dh1zzn3o4/image/upload/f_auto,q_auto,c_fill,ar_3:4,w_1200/v1794034386/WhatsApp_Image_2026-11-07_at_07.50.58_1_xzftwv.jpg",
  "https://res.cloudinary.com/dh1zzn3o4/image/upload/f_auto,q_auto,c_fill,ar_3:4,w_1200/v1794034387/WhatsApp_Image_2026-11-07_at_07.50.58_iaks2f.jpg",
  "https://res.cloudinary.com/dh1zzn3o4/image/upload/f_auto,q_auto,c_fill,ar_3:4,w_1200/v1794034386/WhatsApp_Image_2026-11-07_at_07.50.58_2_a0wndg.jpg",
];

const SHOTS = [
  { id: "front", label: "Full-body fit — front", src: hoodies[0], variant: "front" },
  { id: "back", label: "Back view", src: hoodies[1], variant: "back" },
  { id: "fabric", label: "500GSM French terry — detail", src: hoodies[2], variant: "fabric" },
] as const;

const ACCORDIONS = [
  {
    id: "fit",
    title: "Fit & fabric details",
    body: [
      "500GSM French terry, brushed soft on the inside.",
      "Pre-shrunk 100% cotton, so the fit you try is the fit you keep.",
      "Dropped shoulder, oversized drop-fit. Model is 187 cm and wears size M.",
      "Size down for a closer fit.",
    ],
  },
  {
    id: "care",
    title: "Sustainability & care",
    body: [
      "Machine wash cold with similar colors, inside out.",
      "Lay flat to dry. Do not tumble dry.",
      "Cut and sewn in small batches to limit overproduction.",
    ],
  },
  {
    id: "shipping",
    title: "Shipping & returns",
    body: [
      "Free express shipping on orders over €100.",
      "Standard shipping is €5.90 on smaller orders.",
      "Return unworn items with tags within 30 days.",
    ],
  },
] as const;

type BagLine = { key: string; color: string; size: string; qty: number; hex: string };

/* ------------------------------------------------------------------ */
/* Studio placeholder                                                  */
/* ------------------------------------------------------------------ */

function HoodieArt({ variant, tone, dark }: { variant: string; tone: string; dark: boolean }) {
  const stroke = dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)";
  if (variant === "fabric") {
    return (
      <img src={hoodies[0]} alt="Offset in the Nothing to Prove hoodie" className="h-full w-full object-cover" />
    );
  }
  return (
    <img src={hoodies[0]} alt={`hoodie`} className="h-full w-full object-cover" />
  );
}

function Shot({
  shot,
  color,
  priority = false,
}: {
  shot: (typeof SHOTS)[number];
  color: (typeof COLORS)[number];
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const dark = color.name !== "Raw Off-White";
  if (shot.src && !failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={shot.src}
        alt={`Heavyweight French terry hoodie in ${color.name}, ${shot.label}`}
        className="h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div className="relative h-full w-full bg-[#eeeeec]" role="img" aria-label={`${color.name} hoodie, ${shot.label}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#f6f6f4] to-[#e6e6e3]" />
      <div className={shot.variant === "fabric" ? "absolute inset-0" : "absolute inset-x-[8%] inset-y-[6%]"}>
        <HoodieArt variant={shot.variant} tone={color.tone} dark={dark} />
      </div>
      <span className="absolute bottom-3 left-3 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
        {shot.label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function ManhateenProposalPage() {
  const [colorIdx, setColorIdx] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [openAcc, setOpenAcc] = useState<string | null>("fit");
  const [bagOpen, setBagOpen] = useState(false);
  const [bag, setBag] = useState<BagLine[]>([]);
  const [modalIdx, setModalIdx] = useState<number | null>(null);
  const [sizeGuide, setSizeGuide] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [sizeError, setSizeError] = useState(false);
  const carousel = useRef<HTMLDivElement>(null);

  const color = COLORS[colorIdx];
  const selected = SIZES.find((s) => s.label === size);
  const count = bag.reduce((n, l) => n + l.qty, 0);
  const subtotal = count * PRICE;

  // Lock body scroll + Esc to close overlays
  const overlayOpen = bagOpen || modalIdx !== null || sizeGuide || menuOpen;
  useEffect(() => {
    document.body.style.overflow = overlayOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setBagOpen(false);
        setModalIdx(null);
        setSizeGuide(false);
        setMenuOpen(false);
      }
      if (modalIdx !== null && e.key === "ArrowRight") setModalIdx((i) => (i === null ? i : (i + 1) % SHOTS.length));
      if (modalIdx !== null && e.key === "ArrowLeft") setModalIdx((i) => (i === null ? i : (i - 1 + SHOTS.length) % SHOTS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [overlayOpen, modalIdx]);

  const addToBag = (openDrawer = true) => {
    if (!size) {
      setSizeError(true);
      return false;
    }
    setSizeError(false);
    const key = `${color.name}-${size}`;
    setBag((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { key, color: color.name, size, qty: 1, hex: color.hex }];
    });
    if (openDrawer) setBagOpen(true);
    return true;
  };

  const updateQty = (key: string, d: number) =>
    setBag((prev) =>
      prev.map((l) => (l.key === key ? { ...l, qty: l.qty + d } : l)).filter((l) => l.qty > 0)
    );

  const onCarouselScroll = () => {
    const el = carousel.current;
    if (!el) return;
    setSlide(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goTo = (i: number) => carousel.current?.scrollTo({ left: i * carousel.current.clientWidth, behavior: "smooth" });

  const nav = ["New in", "Clothing", "Hoodies", "Campaign", "Archive"];

  return (
    <div className="min-h-screen bg-white font-sans text-neutral-950 antialiased">
      {/* Announcement bar */}
      <div className="bg-neutral-950 px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-white sm:text-[11px]">
        Manhateen Studios × Offset — Exclusive Drops
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-8">
          <div className="flex flex-1 items-center gap-8">
            <button className="lg:hidden" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
              <Menu className="h-5 w-5" />
            </button>
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
              {nav.map((n) => (
                <a key={n} href="#" className="text-[12px] font-medium uppercase tracking-[0.12em] text-neutral-700 hover:text-black">
                  {n}
                </a>
              ))}
            </nav>
          </div>
          <a href="#" className="text-center text-[15px] font-black uppercase leading-none tracking-[0.28em] sm:text-lg">
            Manhateen
          </a>
          <div className="flex flex-1 items-center justify-end gap-5">
            <button aria-label="Search" className="hover:opacity-60">
              <Search className="h-5 w-5" />
            </button>
            <button aria-label={`Open bag, ${count} items`} className="relative hover:opacity-60" onClick={() => setBagOpen(true)}>
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Product */}
      <main>
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1500px] px-4 py-4 text-[11px] uppercase tracking-[0.12em] text-neutral-500 sm:px-8"
        >
          Clothing / Hoodies / Oversized
        </nav>

        <section className="mx-auto grid max-w-[1500px] gap-0 lg:grid-cols-[1.2fr_1fr] lg:gap-12 lg:px-8">
          {/* Gallery: product image slider (swipe on touch, arrows + thumbnails on desktop) */}
          <div className="lg:flex lg:items-start lg:gap-3">
            {/* Thumbnail rail (desktop) */}
            <div className="hidden w-20 shrink-0 flex-col gap-2 lg:sticky lg:top-24 lg:flex">
              {SHOTS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Show image ${i + 1}: ${s.label}`}
                  aria-current={slide === i}
                  className={`aspect-[3/4] w-full overflow-hidden border transition ${
                    slide === i ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Shot shot={s} color={color} />
                </button>
              ))}
            </div>

            {/* Main slide */}
            <div className="relative min-w-0 flex-1 lg:sticky lg:top-24 lg:max-w-[620px]">
              <div
                ref={carousel}
                onScroll={onCarouselScroll}
                className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                role="region"
                aria-roledescription="carousel"
                aria-label="Product images"
              >
                {SHOTS.map((s, i) => (
                  <button
                    key={s.id}
                    onClick={() => setModalIdx(i)}
                    className="aspect-[3/4] w-full shrink-0 snap-center lg:cursor-zoom-in"
                    aria-label={`Zoom: ${s.label} (${i + 1} of ${SHOTS.length})`}
                  >
                    <Shot shot={s} color={color} priority={i === 0} />
                  </button>
                ))}
              </div>

              {/* Arrows */}
              <button
                onClick={() => goTo(Math.max(0, slide - 1))}
                disabled={slide === 0}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 transition hover:bg-white disabled:opacity-30 lg:flex"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => goTo(Math.min(SHOTS.length - 1, slide + 1))}
                disabled={slide === SHOTS.length - 1}
                aria-label="Next image"
                className="absolute right-3 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 transition hover:bg-white disabled:opacity-30 lg:flex"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Counter (desktop) */}
              <span className="pointer-events-none absolute right-3 top-3 hidden bg-white/90 px-2.5 py-1 text-[11px] font-medium tracking-[0.1em] lg:block">
                {slide + 1} / {SHOTS.length}
              </span>

              {/* Pills */}
              <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
                {SHOTS.map((s, i) => (
                  <button
                    key={s.id}
                    aria-label={`Go to image ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`pointer-events-auto h-1.5 rounded-full transition-all ${
                      slide === i ? "w-6 bg-black" : "w-1.5 bg-black/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="px-4 py-8 sm:px-8 lg:px-0 lg:py-0">
            <div className="lg:sticky lg:top-24">
              <h1 className="text-[26px] font-extrabold uppercase leading-[1.05] tracking-[0.02em] sm:text-3xl">
                Heavyweight French Terry Hoodie
              </h1>
              <p className="mt-2 text-sm text-neutral-600">&ldquo;Nothing to Prove&rdquo; Campaign Feature</p>

              <div className="mt-5">
                <p className="text-xl font-semibold">€{PRICE.toFixed(2)}</p>
                <p className="mt-1 text-[11px] text-neutral-500">Incl. VAT. Free express shipping over €{FREE_SHIPPING_AT}.</p>
              </div>

              {/* Colors */}
              <div className="mt-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.12em]">
                  Color: <span className="font-normal text-neutral-600">{color.name}</span>
                </p>
                <div className="mt-3 flex gap-3" role="radiogroup" aria-label="Color">
                  {COLORS.map((c, i) => (
                    <button
                      key={c.name}
                      role="radio"
                      aria-checked={colorIdx === i}
                      aria-label={c.name}
                      onClick={() => setColorIdx(i)}
                      className={`h-9 w-9 rounded-full p-[3px] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                        colorIdx === i ? "ring-1 ring-black" : "ring-1 ring-transparent hover:ring-neutral-300"
                      }`}
                    >
                      <span className="block h-full w-full rounded-full border border-black/10" style={{ background: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.12em]">
                    Size{size ? <span className="font-normal text-neutral-600">: {size}</span> : ""}
                  </p>
                  <button
                    onClick={() => setSizeGuide(true)}
                    className="text-[12px] uppercase tracking-[0.1em] text-neutral-600 underline underline-offset-4 hover:text-black"
                  >
                    Size guide
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-5 gap-2" role="radiogroup" aria-label="Size">
                  {SIZES.map((s) => (
                    <button
                      key={s.label}
                      role="radio"
                      aria-checked={size === s.label}
                      onClick={() => {
                        setSize(s.label);
                        setSizeError(false);
                      }}
                      className={`h-12 border text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                        size === s.label
                          ? "border-black bg-black text-white"
                          : "border-neutral-300 bg-white hover:border-black"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <div className="mt-2 min-h-5 text-[12px]" aria-live="polite">
                  {sizeError && <span className="text-red-600">Select a size to add to bag.</span>}
                  {!sizeError && selected && selected.stock <= 5 && (
                    <span className="font-medium text-amber-700">Low stock: only {selected.stock} left in {selected.label}</span>
                  )}
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => addToBag(true)}
                  className="h-14 w-full bg-black text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  Add to bag
                </button>
                <button
                  onClick={() => addToBag(true)}
                  className="h-12 w-full bg-neutral-100 text-[12px] font-semibold uppercase tracking-[0.14em] text-neutral-900 transition hover:bg-neutral-200"
                >
                  Express checkout (Apple Pay / Shop Pay)
                </button>
              </div>

              {/* Urgency */}
              <div className="mt-4 flex items-center gap-2 border border-neutral-200 px-4 py-3 text-[12px]">
                <Zap className="h-4 w-4 shrink-0" />
                <span>
                  <span className="font-semibold">Batch 01 — Limited run</span> (42 left in stock)
                </span>
              </div>

              {/* Accordions */}
              <div className="mt-8 border-t border-neutral-200">
                {ACCORDIONS.map((a) => {
                  const open = openAcc === a.id;
                  return (
                    <div key={a.id} className="border-b border-neutral-200">
                      <button
                        onClick={() => setOpenAcc(open ? null : a.id)}
                        aria-expanded={open}
                        aria-controls={`acc-${a.id}`}
                        className="flex w-full items-center justify-between py-4 text-left text-[12px] font-semibold uppercase tracking-[0.12em]"
                      >
                        {a.title}
                        <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
                      </button>
                      <div
                        id={`acc-${a.id}`}
                        className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                      >
                        <ul className="overflow-hidden text-sm leading-relaxed text-neutral-600">
                          {a.body.map((line, i) => (
                            <li key={i} className={`pb-2 ${i === 0 ? "" : ""}`}>
                              {line}
                            </li>
                          ))}
                          <li aria-hidden className="pb-2" />
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Campaign */}
        <section className="mt-16 grid lg:mt-24 lg:grid-cols-2" aria-labelledby="campaign-heading">
          <div className="relative aspect-[4/5] bg-[#e9e7e2] lg:aspect-auto lg:min-h-[640px]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f1efea] to-[#d9d6cf]" />
            <div className="absolute inset-x-[14%] inset-y-[8%] opacity-90">
              <HoodieArt variant="front=absolute inset-x-[14%] inset-y-[8%]" tone="opacity-90" dark />
            </div>
            <span className="absolute bottom-4 left-4 text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
              Offset — campaign editorial 
            </span>
          </div>
          <div className="flex items-center bg-neutral-100 px-6 py-16 sm:px-12 lg:px-20">
            <div className="max-w-md">
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">Nothing to Prove</p>
              <h2 id="campaign-heading" className="mt-5 text-3xl font-extrabold uppercase leading-[1.08] tracking-[0.01em] sm:text-4xl">
                The hoodie doesn&rsquo;t need to be loud. The person wearing it already speaks.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-neutral-600">
                Offset fronts Batch 01: one silhouette, three colors, 500GSM of French terry cut for a quiet kind of confidence.
              </p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-8 inline-block border border-black px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:bg-black hover:text-white"
              >
                Shop the hoodie
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-16 border-t border-neutral-200 px-4 py-8 text-center text-[11px] uppercase tracking-[0.14em] text-neutral-500">
        © 2026 Manhateen Studios — Proposal preview
      </footer>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white p-6 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button className="mb-8" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <X className="h-6 w-6" />
          </button>
          <nav className="flex flex-col gap-5">
            {nav.map((n) => (
              <a key={n} href="#" className="text-2xl font-extrabold uppercase tracking-[0.04em]" onClick={() => setMenuOpen(false)}>
                {n}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Image modal */}
      {modalIdx !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white" role="dialog" aria-modal="true" aria-label="Image viewer">
          <button className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center bg-neutral-100 hover:bg-neutral-200" aria-label="Close" onClick={() => { goTo(modalIdx); setModalIdx(null); }}>
            <X className="h-5 w-5" />
          </button>
          <button
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-neutral-100 hover:bg-neutral-200"
            aria-label="Previous image"
            onClick={() => setModalIdx((modalIdx - 1 + SHOTS.length) % SHOTS.length)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-neutral-100 hover:bg-neutral-200"
            aria-label="Next image"
            onClick={() => setModalIdx((modalIdx + 1) % SHOTS.length)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="aspect-[3/4] h-[88vh] max-w-full">
            <Shot shot={SHOTS[modalIdx]} color={color} priority />
          </div>
          <p className="absolute bottom-4 text-[11px] uppercase tracking-[0.14em] text-neutral-500">
            {modalIdx + 1} / {SHOTS.length}
          </p>
        </div>
      )}

      {/* Size guide */}
      {sizeGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setSizeGuide(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Size guide"
            className="w-full max-w-md bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-[0.14em]">Size guide (cm)</h2>
              <button aria-label="Close size guide" onClick={() => setSizeGuide(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <table className="mt-5 w-full text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-300 text-[11px] uppercase tracking-[0.12em] text-neutral-500">
                  <th className="py-2 font-medium">Size</th>
                  <th className="py-2 font-medium">Chest</th>
                  <th className="py-2 font-medium">Length</th>
                  <th className="py-2 font-medium">Sleeve</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["S", 58, 68, 62],
                  ["M", 61, 70, 63],
                  ["L", 64, 72, 64],
                  ["XL", 67, 74, 65],
                  ["XXL", 70, 76, 66],
                ].map(([s, c, l, sl]) => (
                  <tr key={s} className="border-b border-neutral-100">
                    <td className="py-2.5 font-medium">{s}</td>
                    <td>{c}</td>
                    <td>{l}</td>
                    <td>{sl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 text-[12px] text-neutral-500">Flat measurements. Oversized fit; size down for a closer cut.</p>
          </div>
        </div>
      )}

      {/* Bag drawer */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity ${bagOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setBagOpen(false)}
        aria-hidden={!bagOpen}
      />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        aria-hidden={!bagOpen}
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white transition-transform duration-300 ${
          bagOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.16em]">Bag ({count})</h2>
          <button aria-label="Close bag" onClick={() => setBagOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="border-b border-neutral-200 px-6 py-4 text-[12px]">
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            {subtotal >= FREE_SHIPPING_AT ? (
              <span className="font-medium">You&rsquo;ve unlocked free express shipping</span>
            ) : (
              <span>Add €{(FREE_SHIPPING_AT - subtotal).toFixed(2)} for free express shipping</span>
            )}
          </div>
          <div className="mt-2 h-1 bg-neutral-100">
            <div className="h-full bg-black transition-all" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_AT) * 100)}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {bag.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-8 w-8 text-neutral-300" />
              <p className="mt-4 text-sm text-neutral-600">Your bag is empty. Pick a size to add the hoodie.</p>
            </div>
          ) : (
            bag.map((l) => (
              <div key={l.key} className="flex gap-4 border-b border-neutral-100 py-5">
                <div className="aspect-[3/4] w-20 shrink-0 bg-[#eeeeec] p-2">
                  <HoodieArt variant="front" tone={l.hex} dark={l.color !== "Raw Off-White"} />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <p className="text-[12px] font-bold uppercase tracking-[0.06em]">Heavyweight French Terry Hoodie</p>
                    <p className="mt-1 text-[12px] text-neutral-500">
                      {l.color} / {l.size}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-neutral-300">
                      <button className="flex h-8 w-8 items-center justify-center hover:bg-neutral-100" aria-label="Decrease quantity" onClick={() => updateQty(l.key, -1)}>
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm">{l.qty}</span>
                      <button className="flex h-8 w-8 items-center justify-center hover:bg-neutral-100" aria-label="Increase quantity" onClick={() => updateQty(l.key, 1)}>
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-sm font-semibold">€{(l.qty * PRICE).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-neutral-200 p-6">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="font-semibold uppercase tracking-[0.1em]">Subtotal</span>
            <span className="font-semibold">€{subtotal.toFixed(2)}</span>
          </div>
          <button
            disabled={bag.length === 0}
            className="h-14 w-full bg-black text-[13px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300"
          >
            Checkout
          </button>
        </div>
      </aside>
    </div>
  );
}