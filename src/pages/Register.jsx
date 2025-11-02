import React, { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await API.post("/users/create", { email, password });
      setMsg("Registration successful! You can now login.");
      setTimeout(() => nav("/"), 2000);
    } catch (e) {
      setMsg(e?.response?.data?.detail || e?.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="card">
      <h2>Register for ModernVPN</h2>
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
        <button type="submit">Register</button>
      </form>
      <p className="muted">Already have an account? <Link to="/">Login</Link></p>
      {msg && <p className={msg.includes('successful') ? 'success' : 'err'}>{msg}</p>}
    </div>
  );
}