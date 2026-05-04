import { useState } from "react";
import { register } from "../auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState(""); // optional for later use
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await register(email, password);
      console.log("User created:", userCredential.user);

      // (optional) you can later store name in Firestore

      // Redirect to home
      navigate("/");

    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="page">
      <div className="auth-container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit} className="auth-form">

          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
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

          <button type="submit">Create account</button>

        </form>

        <p className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}