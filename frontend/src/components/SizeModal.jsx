import "../css/bag.css";

const SizeModal = ({
  product,
  selectedSize,
  setSelectedSize,
  onClose,
  onDone,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-card small">
        <span className="modal-close" onClick={onClose}>✕</span>
        <h4>Select Size</h4>

        <div className="modal-sizes">
          {product.variants.map((v) => (
            <button
              key={v.size}
              disabled={v.stock === 0}
              className={`size-circle ${selectedSize === v.size ? "active" : ""}
            ${v.stock === 0 ? "disabled" : ""}`}
              onClick={() => setSelectedSize(v.size)}
            >
              {v.size}
            </button>
          ))}
        </div>

        <button className="modal-done" onClick={onDone}>DONE</button>
      </div>
    </div>
  );
};

export default SizeModal;
