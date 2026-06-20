import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { placeOrder } from "../api/orderApi";
import Address from "../components/Address";
import "../css/checkout.css";
import { bagActions } from "../store/bagSlice";
import { ordersActions } from "../store/orderSlice";
import { toast } from "react-toastify";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const bag = useSelector((store) => store.bag);

  const orderSummary = useSelector((store) => store.orders.orderSummary);

  const address = useSelector((store) => store.auth.address);

  const handleConfirmOrder = async () => {
    const items = orderSummary.items;
    for (const item of items) {
      await placeOrder({
        productId: item.id,
        quantity: item.qty,
        size: item.size,
        totalAmount: item.currentPrice * item.qty,
      });
    }
    dispatch(bagActions.clearBag());
    dispatch(ordersActions.clearOrderSummary());
    navigate("/order-placed");
  };

  return (
    <div className="checkout-container">
      <div className="right-container">
        <Address />

        <div className="payment-container">
          <h4>Payment Method</h4>

          <label className="payment-option">
            <input type="radio" name="payment" value="COD" checked />
            Cash on Delivery{" "}
          </label>

          <label className="payment-option">
            <input type="radio" name="payment" value="ONLINE" />
            Online Payment{" "}
          </label>
        </div>
      </div>

      <div className="left-container">
        <div className="price-summary-container">
          <h3>Price Detail</h3>

          <div className="price-row">
            <span className="price-item-tag">Total MRP</span>
            <span className="price-item-value">
              {orderSummary.totalMRP || 0}
            </span>
          </div>

          <div className="price-row">
            <span className="price-item-tag">Discount</span>
            <span className="price-item-value">
              {orderSummary.totalDiscount}
            </span>
          </div>

          <div className="price-row">
            <span className="price-item-tag">Convenience Fee</span>
            <span className="price-item-value">
              {orderSummary.convenienceFee}
            </span>
          </div>

          <hr />

          <div className="price-row">
            <span className="price-item-tag">Total Amount</span>
            <span className="price-item-value">{orderSummary.finalAmount}</span>
          </div>
        </div>

        <button className="place-order-btn" onClick={handleConfirmOrder}>
          CONFIRM ORDER
        </button>
      </div>
    </div>
  );
};

export default Checkout;
