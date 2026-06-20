import "../css/header.css";

const AdminHeader = () => {
  return (
    <header>
      <div className="logo-container">
        <img className="home-logo" src="/images/logo.png" alt="Myntra Home" />
      </div>
      <div className="search-bar">
        <span className="material-symbols-outlined search-icon">search</span>
        <input
          className="search-input"
          placeholder="Search product by name or brand.."
        />
      </div>

      <h4 className="admin-dashboard">Admin Dashboard</h4>
    </header>
  );
};

export default AdminHeader;
