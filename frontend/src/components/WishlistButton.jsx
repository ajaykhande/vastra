import { FaHeart, FaRegHeart } from "react-icons/fa";
import "../css/wishlist.css";
import { addToWishlist, removeFromWishlist } from "../api/wishlistApi";
import { wishlistActions } from "../store/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const WishlistButton = ({ productId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
  const wishlistIds = useSelector((store) => store.wishlist);
  const isWishlisted = wishlistIds.includes(productId);

  const handleWishlist = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    if (isWishlisted) {
      const removeFromWishlistRes = await removeFromWishlist(productId);
      dispatch(wishlistActions.removeFromWishlist(productId));
    } else {
      const addWishlistRes = await addToWishlist(productId);
      dispatch(wishlistActions.addToWishlist(productId));
    }
  };

  return (
    <>
      {isWishlisted ? (
        <div className="wishlist-btn" onClick={() => navigate("/wishlist")}>
          <FaHeart color="red" />
          GO TO WISHLIST
        </div>
      ) : (
        <div className="wishlist-btn" onClick={handleWishlist}>
          <FaRegHeart />
          WISHLIST
        </div>
      )}
    </>
  );
};

export default WishlistButton;
