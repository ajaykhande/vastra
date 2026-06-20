import { useSelector } from "react-redux";
import ProductItem from "../admin-components/ProductItem";

const AllProduct = () => {
  const products = useSelector((store) => store.products.products);

  return (
    <div className="orders-item-container">
      {products.map((item) => (
        <ProductItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AllProduct;
