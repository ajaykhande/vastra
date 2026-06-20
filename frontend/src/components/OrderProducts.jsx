import { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder } from "../api/orderApi";
import { ordersActions } from "../store/orderSlice";
import CancelConfirmModal from "./CancelConfirmModal";
import { toast } from "react-toastify";

const OrderProducts = ({ order, showCancelBtn, setShowCancelBtn }) => {
  const dispatch = useDispatch();
  const [confirmModal, setConfirmModal] = useState(false);
  const activeCancelBtn = showCancelBtn === order.id;
  const products = useSelector((store) => store.products.products);
  const product = products.find((p) => p.id === order.productId);
  const formattedDate = new Date(order.orderDate).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCancel = async () => {
    setConfirmModal(false);
    const cancelRes = await cancelOrder(order.id);
    dispatch(ordersActions.cancelOrder(order.id));
    toast.success("Order canceled successfuly");
  };

  return (
    <>
      <div
        className="bag-item-container"
        style={{
          cursor: order.status === "CANCELLED" ? "default" : "pointer",
        }}
        onClick={() => setShowCancelBtn(activeCancelBtn ? null : order.id)}
      >
        <img
          className="bag-item-img"
          src={product.imageUrl}
          alt={product.name}
        />

        <div className="bag-item-info">
          <div className="company-name">{product.company}</div>
          <div className="item-name">{product.name}</div>

          <div className="price">
            <span className="current-price">Rs {product.currentPrice}</span>
            <span className="original-price">Rs {product.originalPrice}</span>
            <span className="discount">({product.discount}% OFF)</span>
          </div>

          <div className="size-qty-bar">
            <button className="order-size-qty">Size: {order.size} </button>

            <button className="order-size-qty">Qty: {order.quantity} </button>
          </div>
          <div className="order-place-date">
            <span className="order-place-on">Ordered on:</span>
            {formattedDate}
          </div>
          {order.status === "PLACED" && activeCancelBtn && (
            <div className="cancel-wrapper show">
              <button
                className="cancel-btn"
                onClick={() => setConfirmModal(true)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="order-status-container">
          <div
            className={`order-status ${
              order.status === "PLACED"
                ? "placed"
                : order.status === "CANCELLED"
                  ? "cancelled"
                  : ""
            }`}
          >
            {order.status}
          </div>
        </div>
      </div>
      {confirmModal && (
        <CancelConfirmModal
          productName={product.name}
          onConfirm={handleCancel}
          onClose={() => setConfirmModal(false)}
        />
      )}
    </>
  );
};

export default OrderProducts;
