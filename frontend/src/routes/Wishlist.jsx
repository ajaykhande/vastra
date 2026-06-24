import { use } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import WishlistProducts from "../components/WishlistProducts";
import "../css/wishlist.css";

const Wishlist = () => {
  const navigate = useNavigate();
  const wishlistIds = useSelector((store) => store.wishlist);

  const products = useSelector((store) => store.products.products);
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));
  return (
    <>
      {wishlistIds.length != 0 ? (
        <div className="wishlist-items-container">
          {wishlistProducts.map((p) => (
            <WishlistProducts key={p.id} item={p} />
          ))}
        </div>
      ) : (
        <div className="empty-bag">
          <h1>❤️</h1>
          <h1>There Is Nothing In Your Wishlist.</h1>
          <button className="go-home-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      )}
    </>
  );
};

export default Wishlist;
