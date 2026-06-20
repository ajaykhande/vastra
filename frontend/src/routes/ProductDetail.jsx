import { use, useState } from "react";
import "../css/productDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { bagActions } from "../store/bagSlice";

const ProductDetail = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showError, setShowError] = useState(false);
  const [selectedSize, setSelectedSize] = useState(false);

  const products = useSelector((store) => store.products.products);
  const product = products.find((product) => product.id === Number(id));

  const bagProducts = useSelector((store) => store.bag);
  const elementFound = bagProducts.some((bp) => bp.id === product.id);

  const isOutOfStock = product.variants.every((v) => v.stock === 0);

  const handleAddToBag = () => {
    if (!selectedSize) {
      setShowError(true);
      return;
    }
    dispatch(
      bagActions.addToBag({ id: product.id, size: selectedSize, qty: 1 }),
    );
  };

  return (
    <div className="product-detail-container">
      <div className="product-image-wrapper">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="main-product-img"
        />
      </div>

      <div className="product-info-wrapper">
        <h3 className="brand-name">{product.company}</h3>
        <h2 className="product-name">{product.name}</h2>

        <div className="price-section">
          <span className="product-current-price">
            Rs {product.currentPrice}
          </span>
          <span className="product-original-price">
            Rs {product.originalPrice}
          </span>
          <span className="product-discount-tag">
            ({product.discount}% OFF)
          </span>
        </div>

        <div className="size-selector">
          <p className="size-title">SELECT SIZE</p>
          {showError ? <p className="size-error">Please select a size</p> : ""}
          {isOutOfStock ? (
            <p className="size-error">Product out of stock</p>
          ) : (
            ""
          )}

          <div className="sizes">
            {product.variants.map((v) => (
              <button
                key={v.size}
                className={`size-btn 
                ${selectedSize === v.size ? "active" : ""}
                ${v.stock === 0 ? "out-of-stock" : ""}
                ${v.stock === 0 ? "disabled" : ""}
                `}
                onClick={() => {
                  setSelectedSize(v.size);
                  setShowError(false);
                }}
              >
                {v.size}
              </button>
            ))}
          </div>
        </div>

        <div className="action-buttons">
          {elementFound ? (
            <button className="add-to-bag-btn go-bag" onClick={() => navigate("/bag")}>GO TO BAG</button>
          ) : (
            <button
              className="add-to-bag-btn"
              disabled={isOutOfStock}
              onClick={handleAddToBag}
            >
              ADD TO BAG
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
