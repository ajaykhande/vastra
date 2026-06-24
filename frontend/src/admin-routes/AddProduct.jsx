import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addProduct, getProducts } from "../api/productApi";
import { productActions } from "../store/productSlice";

const AddProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    company: "",
    currentPrice: "",
    originalPrice: "",
    returnPeriod: "",
    imageUrl: "",
    variants: [
      { size: "M", stock: 0 },
      { size: "L", stock: 0 },
      { size: "XL", stock: 0 },
      { size: "XXL", stock: 0 },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "currentPrice" ||
        name === "originalPrice" ||
        name === "returnPeriod"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      await addProduct(product);

      const allProducts = await getProducts();
      dispatch(productActions.fetchProductsSuccess(allProducts));

      toast.success("Product added successfully");
      navigate("/admin/all-product");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-product-container">
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} className="edit-product-form">
        <div className="row">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={product.name}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <label>Company</label>
          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            value={product.company}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <label>Current Price</label>
          <input
            type="text"
            name="currentPrice"
            placeholder="Enter current price"
            value={product.currentPrice}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <label>Original Price</label>
          <input
            type="text"
            name="originalPrice"
            placeholder="Enter original price"
            value={product.originalPrice}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <label>Return Period Days</label>
          <input
            type="text"
            name="returnPeriod"
            placeholder="Enter return period"
            value={product.returnPeriod}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            placeholder="Enter image URL"
            value={product.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className="variants-section">
          <h3>Product Variants (Stock)</h3>

          <div className="variant-row">
            {product.variants.map((variant, index) => (
              <div key={index} className="variant-item">
                <span className="variant-size">{variant.size}</span>

                <input
                  type="text"
                  placeholder="Stock"
                  value={variant.stock}
                  onChange={(e) => {
                    const updatedVariants = [...product.variants];
                    updatedVariants[index].stock = Number(e.target.value);

                    setProduct((prev) => ({
                      ...prev,
                      variants: updatedVariants,
                    }));
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="btn-group">
          <button
            type="submit"
            className="btn-save"
            disabled={loading}
            style={{ cursor: loading ? "not-allowed" : "" }}
          >
            Save
          </button>

          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
