import { Link } from "react-router-dom";
import "./Footer.css";

const LINKS = {
  Shop: [
    { label: "All Products",  to: "/products" },
    { label: "Clothing",      to: "/products?category=Clothing" },
    { label: "Accessories",   to: "/products?category=Accessories" },
    { label: "Footwear",      to: "/products?category=Footwear" },
    { label: "Home",          to: "/products?category=Home" },
  ],
  Company: [
    { label: "About Us",   to: "/about"   },
    { label: "Contact",    to: "/contact" },
  ],
};

export default function Footer() {
  const handleNewsletter = (e) => {
    e.preventDefault();
    e.target.reset();
    alert("Thank you for subscribing to Sahara.");
  };

  return (
    <footer className="footer">
      <div className="footer__top container">
        {/* Brand column */}
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-mark">✦</span>
            <span className="footer__logo-text">Sahara</span>
          </Link>
          <p className="footer__tagline">
            Premium curated goods for the modern nomad. Crafted to last, designed to travel.
          </p>
          <div className="footer__socials">
            {["Instagram", "Pinterest", "Twitter"].map((s) => (
              <a key={s} href="#" className="footer__social" aria-label={s}>
                {s[0]}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([heading, links]) => (
          <div key={heading} className="footer__col">
            <p className="footer__col-heading eyebrow">{heading}</p>
            <ul className="footer__col-links">
              {links.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to} className="footer__link">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div className="footer__newsletter">
          <p className="footer__col-heading eyebrow">Stay in the loop</p>
          <p className="footer__newsletter-copy">
            New arrivals, editorial stories, and members-only offers — straight to your inbox.
          </p>
          <form className="footer__form" onSubmit={handleNewsletter}>
            <input
              type="email"
              className="footer__input"
              placeholder="your@email.com"
              required
              aria-label="Email address"
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="footer__bottom container">
        <p className="footer__legal">
          © {new Date().getFullYear()} Sahara. All rights reserved.
        </p>
        <p className="footer__legal footer__legal--right">
          Crafted with intention.
        </p>
      </div>
    </footer>
  );
}
