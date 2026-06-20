import QtyModal from "./QtyModal";
import { useDispatch } from "react-redux";
import { bagActions } from "../store/bagSlice";
import SizeModal from "./SizeModal";
import { useState } from "react";

const BagItem = ({ product }) => {
  const dispatch = useDispatch();

  const [showSizeModal, setShowSizeModal] = useState(false);
  const [showQtyModal, setShowQtyModal] = useState(false);

  const [selectedSize, setSelectedSize] = useState(product.size);
  const [selectedQty, setSelectedQty] = useState(product.qty);

  const variant = product.variants.find((v) => v.size === product.size);
  const maxQty = variant ? (variant.stock >= 5 ? 5 : variant.stock) : 0;

  return (
    <div className="bag-item-container">
      <img className="bag-item-img" src={product.imageUrl} alt={product.alt}/>

      <div className="bag-item-info">
        <div className="company-name">{product.company}</div>
        <div className="item-name">{product.name}</div>

        <div className="price">
          <span className="current-price">Rs {product.currentPrice}</span>
          <span className="original-price">Rs {product.originalPrice}</span>
          <span className="discount">({product.discount}% OFF)</span>
        </div>

        <div className="size-qty-bar">
          <button
            className="change-size-qty"
            onClick={() => setShowSizeModal(true)}
          >
            Size: {product.size}{" "}
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </button>

          {showSizeModal && (
            <SizeModal
              product={product}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              onClose={() => setShowSizeModal(false)}
              onDone={() => {
                dispatch(
                  bagActions.updateSize({ id: product.id, size: selectedSize }),
                );
                setShowSizeModal(false);
              }}
            />
          )}

          <button
            className="change-size-qty"
            onClick={() => setShowQtyModal(true)}
          >
            Qty: {product.qty}{" "}
            <span className="material-symbols-outlined">
              keyboard_arrow_down
            </span>
          </button>

          {showQtyModal && (
            <QtyModal
              maxQty={maxQty}
              selectedQty={selectedQty}
              setSelectedQty={setSelectedQty}
              onClose={() => setShowQtyModal(false)}
              onDone={() => {
                dispatch(
                  bagActions.updateQty({ id: product.id, qty: selectedQty }),
                );
                setShowQtyModal(false);
              }}
            />
          )}
        </div>
      </div>
      <button className="remove-item">✕</button>
    </div>
  );
};

export default BagItem;
