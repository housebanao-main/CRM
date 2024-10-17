import React from 'react';
import { useNavigate } from 'react-router-dom';

const LeadHeader = ({ activeTab, lead }) => { // Accept lead as a prop
  const navigate = useNavigate();

  // Function to navigate based on the selected tab, passing the lead data
  const handleTabClick = (tab) => {
    switch (tab) {
      case 'details':
        navigate('/creation', { state: { lead } }); // Pass the lead data
        break;
      case 'boq':
        navigate('/boq', { state: { lead } }); // Pass the lead data
        break;
      case 'team':
        navigate('/team', { state: { lead } }); // Pass the lead data
        break;
      case 'siteInspection':
        navigate('/site-inspection', { state: { lead } }); // Pass the lead data
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <button className="back-button" onClick={() => navigate(-1)}>←</button>
          <h3>Lead / {lead?.leadId && <span>{lead.leadId}</span>} {/* Display Lead ID */}</h3>
          
        </div>
        <button className="edit-button">Edit</button>
      </header>

      {/* Tabs */}
      <nav className="tabs">
        <div 
          className={`tab ${activeTab === 'details' ? 'active' : ''}`} 
          onClick={() => handleTabClick('details')}
        >
          Details
        </div>
        <div 
          className={`tab ${activeTab === 'boq' ? 'active' : ''}`} 
          onClick={() => handleTabClick('boq')}
        >
          BOQ
        </div>
        <div 
          className={`tab ${activeTab === 'team' ? 'active' : ''}`} 
          onClick={() => handleTabClick('team')}
        >
          Team
        </div>
        <div 
          className={`tab ${activeTab === 'siteInspection' ? 'active' : ''}`} 
          onClick={() => handleTabClick('siteInspection')}
        >
          Site Inspection
        </div>
      </nav>
    </div>
  );
};

export default LeadHeader;
