'use client'

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Copy, Check, ChevronLeft, ChevronRight, LineChart, CircleDollarSign, X, Send, CandlestickChart } from 'lucide-react'

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "HOW TO BUY", href: "#how-to-buy" },
  { label: "TOKENOMICS", href: "#tokenomics" },
  { label: "FAQ", href: "#faq" },
  { label: "MEME GALLERY", href: "#meme-gallery" },
]

// Shared centered container utilities
const SHELL = "w-full px-4"
const INNER = "mx-auto w-full max-w-[1400px]"

export default function Page() {
  return (
    <main className="text-white">
      <TopNav />
      <Hero />
      <AboutSection />
      <TokenomicsSection />
      <MemeGallerySection />
      <FooterSection />
    </main>
  )
}

/* ==================== NAV ==================== */

function TopNav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  return (
    <header className="sticky top-3 z-50">
      <div className={SHELL}>
        <div className={INNER}>
          {/* Desktop navbar */}
          <div className="mx-auto hidden h-14 items-center justify-between rounded-full border border-white/20 bg-black/80 px-3 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur md:flex md:h-16 md:px-4">
            <Link href="/" className="flex items-center gap-3 pl-1">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-YbI3nJ4Ea98t00ayXMpjKAKLaIiCkS.png"
                alt="Baby BOSS logo"
                width={36}
                height={36}
                className="h-9 w-9 rounded-full object-contain"
              />
              <span className="text-sm font-extrabold tracking-wide" style={{ color: "#f5c542" }}>
                BABY BOSS
              </span>
            </Link>

            <nav className="flex items-center gap-6">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold text-white/90 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center">
              <Link href="#how-to-buy">
                <Button className="h-10 rounded-full bg-[#ef4444] px-5 text-white shadow-[0_0_0_2px_#f5c542_inset] hover:bg-[#f05252]">
                  BUY NOW
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile top bar */}
          <MobileTopBar open={open} setOpen={setOpen} />
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </header>
  )
}

function MobileTopBar({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (v: boolean | ((p: boolean) => boolean)) => void
}) {
  return (
    <div className={`${SHELL} md:hidden`}>
      <div className={INNER}>
        <div className="mx-auto flex h-12 items-center justify-between rounded-full border border-white/20 bg-black/80 px-2 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur">
          <Link href="/" className="flex items-center gap-2 pl-1">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-YbI3nJ4Ea98t00ayXMpjKAKLaIiCkS.png"
              alt="Baby BOSS logo"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-contain"
            />
            <span className="text-xs font-extrabold tracking-wide" style={{ color: "#f5c542" }}>
              BABY BOSS
            </span>
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-white/85 bg-black/50 text-white"
          >
            {open ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <nav className="fixed inset-0 z-[60] bg-black" role="dialog" aria-modal="true">
      <div className="mx-auto flex h-full w-full max-w-screen-sm flex-col">
        <div className="flex items-center justify-between px-4 pt-4">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-YbI3nJ4Ea98t00ayXMpjKAKLaIiCkS.png"
              alt="Baby BOSS logo"
              width={28}
              height={28}
              className="h-7 w-7 rounded-full object-contain"
            />
            <span className="text-sm font-extrabold tracking-wide" style={{ color: "#f5c542" }}>
              BABY BOSS
            </span>
          </Link>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-white/85 text-white"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="mt-10 grid flex-1 place-items-center gap-7 px-6 text-center">
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              <a href={item.href} onClick={onClose} className="text-2xl font-extrabold tracking-wide text-white">
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="#how-to-buy"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full border-2 border-[#f5c542] px-7 py-2 text-lg font-extrabold text-white hover:bg-[#ef4444]"
            >
              BUY NOW
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

/* ==================== HERO ==================== */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className={SHELL}>
        <div className={`${INNER} relative z-10`}>
          <div
            className="
              relative mx-auto grid min-h-[min(92svh,980px)] w-full
              place-items-center pt-[clamp(16px,3vw,64px)]
              md:min-h-[min(86svh,920px)]
              xl:min-h-[min(88svh,1000px)]
            "
          >
            {/* Desktop floating CTAs */}
            <a
              href="#how-to-buy"
              className="
                group absolute left-[clamp(8px,2vw,32px)]
                top-[clamp(60px,12vw,220px)]
                hidden items-center gap-2 rounded-full border-2 border-[#f5c542]
                bg-transparent px-[clamp(16px,1.2vw,24px)] py-[clamp(6px,0.6vw,10px)]
                text-[clamp(12px,0.9vw,14px)] font-extrabold leading-none text-white
                shadow-[0_0_24px_rgba(245,197,66,0.25)]
                transition hover:bg-[#ef4444] md:inline-flex
              "
            >
              BUY NOW
              <svg className="h-[1.05em] w-[1.05em] transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>

            <div
              className="
                absolute right-[clamp(8px,2vw,32px)]
                top-[clamp(60px,12vw,220px)]
                hidden items-center gap-[clamp(8px,1vw,14px)] md:flex
              "
            >
              <a
                href="#"
                aria-label="Telegram"
                className="grid h-[clamp(40px,3.2vw,52px)] w-[clamp(40px,3.2vw,52px)] place-items-center rounded-full border-2 border-white/85 bg-black/30 text-white backdrop-blur transition hover:bg-white/10"
              >
                <svg className="h-[55%] w-[55%]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m21 3-9 9" />
                  <path d="m21 3-6 18-3-9-9-3 18-6z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="X"
                className="grid h-[clamp(40px,3.2vw,52px)] w-[clamp(40px,3.2vw,52px)] place-items-center rounded-full border-2 border-white/85 bg-black/30 text-white backdrop-blur transition hover:bg-white/10"
              >
                <svg className="h-[55%] w-[55%]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.9 2H21l-6.5 7.4L22 22h-6.8l-5.3-7-6 7H2.1l7-8.1L2 2h6.9l4.8 6.5L18.9 2Zm-2.4 18h1.9L7.6 4H5.6l10.9 16Z" />
                </svg>
              </a>
            </div>

            <h1
              className="text-center font-extrabold leading-none"
              style={{
                fontSize: "clamp(52px, 13.5vw, 220px)",
                color: "#0b0b0b",
                WebkitTextStroke: "0.065em #f5c542",
                letterSpacing: "0.015em",
                textShadow: "0 0 1.2em rgba(245,197,66,0.28), 0 0 2.6em rgba(239,68,68,0.22)",
              }}
            >
              BABY BOSS
            </h1>

            {/* Mobile CTAs under title */}
            <div className="mt-[clamp(16px,3.5vw,28px)] flex w-full flex-col items-center gap-4 md:hidden">
              <a
                href="#how-to-buy"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#f5c542] px-6 py-2 text-base font-extrabold leading-none text-white hover:bg-[#ef4444]"
              >
                BUY NOW
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="#"
                  aria-label="Telegram"
                  className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/85 bg-black/30 text-white backdrop-blur transition hover:bg-white/10"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="m21 3-9 9" />
                    <path d="m21 3-6 18-3-9-9-3 18-6z" />
                  </svg>
                </a>
                <a
                  href="#"
                  aria-label="X"
                  className="grid h-12 w-12 place-items-center rounded-full border-2 border-white/85 bg-black/30 text-white backdrop-blur transition hover:bg-white/10"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.9 2H21l-6.5 7.4L22 22h-6.8l-5.3-7-6 7H2.1l7-8.1L2 2h6.9l4.8 6.5L18.9 2Zm-2.4 18h1.9L7.6 4H5.6l10.9 16Z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==================== ABOUT ==================== */

function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden">
      {/* Grid background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-x-[-20%] bottom-[-15%] top-[10%] opacity-40"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(135,206,250,0.18) 0, rgba(135,206,250,0.18) 2px, transparent 2px, transparent 80px), repeating-linear-gradient(90deg, rgba(135,206,250,0.18) 0, rgba(135,206,250,0.18) 2px, transparent 2px, transparent 80px)",
            transform: "perspective(1400px) rotateX(58deg)",
            filter: "drop-shadow(0 0 10px rgba(245,197,66,0.08))",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
      </div>

      <div className={SHELL}>
        <div className={`${INNER} mx-auto`}>
          <div className="mx-auto grid items-center gap-10 py-[clamp(48px,8vw,96px)] md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <div className="space-y-2">
                <h2
                  className="text-left font-extrabold leading-[0.9]"
                  style={{ fontSize: "clamp(36px,7.2vw,90px)", letterSpacing: "0.01em" }}
                >
                  <span className="block text-white">ABOUT</span>
                  <span
                    className="block"
                    style={{
                      color: "#f5c542",
                      textShadow: "0 0 24px rgba(245,197,66,0.25), 0 0 48px rgba(239,68,68,0.22)",
                    }}
                  >
                    BABY BOSS
                  </span>
                </h2>
              </div>

              <div className="mt-6 space-y-4 text-[clamp(14px,1.6vw,18px)] leading-relaxed text-white/90">
                <p>
                  Baby BOSS is a bold, meme-ready superhero mascot forged for the internet.
                  Fueled by fun, style, and unstoppable vibes, the mission is simple:
                  bring entertainment and energy to every timeline.
                </p>
                <p>
                  Built with community at the core, Baby BOSS celebrates creativity and culture.
                  No empty promises — just a movement that looks sharp and plays hard.
                </p>
                <p>Join the squad and help push Baby BOSS to the top.</p>
              </div>

              <div className="mt-8">
                <a
                  href="#how-to-buy"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#f5c542] bg-white/0 px-7 py-3 text-lg font-extrabold text-white shadow-[0_0_24px_rgba(245,197,66,0.18)] transition hover:bg-[#ef4444]"
                >
                  BUY NOW
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="relative mx-auto max-w-[560px]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img1-q8mpOfChNBD8OehowUGIzCtlnMqyaz.png"
                  alt="Baby BOSS superhero mascot"
                  width={1120}
                  height={1120}
                  className="h-auto w-full drop-shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==================== TOKENOMICS ==================== */

function TokenomicsSection() {
  const [copied, setCopied] = useState(false)
  const ca = "XXXXX" // contract provided by user

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(ca)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore
    }
  }

  const accent = "#f5c542" // site accent (gold)

  return (
    <section id="tokenomics" className="relative overflow-hidden">
      <div className={SHELL}>
        <div className={`${INNER} mx-auto`}>
          <div className="mx-auto py-[clamp(56px,8vw,110px)]">
            <h2
              className="text-left font-extrabold uppercase leading-[0.9] tracking-tight"
              style={{ fontSize: "clamp(40px,8.5vw,120px)" }}
            >
              TOKENOMICS
            </h2>

            <div className="mt-[clamp(18px,3vw,28px)] grid gap-[clamp(14px,2vw,20px)] md:grid-cols-12">
              <div className="md:col-span-6">
                <div
                  className="rounded-[18px] px-[clamp(18px,2vw,28px)] py-[clamp(16px,2.4vw,24px)]"
                  style={{ backgroundColor: accent, color: "#0b0b0b" }}
                >
                  <div className="font-extrabold leading-none" style={{ fontSize: "clamp(22px,3.2vw,38px)" }}>
                    LP 100%
                  </div>
                  <div className="mt-2 font-extrabold leading-none" style={{ fontSize: "clamp(26px,3.8vw,44px)" }}>
                    BURNED
                  </div>
                </div>
              </div>

              <div className="md:col-span-6">
                <div className="rounded-[18px] bg-white px-[clamp(18px,2vw,28px)] py-[clamp(16px,2.4vw,24px)] text-black">
                  <div
                    className="font-extrabold leading-none"
                    style={{ fontSize: "clamp(22px,3.2vw,38px)", color: accent }}
                  >
                    TOTAL SUPPLY
                  </div>
                  <div
                    className="mt-2 font-extrabold leading-none"
                    style={{ fontSize: "clamp(28px,4.4vw,56px)" }}
                  >
                    1,000,000,000
                  </div>
                </div>
              </div>

              <div className="md:col-span-7">
                <div className="rounded-[18px] bg-white px-[clamp(18px,2vw,28px)] py-[clamp(16px,2.4vw,24px)] text-black">
                  <div className="font-extrabold leading-none" style={{ fontSize: "clamp(22px,3.2vw,38px)" }}>
                    CONTRACT RENOUNCED
                  </div>
                </div>
              </div>

              <div className="md:col-span-5">
                <div
                  className="rounded-[18px] px-[clamp(18px,2vw,28px)] py-[clamp(16px,2.4vw,24px)]"
                  style={{ backgroundColor: accent, color: "#0b0b0b" }}
                >
                  <div className="font-extrabold leading-none" style={{ fontSize: "clamp(22px,3.2vw,38px)" }}>
                    FAIR LAUNCH
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[clamp(20px,3.2vw,32px)]">
              <div className="mx-auto max-w-[940px] rounded-[18px] bg-white/95 text-black">
                <div className="flex items-center justify-between gap-3 px-[clamp(16px,2vw,24px)] py-[clamp(12px,1.6vw,16px)]">
                  <div className="flex items-center gap-4">
                    <span className="text-[clamp(16px,2vw,20px)] font-extrabold">CA</span>
                    <div className="h-6 w-px bg-black/20" />
                    <span className="text-[clamp(14px,1.8vw,20px)] font-extrabold">{ca}</span>
                  </div>
                  <button
                    onClick={onCopy}
                    className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-black/5 px-3 py-1.5 text-sm font-semibold hover:bg-black/10"
                    aria-label="Copy contract address"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ==================== MEME GALLERY ==================== */

function MemeGallerySection() {
  const images = [
    "/images/gallery/1.jpg",
    "/images/gallery/2.jpg",
    "/images/gallery/3.jpg",
    "/images/gallery/4.jpg",
    "/images/gallery/5.jpg",
    "/images/gallery/6.jpg",
    "/images/gallery/7.jpg",
    "/images/gallery/8.jpg",
    "/images/gallery/9.jpg",
  ]
  const items = [...images, ...images]

  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const speedPxPerSec = 22
    const el = scrollerRef.current
    if (!el) return

    const step = (t: number) => {
      if (paused) {
        last = t
        raf = requestAnimationFrame(step)
        return
      }
      const dt = (t - last) / 1000
      last = t
      el.scrollLeft += speedPxPerSec * dt
      const half = el.scrollWidth / 2
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [paused])

  const scrollByCard = (dir: 1 | -1) => {
    const el = scrollerRef.current
    const track = trackRef.current
    if (!el || !track) return

    const firstCard = track.querySelector<HTMLElement>('[data-card]')
    const gap = parseFloat(getComputedStyle(track).gap || "16")
    const amount = (firstCard?.offsetWidth || 280) + (isNaN(gap) ? 16 : gap)
    const target = el.scrollLeft + dir * amount
    el.scrollTo({ left: target, behavior: "smooth" })
  }

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    let isDown = false
    let startX = 0
    let startLeft = 0

    const onPointerDown = (e: PointerEvent) => {
      isDown = true
      startX = e.clientX
      startLeft = el.scrollLeft
      el.setPointerCapture(e.pointerId)
      setPaused(true)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!isDown) return
      const dx = e.clientX - startX
      el.scrollLeft = startLeft - dx
    }
    const onPointerUp = (e: PointerEvent) => {
      isDown = false
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {}
      setPaused(false)
    }

    el.addEventListener("pointerdown", onPointerDown)
    el.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    return () => {
      el.removeEventListener("pointerdown", onPointerDown)
      el.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [])

  return (
    <section id="meme-gallery" className="relative overflow-hidden">
      <div className={SHELL}>
        <div className={`${INNER} mx-auto`}>
          <div className="py-[clamp(56px,8vw,110px)]">
            <div className="flex items-center justify-between">
              <h2
                className="font-extrabold uppercase leading-[0.9] tracking-tight"
                style={{ fontSize: "clamp(40px,8.5vw,120px)" }}
              >
                MEME <span style={{ color: '#f5c542' }}>GALLERY</span>
              </h2>

              <div className="hidden gap-2 md:flex">
                <button
                  aria-label="Scroll gallery left"
                  onClick={() => scrollByCard(-1)}
                  className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/70 bg-black/40 text-white backdrop-blur transition hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  aria-label="Scroll gallery right"
                  onClick={() => scrollByCard(1)}
                  className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/70 bg-black/40 text-white backdrop-blur transition hover:bg-white/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              ref={scrollerRef}
              className="relative mt-[clamp(18px,3vw,28px)] overflow-hidden"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={() => setPaused(true)}
              onTouchEnd={() => setPaused(false)}
            >
              <div
                ref={trackRef}
                className="flex w-max select-none gap-[clamp(14px,2vw,24px)] pb-2"
                role="list"
                aria-label="Meme images carousel"
              >
                {items.map((src, i) => (
                  <GalleryCard key={i} src={src} alt={`Baby BOSS meme ${((i % images.length) + 1)}`} />
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-3 md:hidden">
              <button
                aria-label="Scroll gallery left"
                onClick={() => scrollByCard(-1)}
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/70 bg-black/40 text-white backdrop-blur transition hover:bg-white/10"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                aria-label="Scroll gallery right"
                onClick={() => scrollByCard(1)}
                className="grid h-11 w-11 place-items-center rounded-full border-2 border-white/70 bg-black/40 text-white backdrop-blur transition hover:bg-white/10"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GalleryCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      data-card
      className="
        relative h-[clamp(260px,34vw,360px)]
        w-[clamp(220px,28vw,320px)]
        shrink-0 rounded-[22px] bg-white p-[clamp(10px,1.2vw,14px)]
        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
      "
      role="listitem"
    >
      <span
        aria-hidden="true"
        className="absolute left-4 top-4 inline-block h-5 w-5 rounded-full border-[3px]"
        style={{ borderColor: '#f5c542' }}
      />
      <span
        aria-hidden="true"
        className="absolute right-4 top-4 inline-block h-5 w-5 rounded-full border-[3px]"
        style={{ borderColor: '#f5c542' }}
      />

      <div className="relative h-full w-full overflow-hidden rounded-[14px]">
        <img
          src={src || "/placeholder.svg?height=320&width=280&query=baby%20boss%20meme"}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    </div>
  )
}

/* ==================== FOOTER ==================== */

function FooterSection() {
  const accent = "#f5c542"

  const socials = [
    { label: "CoinMarketCap", href: "#", icon: <LineChart className="h-5 w-5" /> },
    { label: "CoinGecko", href: "#", icon: <CircleDollarSign className="h-5 w-5" /> },
    { label: "X", href: "#", icon: <X className="h-5 w-5" /> },
    { label: "Telegram", href: "#", icon: <Send className="h-5 w-5" /> },
    { label: "DexScreener", href: "#", icon: <CandlestickChart className="h-5 w-5" /> },
  ]

  return (
    <footer className="relative">
      <div className={SHELL}>
        <div className={`${INNER} mx-auto`}>
          <div className="border-y-2 border-white/30 border-dashed py-[clamp(28px,5vw,56px)]">
            <div className="grid items-center gap-10 md:grid-cols-[1fr_auto_auto]">
              {/* Left: Wordmark */}
              <div className="text-left">
                <div
                  className="font-extrabold leading-none"
                  style={{
                    fontSize: "clamp(48px,9vw,120px)",
                    color: "#0b0b0b",
                    WebkitTextStroke: "0.06em " + accent,
                    letterSpacing: "0.01em",
                    textShadow: "0 0 28px rgba(245,197,66,0.18)",
                  }}
                  aria-label="Baby BOSS"
                >
                  BABY BOSS
                </div>
              </div>

              {/* Middle: Links */}
              <nav className="justify-self-start md:justify-self-center">
                <ul className="space-y-3 text-lg font-extrabold tracking-wide">
                  {NAV_LINKS.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="text-white/90 transition-colors hover:text-white">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Right: Socials */}
              <div className="grid grid-cols-5 gap-3 justify-self-start md:justify-self-end">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-12 w-12 place-items-center rounded-full border-2 border-white bg-black text-white shadow-[0_0_0_2px_rgba(255,255,255,0.15)_inset] transition hover:shadow-[0_0_18px_rgba(245,197,66,0.35)]"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Optional small print */}
          <div className="py-6 text-center text-sm text-white/60">
            <span>© {new Date().getFullYear()} Baby BOSS. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
