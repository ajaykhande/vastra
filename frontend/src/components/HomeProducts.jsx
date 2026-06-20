import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../api/wishlistApi";
import { useDispatch } from "react-redux";
import { wishlistActions } from "../store/wishlistSlice";
import WishlistButton from "./WishlistButton";

const HomeProducts = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="product-card item-container">
      <div
        className="image-wrapper"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img className="item-image" src={product.imageUrl} alt={product.name} />
      </div>

      <div className="price-container">
        <h4 className="company-name">{product.company}</h4>
        <p className="item-name">{product.name}</p>

        <div className="price">
          <span className="current-price">Rs {product.currentPrice}</span>
          <span className="original-price">Rs {product.originalPrice}</span>
          <span className="discount">({product.discount}% OFF)</span>
        </div>
      </div>
      <WishlistButton productId={product.id} />
    </div>
  );
};

export default HomeProducts;
