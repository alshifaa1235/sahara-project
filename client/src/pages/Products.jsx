import { useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts, useProductFilters, useProductMeta } from "../hooks/useProducts";
import ProductCard from "../components/ui/ProductCard";
import { ProductGridSkeleton, ErrorState, EmptyState } from "../components/ui/PageLoader";
import "./Products.css";

const SORT_OPTIONS = [
  { value: "",           label: "Featured"     },
  { value: "newest",     label: "New Arrivals" },
  { value: "price_asc",  label: "Price: Low–High" },
  { value: "price_desc", label: "Price: High–Low" },
  { value: "rating",     label: "Top Rated"    },
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const { filters, setFilter, resetFilters } = useProductFilters({
    category: searchParams.get("category") || "",
    search:   searchParams.get("search")   || "",
    sort:     searchParams.get("sort")     || "",
  });

  const { data, loading, error } = useProducts(filters);
  const { data: meta } = useProductMeta();

  // Sync URL params on mount only
  useEffect(() => {
    const cat    = searchParams.get("category");
    const search = searchParams.get("search");
    const sort   = searchParams.get("sort");
    if (cat)    setFilter("category", cat);
    if (search) setFilter("search",   search);
    if (sort)   setFilter("sort",     sort);
  }, []); // eslint-disable-line

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault();
      const q = e.target.elements.search.value.trim();
      setFilter("search", q);
    },
    [setFilter]
  );

  const hasActiveFilters =
    filters.category || filters.search || filters.sort;

  const categories = meta?.categories || [];

  return (
    <div className="products-page">
      {/* ── Page header ──────────────────────────────────── */}
      <div className="products-hero">
        <div className="container">
          <p className="eyebrow products-hero__eyebrow">The Collection</p>
          <h1 className="display-lg products-hero__title">All Products</h1>
          {data && !loading && (
            <p className="products-hero__count text-muted">
              {data.total} {data.total === 1 ? "item" : "items"}
              {filters.category && ` in ${filters.category}`}
              {filters.search   && ` matching "${filters.search}"`}
            </p>
          )}
        </div>
      </div>

      <div className="container products-layout">
        {/* ── Sidebar ──────────────────────────────────────── */}
        <aside className="products-sidebar">
          {/* Search */}
          <div className="sidebar-block">
            <p className="sidebar-label eyebrow">Search</p>
            <form onSubmit={handleSearch} className="sidebar-search">
              <input
                name="search"
                defaultValue={filters.search}
                className="input"
                placeholder="Products, brands…"
                aria-label="Search products"
              />
              <button type="submit" className="btn btn-primary btn-sm w-full" style={{ marginTop: "var(--space-2)" }}>
                Search
              </button>
            </form>
          </div>

          {/* Categories */}
          <div className="sidebar-block">
            <p className="sidebar-label eyebrow">Category</p>
            <ul className="sidebar-cats">
              <li>
                <button
                  className={`sidebar-cat ${!filters.category ? "sidebar-cat--active" : ""}`}
                  onClick={() => setFilter("category", "")}
                >
                  All Products
                  <span className="sidebar-cat__count">
                    {meta ? meta.categories.reduce(() => data?.total ?? 0, 0) : ""}
                  </span>
                </button>
              </li>
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    className={`sidebar-cat ${filters.category === cat ? "sidebar-cat--active" : ""}`}
                    onClick={() => setFilter("category", cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick filters */}
          <div className="sidebar-block">
            <p className="sidebar-label eyebrow">Filter</p>
            <div className="sidebar-pills">
              {[
                { key: "sale",       label: "On Sale"      },
                { key: "newArrival", label: "New Arrivals" },
                { key: "featured",   label: "Featured"     },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  className={`sidebar-pill ${filters[key] === "true" ? "sidebar-pill--active" : ""}`}
                  onClick={() =>
                    setFilter(key, filters[key] === "true" ? "" : "true")
                  }
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Reset */}
          {hasActiveFilters && (
            <button className="btn btn-ghost btn-sm w-full" onClick={resetFilters}>
              Clear all filters
            </button>
          )}
        </aside>

        {/* ── Main grid ────────────────────────────────────── */}
        <div className="products-main">
          {/* Toolbar */}
          <div className="products-toolbar">
            <div className="products-toolbar__tags">
              {filters.category && (
                <FilterTag label={filters.category} onRemove={() => setFilter("category", "")} />
              )}
              {filters.search && (
                <FilterTag label={`"${filters.search}"`} onRemove={() => setFilter("search", "")} />
              )}
            </div>

            <div className="products-toolbar__sort">
              <label htmlFor="sort-select" className="eyebrow sort-label">Sort</label>
              <select
                id="sort-select"
                className="sort-select"
                value={filters.sort}
                onChange={(e) => setFilter("sort", e.target.value)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          {loading && <ProductGridSkeleton count={8} />}
          {error   && <ErrorState message={error} />}

          {!loading && !error && data?.products.length === 0 && (
            <EmptyState
              title="No products found"
              message="Try a different category or search term."
              action={
                <button className="btn btn-secondary" onClick={resetFilters}>
                  Clear filters
                </button>
              }
            />
          )}

          {!loading && !error && data?.products.length > 0 && (
            <div className="product-grid">
              {data.products.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  style={{ animationDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <Pagination
              page={filters.page}
              totalPages={data.totalPages}
              onPageChange={(p) => setFilter("page", p)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────── */

function FilterTag({ label, onRemove }) {
  return (
    <span className="filter-tag">
      {label}
      <button className="filter-tag__remove" onClick={onRemove} aria-label={`Remove ${label} filter`}>
        ×
      </button>
    </span>
  );
}

function Pagination({ page, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="pagination" aria-label="Product pages">
      <button
        className="pagination__btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ← Prev
      </button>

      <div className="pagination__pages">
        {pages.map((p) => (
          <button
            key={p}
            className={`pagination__page ${p === page ? "pagination__page--active" : ""}`}
            onClick={() => onPageChange(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        className="pagination__btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  );
}
