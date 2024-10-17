import React from 'react';
import './LeadDetails.css'; // Import the CSS specific to the MoreDetails

const MoreDetails = ({ activeTab, toggleTab, lead }) => {
  return (
    <div className="details-container">
      <div className="details-header">
        <div
          className={`details-tab ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => toggleTab('details')}
        >
          Details
        </div>
        <div
          className={`details-tab ${activeTab === 'more' ? 'active' : ''}`}
          onClick={() => toggleTab('more')}
        >
          More
        </div>
        <button className="edit-button-right">Edit</button>
      </div>

      <div className="details-content">
        {activeTab === 'details' && lead && (
          <div className="details-grid">
            <div>
              <p className="label">Poc details</p>
              <p>{lead.name}</p>
              <p>{lead.number}</p>
              <p>{lead.email}</p>
            </div>
            <div>
              <p className="label">Location</p>
              <p>{lead.city}</p>
            </div>
            <div>
              <p className="label">Plot size</p>
              <p>{lead.plotSize || 'N/A'}</p>
            </div>
            <div>
              <p className="label">Budget</p>
              <p>{lead.budget || 'N/A'}</p>
            </div>
            <div>
              <p className="label">Type</p>
              <p>{lead.type || 'N/A'}</p>
            </div>
            <div>
              <p className="label">Floor requirement</p>
              <p>{lead.floors || 'N/A'}</p>
            </div>
            <div>
              <p className="label">Room requirement</p>
              <p>{lead.rooms || 'N/A'}</p>
            </div>
            <div>
              <p className="label">Start date</p>
              <p>{lead.dayToStart || 'N/A'}</p>
            </div>
          </div>
        )}
        {activeTab === 'more' && lead && (
          <div className="details-grid">
            <div>
              <p className="label">Additional Information</p>
              <p>{lead.extraInfo || 'No additional details available.'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreDetails;
