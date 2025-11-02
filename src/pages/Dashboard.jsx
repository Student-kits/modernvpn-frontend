import React, { useEffect, useState } from "react";
import API from "../services/api";
import AdsList from "../widgets/AdsList";

export default function Dashboard() {
  const [servers, setServers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("disconnected");
  const [usage, setUsage] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserInfo();
    fetchServers();
  }, []);

  async function fetchUserInfo() {
    try {
      const res = await API.get("/users/me");
      setUser(res.data);
    } catch (e) {
      console.error("fetch user", e);
      // If token is invalid, redirect to login
      if (e.response?.status === 401) {
        logout();
      }
    }
  }

  async function fetchServers() {
    try {
      // Mock servers for now since VPN route might not be fully implemented
      const mockServers = [
        { id: "us-east-1", region: "US East", ip: "1.2.3.4", status: "online" },
        { id: "eu-west-1", region: "EU West", ip: "5.6.7.8", status: "online" },
        { id: "asia-south-1", region: "Asia South", ip: "9.10.11.12", status: "online" }
      ];
      setServers(mockServers);
      
      // Try to fetch real servers
      try {
        const res = await API.get("/vpn/servers");
        if (res.data && res.data.length > 0) {
          setServers(res.data);
        }
      } catch (e) {
        console.log("Using mock servers, real endpoint not ready");
      }
    } catch (e) {
      console.error("fetch servers", e);
    }
  }

  async function connectToServer() {
    if (!selected) return alert("Pick a server");
    try {
      setStatus("connecting...");
      const res = await API.post("/vpn/assign", { serverId: selected.id });
      setStatus("connected ✓");
      console.log("VPN Config:", res.data);
    } catch (e) {
      setStatus("connection failed");
      console.error(e);
    }
  }

  async function sendUsage() {
    try {
      await API.patch("/usage", { dataUsed: usage });
      alert("Usage updated");
    } catch (e) {
      console.error(e);
      alert("Usage update failed");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div>
      <div className="card">
        <div className="dashboard-header">
          <div>
            <h2>Dashboard</h2>
            {user && <p className="muted">Welcome, {user.email}</p>}
          </div>
          <button onClick={logout} className="danger">Logout</button>
        </div>
        
        <div className="status-bar">
          <span>Status: <strong className={status.includes('connected') ? 'success' : ''}>{status}</strong></span>
        </div>

        <h3>Available Servers</h3>
        <div className="server-grid">
          {servers.map((server) => (
            <div 
              key={server.id} 
              className={`server-card ${selected?.id === server.id ? 'selected' : ''}`}
              onClick={() => setSelected(server)}
            >
              <h4>{server.region}</h4>
              <p>{server.ip}</p>
              <span className="server-status online">● Online</span>
            </div>
          ))}
        </div>
        
        <div className="connect-section">
          <button 
            onClick={connectToServer} 
            disabled={!selected}
            className="connect-btn"
          >
            {status === 'connecting...' ? 'Connecting...' : 'Connect to VPN'}
          </button>
        </div>

        <div className="usage-section">
          <h3>Report Usage</h3>
          <div className="usage-input">
            <input 
              type="number" 
              value={usage} 
              onChange={e=>setUsage(+e.target.value)} 
              placeholder="Data usage in MB"
            />
            <button onClick={sendUsage}>Update Usage</button>
          </div>
        </div>
      </div>

      <AdsList />
    </div>
  );
}