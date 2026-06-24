import { Link, useNavigate } from "react-router-dom";
import "../css/auth.css";
import { useState } from "react";
import { getProfile, login } from "../api/authApi";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";
import { toast } from "react-toastify";
import { getAddress } from "../api/addressApi";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoding] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoding(true);
      const loginRes = await login(email, password);
      localStorage.setItem("token", loginRes.token);

      const profileRes = await getProfile();
      dispatch(authActions.loginSuccess(profileRes));
      if (profileRes.role === "USER") {
        try {
          const addressRes = await getAddress();
          dispatch(authActions.setAddress(addressRes));
        } catch (err) {}
        try {
          const wishlistRes = await getWishlist();
          dispatch(wishlistActions.setWishlist(wishlistRes));
        } catch (err) {}
      }
      if (profileRes.role === "ADMIN") {
        toast.success("Wellcome To Admin Dashboard");
        navigate("/admin");
      } else {
        toast.success(loginRes.message);
        navigate("/profile");
      }
    } catch (err) {
    } finally {
      setLoding(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          style={{ cursor: loading ? "not-allowed" : "" }}
        >
          Login
        </button>

        <p>
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
