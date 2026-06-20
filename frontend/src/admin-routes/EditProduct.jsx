import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getProducts, updateProduct } from "../api/productApi";
import Spinners from "../components/Spinners";
import { productActions } from "../store/productSlice";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector((store) => store.products.products);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (items.length === 0) return;

    const foundProduct = items.find((item) => item.id === Number(id));

    if (!foundProduct) {
      toast.error("Product not found");
      navigate("/admin/all-product");
      return;
    }

    setProduct(JSON.parse(JSON.stringify(foundProduct)));
  }, [items, id, navigate]);

  if (!product) {
    return <Spinners />;
  }

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

    await updateProduct(product.id, product);
    const allProduct = await getProducts();
    dispatch(productActions.fetchProductsSuccess(allProduct));
    toast.success("Product updated successfully");
    navigate("/admin/all-product");
  };

  return (
    <div className="edit-product-container">
      <h2>Edit Product</h2>

      <form onSubmit={handleSubmit} className="edit-product-form">
        <div className="row">
          <label>Product Name</label>
          <input
            name="name"
            placeholder="Enter product name"
            value={product.name || ""}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <label>Company</label>
          <input
            name="company"
            placeholder="Enter company name"
            value={product.company || ""}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <label>Current Price</label>
          <input
            type="number"
            name="currentPrice"
            placeholder="Enter current price"
            value={product.currentPrice ?? ""}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <label>Original Price</label>
          <input
            type="number"
            name="originalPrice"
            placeholder="Enter original price"
            value={product.originalPrice ?? ""}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <label>Return Period Days</label>
          <input
            type="number"
            name="returnPeriod"
            placeholder="Enter return period"
            value={product.returnPeriod ?? ""}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <label>Image URL</label>
          <input
            name="imageUrl"
            placeholder="Enter image URL"
            value={product.imageUrl || ""}
            onChange={handleChange}
          />
        </div>

        {/* ✅ VARIANTS SECTION */}
        <div className="variants-section">
          <h3>Product Variants (Stock)</h3>

          <div className="variant-row">
            {product.variants?.map((variant, index) => (
              <div key={index} className="variant-item">
                <span className="variant-size">{variant.size}</span>

                <input
                  type="number"
                  placeholder="Stock"
                  value={variant.stock}
                  onChange={(e) => {
                    const updatedVariants = [...product.variants];
                    updatedVariants[index] = {
                      ...updatedVariants[index],
                      stock: Number(e.target.value),
                    };

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
          <button type="submit" className="btn-save">
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

export default EditProduct;
