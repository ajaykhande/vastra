import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../api/orderApi";
import { ordersActions } from "../store/orderSlice";
import { use, useEffect, useState } from "react";
import OrderProducts from "../components/OrderProducts";
import "../css/order.css";

const Order = () => {
  const dispatch = useDispatch();

  const [showCancelBtn, setShowCancelBtn] = useState(null);

  const orders = useSelector((store) => store.orders.orders);
  console.log(orders);
  useEffect(() => {
    const loadOrders = async () => {
      const ordersRe = await getOrders();
      dispatch(ordersActions.setOrders(ordersRe));
    };
    loadOrders();
  }, [dispatch]);

  return (
    <div className="bag-items-container">
      {orders.map((o) => (
        <OrderProducts
          key={o.id}
          order={o}
          showCancelBtn={showCancelBtn}
          setShowCancelBtn={setShowCancelBtn}
        />
      ))}
    </div>
  );
};

export default Order;
