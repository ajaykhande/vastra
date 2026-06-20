import { useNavigate } from "react-router-dom";
import "../css/orderSuccess.css";
const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="success-wrapper">
      <div className="success-card">
        <div className="circle-loader">
          <div className="checkmark">✔</div>
        </div>

        <h1>Your Order Has Been Placed!</h1>
        <p>Thank you for shopping with us 🎉</p>
        <p className="sub-text">
          You will receive order confirmation details shortly.
        </p>

        <div className="btn-group">
          <button className="btn shop-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>

          <button
            className="btn order-btn"
            onClick={() => navigate("/profile/orders")}
          >
            View MY Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
