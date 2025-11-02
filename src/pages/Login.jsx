import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token || res.data.token);
      nav("/dashboard");
    } catch (e) {
      console.error(e);
      setErr(e?.response?.data?.detail || e?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="card">
      <h2>Login to ModernVPN</h2>
      <form onSubmit={submit}>
        <input 
          placeholder="Email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          type="email"
          required 
        />
        <input 
          placeholder="Password" 
          value={password} 
          onChange={e=>setPassword(e.target.value)} 
          type="password" 
          required 
        />
        <button type="submit">Login</button>
      </form>
      <p className="muted">New? <Link to="/register">Register</Link></p>
      {err && <p className="err">{err}</p>}
    </div>
  );
}