import { useState } from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ product, style }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError]   = useState(false);

  const discount = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <article className="product-card fade-up" style={style}>
      <Link to={`/products/${product.id}`} className="product-card__img-wrap">
        {/* Skeleton while loading */}
        {!imgLoaded && !imgError && (
          <div className="product-card__img-skeleton skeleton" />
        )}

        {/* Fallback */}
        {imgError && (
          <div className="product-card__img-fallback">
            <span>✦</span>
          </div>
        )}

        <img
          src={product.images[0]}
          alt={product.name}
          className={`product-card__img ${imgLoaded ? "product-card__img--loaded" : ""}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />

        {/* Hover second image */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className="product-card__img product-card__img--hover"
            loading="lazy"
          />
        )}

        {/* Badges */}
        <div className="product-card__badges">
          {product.new  && <span className="badge badge-new">New</span>}
          {product.sale && discount && (
            <span className="badge badge-sale">−{discount}%</span>
          )}
        </div>

        {/* Quick action */}
        <div className="product-card__actions">
          <span className="product-card__quick-view">View Product</span>
        </div>
      </Link>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span className="product-card__brand eyebrow">{product.brand}</span>
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>

        <Link to={`/products/${product.id}`} className="product-card__name">
          {product.name}
        </Link>

        <div className="product-card__price-row">
          <span className="product-card__price">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice > product.price && (
            <span className="product-card__original">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

function StarRating({ rating, reviews }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className="star-rating" aria-label={`${rating} out of 5 stars`}>
      <div className="star-rating__stars">
        {"★".repeat(full)}
        {half ? "½" : ""}
        {"☆".repeat(empty)}
      </div>
      <span className="star-rating__count">({reviews})</span>
    </div>
  );
}
