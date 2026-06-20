import "../css/cancelConfirmModal.css";

const CancelConfirmModal = ({ productName, onConfirm, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Cancel Product</h3>

        <p>
          Are you sure you want to cancel
          <br />
          <strong> {productName} </strong> ?
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

export default CancelConfirmModal;
