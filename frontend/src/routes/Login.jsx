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

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginRes = await login(email, password);
    localStorage.setItem("token", loginRes.token);

    const profileRes = await getProfile(loginRes.token);
    dispatch(authActions.loginSuccess(profileRes));
    if (profileRes.role === "USER") {
      try {
        const addressRes = await getAddress(token);
        dispatch(authActions.setAddress(addressRes));
      } catch (err) {
        dispatch(authActions.setAddress(null));
      }
    }
    if (profileRes.role === "ADMIN") {
      toast.success("Wellcome To Admin Dashboard");
      navigate("/admin");
    } else {
      toast.success(loginRes.message);
      navigate("/profile");
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

        <button type="submit">Login</button>

        <p>
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
