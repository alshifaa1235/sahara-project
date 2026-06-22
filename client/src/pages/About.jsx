import { Link } from "react-router-dom";
import "./About.css";

const TIMELINE = [
  { year: "2018", title: "Founded in Marrakech", body: "Sahara began as a single market stall sourcing Berber textiles directly from Atlas Mountain weavers." },
  { year: "2019", title: "First Online Collection", body: "Forty products. Twelve artisan partners. Sold out in three weeks. We knew we were onto something." },
  { year: "2021", title: "Expanded to Footwear", body: "Partnered with a fourth-generation cobbler in Fez to craft our first leather sandal line." },
  { year: "2023", title: "Carbon-Neutral Shipping", body: "Every order shipped with fully offset emissions. A baseline, not a finish line." },
  { year: "2025", title: "100+ Artisan Partners", body: "From Egypt to Japan, our network of makers now spans 14 countries and four continents." },
];

const TEAM = [
  { name: "Layla Osman",    role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" },
  { name: "Marcus Webb",    role: "Head of Sourcing",            img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Aisha Ndiaye",   role: "Artisan Relations",           img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80" },
  { name: "Tom Eriksson",   role: "Design & Product",            img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
];

const PRINCIPLES = [
  { mark: "✦", heading: "Material honesty",  body: "We name every fibre, every origin, every process. No greenwashing, no vague claims." },
  { mark: "◈", heading: "Fair wages always", body: "Every partner is audited annually and paid at least 30% above local living wage." },
  { mark: "◇", heading: "Repair over replace", body: "We offer free lifetime repairs on all leather goods. Buy once, keep forever." },
  { mark: "○", heading: "Small batches",      body: "We never overproduce. When it's gone, it's gone — and that's intentional." },
];

export default function About() {
  return (
    <div className="about-page">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <img
            src="https://images.unsplash.com/photo-1466442929976-97f336a657be?w=1600&q=80"
            alt="Desert architecture"
            className="about-hero__img"
          />
          <div className="about-hero__overlay" />
        </div>
        <div className="about-hero__content container">
          <p className="eyebrow about-hero__eyebrow">Our Story</p>
          <h1 className="display-xl about-hero__title">
            Born from the<br /><em>desert's edge</em>
          </h1>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────── */}
      <section className="section about-mission">
        <div className="container about-mission__grid">
          <div className="about-mission__text fade-up">
            <p className="eyebrow">Who we are</p>
            <h2 className="display-md about-mission__heading">
              We exist to connect people with objects worth keeping.
            </h2>
          </div>
          <div className="about-mission__body fade-up">
            <p>
              Sahara is a curated product catalog built around a single conviction: the world
              doesn't need more things — it needs better ones. We source exclusively from
              artisans who share our obsession with material quality, ethical process, and
              lasting design.
            </p>
            <p>
              Every product in our catalog has been handled, tested, and lived with by our
              team before it reaches you. Nothing is listed because it looks good in a
              photo. Everything is listed because it performs beautifully in real life.
            </p>
            <Link to="/products" className="btn btn-primary" style={{ marginTop: "var(--space-4)", alignSelf: "flex-start" }}>
              Shop the Collection
            </Link>
          </div>
        </div>
      </section>

      {/* ── Principles ───────────────────────────────────── */}
      <section className="section about-principles">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--space-12)" }}>
            <p className="eyebrow">How we operate</p>
            <h2 className="display-md" style={{ marginTop: "var(--space-2)" }}>Our Principles</h2>
          </div>
          <div className="principles-grid">
            {PRINCIPLES.map(({ mark, heading, body }, i) => (
              <div key={heading} className="principle-card fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <span className="principle-card__mark">{mark}</span>
                <h3 className="principle-card__heading">{heading}</h3>
                <p className="principle-card__body">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────── */}
      <section className="section about-timeline">
        <div className="container">
          <div style={{ marginBottom: "var(--space-12)" }}>
            <p className="eyebrow">How we got here</p>
            <h2 className="display-md" style={{ marginTop: "var(--space-2)" }}>Our Journey</h2>
          </div>
          <div className="timeline">
            {TIMELINE.map(({ year, title, body }, i) => (
              <div key={year} className="timeline-item fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="timeline-item__year eyebrow">{year}</div>
                <div className="timeline-item__connector">
                  <div className="timeline-item__dot" />
                  {i < TIMELINE.length - 1 && <div className="timeline-item__line" />}
                </div>
                <div className="timeline-item__content">
                  <h3 className="timeline-item__title">{title}</h3>
                  <p className="timeline-item__body">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────── */}
      <section className="section about-team">
        <div className="container">
          <div className="text-center" style={{ marginBottom: "var(--space-12)" }}>
            <p className="eyebrow">The people</p>
            <h2 className="display-md" style={{ marginTop: "var(--space-2)" }}>Meet the Team</h2>
          </div>
          <div className="team-grid">
            {TEAM.map(({ name, role, img }, i) => (
              <div key={name} className="team-card fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="team-card__img-wrap">
                  <img src={img} alt={name} className="team-card__img" loading="lazy" />
                </div>
                <div className="team-card__info">
                  <h3 className="team-card__name">{name}</h3>
                  <p className="team-card__role eyebrow">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ───────────────────────────────────── */}
      <section className="about-cta">
        <div className="container about-cta__inner">
          <div>
            <p className="eyebrow" style={{ color: "var(--color-dune-lt)" }}>Ready to explore?</p>
            <h2 className="display-md about-cta__heading">
              Find something built to last.
            </h2>
          </div>
          <div className="about-cta__actions">
            <Link to="/products" className="btn btn-dune btn-lg">Browse Products</Link>
            <Link to="/contact" className="btn btn-secondary btn-lg about-cta__ghost">Get in Touch</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
