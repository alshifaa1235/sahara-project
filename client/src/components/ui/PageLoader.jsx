import "./PageLoader.css";

/* ── Full-page suspense loader ───────────────────────────── */
export default function PageLoader() {
  return (
    <div className="page-loader" aria-label="Loading page">
      <div className="page-loader__mark">✦</div>
      <div className="page-loader__bar">
        <div className="page-loader__progress" />
      </div>
    </div>
  );
}

/* ── Inline spinner ─────────────────────────────────────── */
export function Spinner({ size = 24 }) {
  return (
    <svg
      className="spinner"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Loading"
    >
      <circle
        cx="12" cy="12" r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="32"
        strokeDashoffset="12"
      />
    </svg>
  );
}

/* ── Product grid skeleton ───────────────────────────────── */
export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="card-skeleton">
          <div className="card-skeleton__img skeleton" />
          <div className="card-skeleton__body">
            <div className="card-skeleton__line skeleton" style={{ width: "45%" }} />
            <div className="card-skeleton__line skeleton" style={{ width: "80%" }} />
            <div className="card-skeleton__line skeleton" style={{ width: "35%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Error state ─────────────────────────────────────────── */
export function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <div className="error-state__icon">✦</div>
      <h3 className="error-state__title">Something went wrong</h3>
      <p className="error-state__message">
        {message || "We couldn't load this content. Please try again."}
      </p>
      {onRetry && (
        <button className="btn btn-secondary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

/* ── Empty state ─────────────────────────────────────────── */
export function EmptyState({ title, message, action }) {
  return (
    <div className="error-state">
      <div className="error-state__icon" style={{ color: "var(--color-sand-300)" }}>◇</div>
      <h3 className="error-state__title">{title || "Nothing here"}</h3>
      <p className="error-state__message">
        {message || "Try adjusting your filters or search term."}
      </p>
      {action}
    </div>
  );
}
