import { useState } from "react";
import API from "../api";

export default function IndustryProfile() {
  const [companyName, setCompanyName] = useState("");
  const [domain, setDomain] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");

  const handleSave = async (e) => {
    e.preventDefault();
    await API.post(
      "/industry/profile",
      { companyName, domain, description }
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
