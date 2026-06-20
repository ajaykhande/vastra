const QtyModal = ({ maxQty, selectedQty, setSelectedQty, onClose, onDone }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-card small">
        <span className="modal-close" onClick={onClose}>
          ✕
        </span>

        <h3>Select Quantity</h3>

        <div className="qty-options">
          {Array.from({ length: maxQty }, (_, i) => {
            const q = i + 1;
            return (
              <button
                key={q}
                className={`qty-circle ${selectedQty === q ? "active" : ""}`}
                onClick={() => setSelectedQty(q)}
              >
                {q}
              </button>
            );
          })}
        </div>

        <button className="modal-done" onClick={onDone}>
          DONE
        </button>
      </div>
    </div>
  );
};

export default QtyModal;
