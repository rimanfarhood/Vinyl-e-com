import { useState } from "react";

export default function Login() {
  // Local state for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Temporary submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder logic (we will connect Firebase later)
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="page">
      <div className="auth-container">

        <h1>Login</h1>

        <form onSubmit={handleSubmit} className="auth-form">

          {/* Email field */}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password field */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit button */}
          <button type="submit">Login</button>

        </form>

        {/* Extra links */}
        <p className="auth-footer">
          Don't have an account? <a href="/register">Register</a>
        </p>

      </div>
    </div>
  );
}