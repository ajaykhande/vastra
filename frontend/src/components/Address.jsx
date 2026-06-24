import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, getAddress, updateAddress } from "../api/addressApi";
import { authActions } from "../store/authSlice";
import "../css/address.css";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

const Address = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const [editAddress, setEditAddress] = useState(false);
  const address = useSelector((store) => store.auth.address);
  const [formAddress, setFormAddress] = useState({
    fullName: "",
    mobile: "",
    street: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    if (editAddress && address) {
      setFormAddress(address);
    }
  }, [editAddress, address]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (
      !formAddress.fullName ||
      !formAddress.mobile ||
      !formAddress.street ||
      !formAddress.city ||
      !formAddress.pincode
    ) {
      toast.error("All fields are required");
      return;
    }
    if (loading) return;
    try {
      setLoading(true);
      if (!address) {
        const addAddressRes = await addAddress(formAddress);
        const getAddressRes = await getAddress();
        dispatch(authActions.setAddress(getAddressRes));
        toast.success("address added successfuly");
      } else {
        const updateRes = await updateAddress(formAddress, address.id);
        const getAddressRes = await getAddress();
        dispatch(authActions.setAddress(getAddressRes));
        setEditAddress(false);
        toast.success("address updated successfuly");
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="address-container">
      {editAddress || !address ? (
        <div className="edit-address">
          <h5 className="address-title">
            {address ? "Edit Address" : "Add Address"}
          </h5>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formAddress.fullName || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formAddress.mobile || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formAddress.street || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formAddress.city || ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formAddress.pincode || ""}
            onChange={handleChange}
          />

          <div className="profile-btn-group">
            <button
              className="cancel-btn"
              onClick={() => {
                if (location.pathname === "/profile/address") {
                  navigate("/profile");
                  return;
                }
                setEditAddress(false);
                setFormAddress(
                  address || {
                    fullName: "",
                    mobile: "",
                    street: "",
                    city: "",
                    pincode: "",
                  },
                );
              }}
            >
              Cancel
            </button>
            <button
              className="save-btn"
              onClick={handleSave}
              disabled={loading}
              style={{ cursor: loading ? "not-allowed" : "" }}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="default-address">
          <button
            className="change-address"
            onClick={() => setEditAddress(true)}
          >
            Change
          </button>
          <h5>Delivery Address:</h5>
          <span>{address.fullName || ""}</span>
          <span>
            {address.street || ""}, {address.city || ""} {""}
            {address.pincode || ""}
          </span>
          <span>{address.mobile || ""}</span>
        </div>
      )}
    </div>
  );
};

export default Address;
