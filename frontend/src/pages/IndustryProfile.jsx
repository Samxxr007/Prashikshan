import { useState } from "react";
import axios from "axios";

export default function IndustryProfile() {
  const [companyName, setCompanyName] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  const handleSave = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:5000/api/industry/profile",
      { companyName, domain, description },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    alert("Industry Profile Saved!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Industry Profile</h2>
      <form onSubmit={handleSave}>
        <input placeholder="Company Name" onChange={(e) => setCompanyName(e.target.value)} /><br />
        <input placeholder="Domain" onChange={(e) => setDomain(e.target.value)} /><br />
        <input placeholder="Description" onChange={(e) => setDescription(e.target.value)} /><br />

        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
}
