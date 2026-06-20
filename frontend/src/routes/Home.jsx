import { useSelector } from "react-redux";
import HomeProducts from "../components/HomeProducts";

const Home = () => {
  const products = useSelector((store) => store.products.products);

  return (
  
      <div className="home-products-container">
        {products.map((product) => (
          <HomeProducts key={product.id} product={product} />
        ))}
      </div>
   
  );
};

export default Home;
