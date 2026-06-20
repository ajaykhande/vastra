import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { deleteProduct, getProducts } from "../api/productApi";
import { productActions } from "../store/productSlice";
import DeleteConfirmModal from "./DeleteConfirmModal";

const ProductItem = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeButtons, setActiveButtons] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    navigate(`/admin/edit-product/${item.id}`);
  };

  const handleDeleteConfirm = async () => {
    await deleteProduct(item.id);
    const products = await getProducts();

    dispatch(productActions.fetchProductsSuccess(products));
    toast.success("Product deleted successfully");
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        className={`all-item-container ${activeButtons ? "show-buttons" : ""}`}
        onClick={() => setActiveButtons(true)}
      >
        <div className="all-product-container">
          <div className="item-left-part">
            <img className="bag-item-img" src={item.imageUrl} />
          </div>
          <div className="item-right-part products-right-part">
            <div className="company-name">{item.company}</div>
            <div className="item-name">{item.name}</div>
            <div className="price">
              <span className="current-price">₹ {item.currentPrice}</span>
              <span className="original-price">Rs {item.originalPrice}</span>
              <span className="discount">({item.discount}% OFF)</span>
            </div>
            <div className="return-period">
              <span className="return-period-days">
                {" "}
                {item.returnPeriod} Days
              </span>
              Return available
            </div>
          </div>
        </div>
        <div className="all-cancel-wrapper">
          <button className="cancel-btn edit-button" onClick={handleEdit}>
            Edit
          </button>
          <button
            className="cancel-btn delete-button"
            onClick={() => setShowDeleteModal(true)}
          >
            Delete
          </button>
        </div>
      </div>
      <DeleteConfirmModal
        show={showDeleteModal}
        productName={item.name}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default ProductItem;
