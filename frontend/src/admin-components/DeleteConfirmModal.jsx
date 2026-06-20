const DeleteConfirmModal = ({ show, onClose, onConfirm, productName }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Delete Product</h3>

        <p>
          Are you sure you want to delete
          <strong> {productName}</strong> ?
        </p>

        <div className="modal-actions">
          <button className="btn-delete" onClick={onConfirm}>
            Yes
          </button>
          <button className="btn-cancel" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
