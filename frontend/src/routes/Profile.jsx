import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/profile.css";
import { FaLeaf } from "react-icons/fa";
import { changePassword, getProfile, updateProfile } from "../api/authApi";
import { toast } from "react-toastify";
import { authActions } from "../store/authSlice";

const Profile = () => {
  const user = useSelector((store) => store.auth.user);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [editModePassword, setEditModePassword] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = async () => {
    const updateRes = await updateProfile(name, email);
    localStorage.setItem("token", updateRes.token);
    const profileRes = await getProfile();
    dispatch(authActions.loginSuccess(profileRes));
    setEditMode(false);
    toast.success(updateRes.message);
  };

  const handleChangePassword = async () => {
    const changePasswordRes = await changePassword(
      oldPassword,
      newPassword,
      confirmPassword,
    );
    setEditModePassword(false);
    toast.success(changePasswordRes.message);
  };

  return (
    <div className="profile-wrapper">
      <h3 className="profile-title">My Profile</h3>

      <div className="profile-card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProfile();
          }}
        >
          <div className="profile-row">
            <span className="profile-label">Name</span>
            {editMode ? (
              <input
                type="text"
                className="profile-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            ) : (
              <span className="profile-value">{user.name}</span>
            )}
          </div>
          <div className="profile-row">
            <span className="profile-label">Email</span>
            {editMode ? (
              <input
                type="text"
                className="profile-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            ) : (
              <span className="profile-value">{user.email}</span>
            )}
          </div>

          {!editMode ? (
            <button
              className="edit-profile-btn"
              onClick={() => setEditMode(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="profile-btn-group">
              <button className="cancel-btn" onClick={() => setEditMode(false)}>
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save
              </button>
            </div>
          )}
        </form>
      </div>

      {!editModePassword ? (
        <div className="security-card">
          <h4 className="security-title">Security</h4>
          <button
            className="change-password-btn"
            onClick={() => setEditModePassword(true)}
          >
            Change Password
          </button>
        </div>
      ) : (
        <div className="security-card">
          <h4>Change Password</h4>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleChangePassword();
            }}
          >
            <input
              type="password"
              placeholder="Old Password"
              className="profile-input"
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="New Password"
              className="profile-input"
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="profile-input"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div className="profile-btn-group">
              <button
                className="cancel-btn"
                onClick={() => setEditModePassword(false)}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
