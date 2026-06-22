import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import ProductCard from "../components/ui/ProductCard";
import { ErrorState } from "../components/ui/PageLoader";
import "./ProductDetail.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, loading, error } = useProduct(id);

  if (loading) return <ProductDetailSkeleton />;
  if (error)   return (
    <div className="container" style={{ paddingBlock: "var(--space-20)" }}>
      <ErrorState message={error} />
    </div>
  );
  if (!data)   return null;

  const { product, related } = data;

  return (
    <div className="detail-page">
      {/* Breadcrumb */}
      <div className="detail-breadcrumb container">
        <Link to="/" className="breadcrumb-link">Home</Link>
        <span className="breadcrumb-sep">›</span>
        <Link to="/products" className="breadcrumb-link">Products</Link>
        <span className="breadcrumb-sep">›</span>
        <Link to={`/products?category=${product.category}`} className="breadcrumb-link">
          {product.category}
        </Link>
        <span className="breadcrumb-sep">›</span>
        <span className="breadcrumb-current">{product.name}</span>
      </div>

      {/* Main section */}
      <div className="detail-main container">
        <Gallery images={product.images} name={product.name} />
        <ProductInfo product={product} />
      </div>

      {/* Related products */}
      {related?.length > 0 && (
        <section className="detail-related">
          <div className="container">
            <div className="section-header">
              <div>
                <p className="eyebrow">You may also like</p>
                <h2 className="display-md section-title">Related Products</h2>
              </div>
              <Link to={`/products?category=${product.category}`} className="btn btn-ghost">
                View all →
              </Link>
            </div>
            <div className="product-grid">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} style={{ animationDelay: `${i * 80}ms` }} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function Gallery({ images, name }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="gallery">
      {images.length > 1 && (
        <div className="gallery__thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              className={`gallery__thumb ${i === active ? "gallery__thumb--active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img src={src} alt={`${name} view ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      )}
      <div
        className={`gallery__main ${zoomed ? "gallery__main--zoomed" : ""}`}
        onClick={() => setZoomed(!zoomed)}
        title={zoomed ? "Click to zoom out" : "Click to zoom in"}
      >
        <img src={images[active]} alt={name} className="gallery__img" draggable={false} />
        <span className="gallery__zoom-hint eyebrow">
          {zoomed ? "Click to zoom out" : "Click to zoom in"}
        </span>
      </div>
    </div>
  );
}

function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const handleAddToBag = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const SIZES = product.category === "Footwear"
    ? ["36","37","38","39","40","41","42","43","44","45"]
    : product.category === "Clothing"
    ? ["XS","S","M","L","XL","XXL"]
    : null;

  return (
    <div className="product-info fade-up">
      <div className="product-info__top">
        <span className="eyebrow product-info__brand">{product.brand}</span>
        <div className="product-info__badges">
          {product.new  && <span className="badge badge-new">New</span>}
          {product.sale && <span className="badge badge-sale">Sale</span>}
        </div>
      </div>

      <h1 className="product-info__name">{product.name}</h1>

      <div className="product-info__rating">
        <div className="detail-stars">
          {"★".repeat(Math.floor(product.rating))}
          {product.rating % 1 >= 0.5 ? "½" : ""}
        </div>
        <span className="product-info__reviews">
          {product.rating} · {product.reviews} reviews
        </span>
      </div>

      <div className="product-info__price-row">
        <span className="product-info__price">${product.price.toFixed(2)}</span>
        {product.originalPrice > product.price && (
          <>
            <span className="product-info__original">${product.originalPrice.toFixed(2)}</span>
            <span className="product-info__discount">−{discount}%</span>
          </>
        )}
      </div>

      <div className="divider" />

      <p className="product-info__description">{product.description}</p>

      {SIZES && (
        <div className="product-info__sizes">
          <div className="product-info__size-header">
            <p className="label">Size</p>
            {selectedSize && <span className="product-info__size-selected">{selectedSize}</span>}
          </div>
          <div className="size-grid">
            {SIZES.map((s) => (
              <button
                key={s}
                className={`size-btn ${selectedSize === s ? "size-btn--active" : ""}`}
                onClick={() => setSelectedSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="product-info__stock">
        <span className={`stock-dot ${product.stock <= 10 ? "stock-dot--low" : "stock-dot--ok"}`} />
        <span className="product-info__stock-text">
          {product.stock <= 10
            ? `Only ${product.stock} left in stock`
            : "In stock · Ready to ship"}
        </span>
      </div>

      <button
        className={`btn btn-primary btn-lg product-info__cta ${added ? "product-info__cta--added" : ""}`}
        onClick={handleAddToBag}
        disabled={added}
      >
        {added ? "✦ Added to Bag" : "Add to Bag"}
      </button>

      <button className="btn btn-ghost btn-lg product-info__wishlist">
        ♡ &nbsp;Save to Wishlist
      </button>

      <div className="divider" />

      {product.specs && (
        <div className="product-info__specs">
          <p className="label product-info__specs-title">Product Details</p>
          <dl className="specs-list">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="specs-row">
                <dt className="specs-key">{key}</dt>
                <dd className="specs-val">{val}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {product.tags?.length > 0 && (
        <div className="product-info__tags">
          {product.tags.map((tag) => (
            <Link key={tag} to={`/products?search=${tag}`} className="product-tag">{tag}</Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="detail-page">
      <div className="detail-breadcrumb container">
        <div className="skeleton" style={{ width: 220, height: 14, borderRadius: 4 }} />
      </div>
      <div className="detail-main container">
        <div className="gallery">
          <div className="skeleton gallery__main" style={{ aspectRatio: "1", borderRadius: 8 }} />
        </div>
        <div className="product-info" style={{ gap: "var(--space-4)" }}>
          {[120, 280, 80, 60, 400, 200].map((w, i) => (
            <div key={i} className="skeleton" style={{ width: w, height: i === 1 ? 40 : 18, borderRadius: 4 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
