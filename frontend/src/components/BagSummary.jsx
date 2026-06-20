import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ordersActions } from "../store/orderSlice";

const BagSummary = ({ products }) => {
  const CONVENIENCE_FEE = 99;
  let totalMRP = 0;
  let totalDiscount = 0;

  products.map((p) => {
    totalMRP += p.originalPrice * p.qty;
    totalDiscount += (p.originalPrice - p.currentPrice) * p.qty;
  });

  const finalAmount = totalMRP - totalDiscount + CONVENIENCE_FEE;
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePlaceOrder = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    dispatch(
      ordersActions.setOrderSummary({
        items: products,
        totalMRP,
        totalDiscount,
        convenienceFee: CONVENIENCE_FEE,
        finalAmount,
      }),
    );
    navigate("/checkout");
    alert("orderSummary create");
  };
  return (
    <div className="bag-summary">
      <h3>PRICE DETAILS ({products.length} Items)</h3>

      <div className="price-row">
        <span>Total MRP</span>
        <span>₹{totalMRP}</span>
      </div>

      <div className="price-row">
        <span>Discount</span>
        <span>-₹{totalDiscount}</span>
      </div>

      <div class="price-row">
        <span>Convenience Fee</span>
        <span>₹{CONVENIENCE_FEE}</span>
      </div>

      <hr />

      <div className="price-row total">
        <span>Total Amount</span>
        <span>₹{finalAmount}</span>
      </div>

      <button className="btn-place-order" onClick={handlePlaceOrder}>
        PLACE ORDER
      </button>
    </div>
  );
};

export default BagSummary;
