import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/authApi";
import { toast } from "react-toastify";

const Register = () => {
  const naviagate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoding] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoding(true);
      const regiterRes = await register(name, email, password);
      toast.success("Register Successfully");
      naviagate("/login");
    } catch (err) {
    } finally {
      setLoding(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleRegister}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
          type="sumit"
          disabled={loading}
          style={{ cursor: loading ? "not-allowed" : "" }}
        >
          Register
        </button>

        <p>
          Already have an account? <Link to="/login"> Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
