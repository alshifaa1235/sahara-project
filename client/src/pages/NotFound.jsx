import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="notfound__inner">
        <p className="eyebrow notfound__eyebrow">404</p>
        <div className="notfound__mark">✦</div>
        <h1 className="display-xl notfound__title">Lost in the dunes.</h1>
        <p className="notfound__body">
          The page you're looking for has drifted off the map. Let us guide you back.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
          <Link to="/products" className="btn btn-ghost btn-lg">Browse Products</Link>
        </div>
      </div>
      <div className="notfound__bg" aria-hidden="true">
        <span>404</span>
      </div>
    </div>
  );
}
