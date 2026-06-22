import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const NAV_LINKS = [
  { to: "/",        label: "Home"     },
  { to: "/products", label: "Products" },
  { to: "/about",   label: "About"    },
  { to: "/contact", label: "Contact"  },
];

export default function Navbar() {
  const [scrolled,     setScrolled]     = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [searchQuery,  setSearchQuery]  = useState("");
  const searchRef = useRef(null);
  const location  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-mark">✦</span>
            <span className="navbar__logo-text">Sahara</span>
          </Link>

          {/* Desktop nav */}
          <nav className="navbar__nav" aria-label="Main navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
                end={to === "/"}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="navbar__actions">
            {/* Search */}
            <div className={`navbar__search-wrap ${searchOpen ? "navbar__search-wrap--open" : ""}`}>
              <form onSubmit={handleSearch} className="navbar__search-form">
                <input
                  ref={searchRef}
                  type="search"
                  className="navbar__search-input"
                  placeholder="Search products…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search products"
                />
                <button type="submit" className="navbar__icon-btn" aria-label="Submit search">
                  <SearchIcon />
                </button>
              </form>
            </div>

            {!searchOpen && (
              <button
                className="navbar__icon-btn"
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
              >
                <SearchIcon />
              </button>
            )}

            {searchOpen && (
              <button
                className="navbar__icon-btn"
                onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                aria-label="Close search"
              >
                <CloseIcon />
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav className="mobile-menu__nav">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `mobile-menu__link ${isActive ? "mobile-menu__link--active" : ""}`
              }
              end={to === "/"}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mobile-menu__footer">
          <span className="eyebrow">Premium goods for the modern nomad</span>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="navbar__backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
