import { useSelector } from "react-redux";
import "../css/header.css";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const bagProducts = useSelector((store) => store.bag);
  const isLoggedIn = useSelector((store) => store.auth.isLoggedIn);
  const handleClick = () => {
    if (isLoggedIn) navigate("/profile");
    else navigate("/login");
  };
  return (
    <header>
      <div className="logo-container">
        <Link to="/">
          <img className="home-logo" src="/images/logo.png" alt="home logo" />
        </Link>
      </div>

      <div className="search-bar">
        <span className="material-symbols-outlined search-icon">search</span>
        <input
          className="search-input"
          placeholder="Search product by name or brand.."
        />
      </div>

      <div className="action-bar">
        <div className="action-container action-profile" onClick={handleClick}>
          <span className="material-symbols-outlined action-icon">person</span>
          <span className="action-name">Profile</span>
        </div>

        <div className="action-container" onClick={() => navigate("/wishlist")}>
          <span className="material-symbols-outlined action-icon">
            favorite
          </span>
          <span className="action-name">Wishlist</span>
        </div>

        <div
          className="action-container action-bag"
          onClick={() => navigate("/bag")}
        >
          <span className="material-symbols-outlined action-icon">
            shopping_bag
          </span>
          <span className="action-name">Bag</span>
          {bagProducts.length > 0 ? (
            <span className="bag-item-count">{bagProducts.length}</span>
          ) : (
            ""
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
