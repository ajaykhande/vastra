const Spinners = () => {
  return (
    <div className="d-flex justify-content-center spinner">
      <div
        className="spinner-border"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden spinner">Loading...</span>
      </div>
    </div>
  );
};

export default Spinners;
