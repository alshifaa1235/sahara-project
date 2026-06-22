import { Link } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ui/ProductCard";
import { ProductGridSkeleton, ErrorState } from "../components/ui/PageLoader";
import "./Home.css";

const CATEGORIES = [
  {
    name: "Clothing",
    description: "Linen, merino, and natural fibres",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
  },
  {
    name: "Accessories",
    description: "Leather goods and eyewear",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
  },
  {
    name: "Footwear",
    description: "Crafted for the long walk",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
  },
  {
    name: "Home",
    description: "Objects that outlast the moment",
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=600&q=80",
  },
];

const BRAND_VALUES = [
  { mark: "✦", title: "Natural Materials", body: "Every product starts with what the earth provides." },
  { mark: "◈", title: "Slow Fashion",      body: "Made in small runs, never in excess." },
  { mark: "◇", title: "Global Craft",      body: "Artisans from Morocco to Japan." },
  { mark: "○", title: "Built to Last",     body: "Designed to be repaired, not replaced." },
];

export default function Home() {
  const { data, loading, error } = useProducts({ featured: true, limit: 8 });

  return (
    <div className="home">
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__bg">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&q=85"
            alt="Desert landscape"
            className="hero__bg-img"
          />
          <div className="hero__overlay" />
        </div>

        <div className="hero__content container">
          <div className="hero__text fade-up">
            <p className="eyebrow hero__eyebrow">New Season — 2025</p>
            <h1 className="display-xl hero__headline">
              Goods made<br />
              <em>for the journey</em>
            </h1>
            <p className="hero__subhead">
              Curated clothing, accessories, and objects from artisans
              who believe the best things are built to last a lifetime.
            </p>
            <div className="hero__ctas">
              <Link to="/products" className="btn btn-dune btn-lg">
                Shop Collection
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg hero__cta-ghost">
                Our Story
              </Link>
            </div>
          </div>

          <div className="hero__scroll-hint" aria-hidden="true">
            <span className="eyebrow">Scroll</span>
            <div className="hero__scroll-line" />
          </div>
        </div>
      </section>

      {/* ── Marquee strip ─────────────────────────────────── */}
      <div className="marquee-strip" aria-hidden="true">
        <div className="marquee-track">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} className="marquee-items">
              {["Free shipping over $200", "Sustainably sourced", "Handcrafted quality",
                "Free returns", "Lifetime repairs", "Natural materials only"].map((t) => (
                <span key={t} className="marquee-item">
                  <span className="marquee-dot">✦</span> {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured products ──────────────────────────────── */}
      <section className="section featured">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Hand-picked</p>
              <h2 className="display-md section-title">Featured Products</h2>
            </div>
            <Link to="/products" className="btn btn-ghost">
              View all →
            </Link>
          </div>

          {loading && <ProductGridSkeleton count={8} />}
          {error   && <ErrorState message={error} />}
          {data && (
            <div className="product-grid">
              {data.products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  style={{ animationDelay: `${i * 60}ms` }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Category grid ─────────────────────────────────── */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="eyebrow">Browse by</p>
              <h2 className="display-md section-title">Categories</h2>
            </div>
          </div>
          <div className="categories-grid">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.name}
                to={`/products?category=${cat.name}`}
                className="category-card fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="category-card__img-wrap">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="category-card__img"
                    loading="lazy"
                  />
                  <div className="category-card__overlay" />
                </div>
                <div className="category-card__body">
                  <h3 className="category-card__name">{cat.name}</h3>
                  <p className="category-card__desc">{cat.description}</p>
                  <span className="category-card__cta eyebrow">Shop now →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand values ──────────────────────────────────── */}
      <section className="section values-section">
        <div className="container">
          <div className="values-grid">
            {BRAND_VALUES.map(({ mark, title, body }, i) => (
              <div
                key={title}
                className="value-card fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="value-card__mark">{mark}</span>
                <h3 className="value-card__title">{title}</h3>
                <p className="value-card__body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial banner ──────────────────────────────── */}
      <section className="editorial">
        <div className="editorial__img-wrap">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1400&q=80"
            alt="Travel lifestyle"
            className="editorial__img"
            loading="lazy"
          />
          <div className="editorial__overlay" />
        </div>
        <div className="editorial__content container">
          <div className="editorial__text">
            <p className="eyebrow" style={{ color: "var(--color-dune-lt)" }}>
              The Sahara Edit
            </p>
            <h2 className="display-lg editorial__headline">
              Pack less.<br />Live more.
            </h2>
            <p className="editorial__body">
              A curated selection of essentials built around the idea that fewer,
              better things create a richer life.
            </p>
            <Link to="/products?sort=newest" className="btn btn-dune btn-lg">
              Shop New Arrivals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
