import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { wishlistActions } from "../store/wishlistSlice";
import { CiCircleRemove } from "react-icons/ci";
import { removeFromWishlist } from "../api/wishlistApi";
import { useState } from "react";

const WishlistProducts = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    if (loading) return;
    try {
      setLoading(true);
      await removeFromWishlist(item.id);
      dispatch(wishlistActions.removeFromWishlist(item.id));
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="product-card item-container">
      <div className="image-wrapper">
        <img className="item-image" src={item.imageUrl} alt={item.name} />
      </div>
      <div className="price-container">
        <h4 className="company-name">{item.company}</h4>
        <p className="item-name">{item.name}</p>

        <div className="price">
          <span className="current-price">Rs {item.currentPrice}</span>
          <span className="original-price">Rs {item.originalPrice}</span>
          <span className="discount">({item.discount}% OFF)</span>
        </div>
      </div>
      <span
        className="remove-wishlist"
        onClick={handleRemove}
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "" }}
      >
        REMOVE
      </span>
    </div>
  );
};

export default WishlistProducts;
