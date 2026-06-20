import { useSelector } from "react-redux";
import BagItem from "../components/BagItem";
import "../css/bag.css";
import BagSummary from "../components/BagSummary";
import { useNavigate } from "react-router-dom";

const Bag = () => {
  const navigate = useNavigate();
  const bagProducts = useSelector((store) => store.bag);
  const products = useSelector((store) => store.products.products);

  const finalProducts = bagProducts.map((bp) => {
    const product = products.find((p) => p.id === bp.id);
    return {
      ...product,
      size: bp.size,
      qty: bp.qty,
    };
  });

  return bagProducts.length != 0 ? (
    <div className="bag-page">
      <div className="bag-items-container">
        {finalProducts.map((fp) => (
          <BagItem key={fp.id} product={fp} />
        ))}
      </div>
      <div className="bag-summary-container">
        <BagSummary products={finalProducts} />
      </div>
    </div>
  ) : (
    <div className="empty-bag">
      <img src="/images/empty-shopping-bag.png" />
      <h1>There Is Nothing In Your Bag.</h1>
      <button className="go-home-btn" onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default Bag;
