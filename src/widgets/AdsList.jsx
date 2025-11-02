import React, { useEffect, useState } from "react";
import API from "../services/api";

export default function AdsList() {
  const [ads, setAds] = useState([]);
  const [country, setCountry] = useState("IN");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAds();
  }, [country]);

  async function fetchAds() {
    setLoading(true);
    try {
      // Mock ads for demo since ads endpoint might not be implemented yet
      const mockAds = [
        {
          id: 1,
          title: "Premium VPN Service",
          link: "https://example.com/vpn",
          payoutRate: "$2.50 CPC",
          description: "Secure your internet connection"
        },
        {
          id: 2,
          title: "Cloud Storage Solution",
          link: "https://example.com/storage",
          payoutRate: "$1.80 CPC",
          description: "Store your files safely"
        },
        {
          id: 3,
          title: "Online Security Course",
          link: "https://example.com/course",
          payoutRate: "$3.20 CPC",
          description: "Learn cybersecurity basics"
        }
      ];
      
      // Try to fetch real ads, fall back to mock
      try {
        const res = await API.get(`/ads?country=${country}`);
        setAds(res.data.length > 0 ? res.data : mockAds);
      } catch (e) {
        console.log("Using mock ads, real endpoint not ready");
        setAds(mockAds);
      }
    } catch (e) {
      console.error("ads", e);
    } finally {
      setLoading(false);
    }
  }

  function onImpression(ad) {
    // call backend to log impression
    API.post("/ads/event", { 
      user_id: null, 
      event_type: "impression", 
      metadata: { ad_id: ad.id, country } 
    }).catch(()=>{});
  }

  function onAdClick(ad) {
    // Log click event
    API.post("/ads/event", { 
      user_id: null, 
      event_type: "click", 
      metadata: { ad_id: ad.id, country } 
    }).catch(()=>{});
    
    // Open link
    window.open(ad.link, '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="card">
      <h3>Sponsored Content</h3>
      <div className="ads-controls">
        <label>Target Country: </label>
        <select value={country} onChange={e=>setCountry(e.target.value)}>
          <option value="IN">India</option>
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="DE">Germany</option>
          <option value="JP">Japan</option>
        </select>
      </div>

      {loading && <p className="muted">Loading ads...</p>}
      
      {!loading && ads.length === 0 && <p className="muted">No ads available</p>}
      
      <div className="ads-grid">
        {ads.map(ad => (
          <div 
            key={ad.id} 
            className="ad-card" 
            onMouseEnter={()=>onImpression(ad)}
          >
            <h4>{ad.title}</h4>
            {ad.description && <p className="ad-description">{ad.description}</p>}
            <div className="ad-footer">
              <span className="payout">Pay: {ad.payoutRate || ad.payout || ad.payout_rate}</span>
              <button 
                className="ad-btn"
                onClick={() => onAdClick(ad)}
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}