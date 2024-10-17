import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import styles from '../Tables.module.css';
import LeadHeader from '../LeadDetails/LeadHeader'; // Import LeadHeader component

function BoqTable() {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const leadData = location.state?.lead || {};
  
  const [expandedBoqId, setExpandedBoqId] = useState(null);
  const [boqs, setBoqs] = useState([]);
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [permissions, setPermissions] = useState({});
  const [role, setRole] = useState('user');

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const storedPermissions = localStorage.getItem('permissions');
    const storedRole = localStorage.getItem('role');
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    }
    if (storedRole) {
      setRole(storedRole);
    }
    fetchBoqs();
    fetchLeads();
  }, []);

  const fetchBoqs = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/boq`);
      setBoqs(response.data);
    } catch (error) {
      console.error('There was an error fetching the BOQs!', error);
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/leads`);
      setLeads(response.data);
    } catch (error) {
      console.error('There was an error fetching the leads!', error);
    }
  };

  const getCustomerNameById = (leadId) => {
    const lead = leads.find(ld => ld._id === leadId);
    return lead ? lead.name : '';
  };

  const toggleDetails = (boqId) => {
    if (expandedBoqId === boqId) {
      setExpandedBoqId(null); // Collapse if already expanded
    } else {
      setExpandedBoqId(boqId); // Expand if not expanded
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBoqs = boqs.filter(boq =>
    boq.boqName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lead = location.state?.lead; // Access the passed lead data

  useEffect(() => {
    if (lead) {
      console.log('Lead data:', lead);
      // You can now use the lead data in this component
    }
  }, [lead]);

  // Navigate to the Quotation page and pass lead data
  const handleCreateQuotation = () => {
    navigate('/quotation', { state: { lead } });
  };

  return (
    <div className={styles.tableContainer}>
      <LeadHeader activeTab="boq" lead={lead} />

      <div className={styles.layoutBar} style={{ width: '100%', position: 'relative' }}>
        <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search here"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="button" className={styles.searchButton}>Search</button>
        </div>
        {/* Create Quotation Button */}
        <button type="button" className={styles.createQuotationButton} onClick={handleCreateQuotation}>
          Create Quotation
        </button>
      </div>

      {/* Table displaying existing BOQs */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>BOQ ID</th>
            <th>Customer</th>
            <th>Created By</th>
            <th>Type</th>
            <th>BOQ Comments</th>
          </tr>
        </thead>
        <tbody>
          {filteredBoqs.map((boq, index) => (
            <React.Fragment key={index}>
              <tr onClick={() => toggleDetails(boq.boqId)} className={styles.boqRow}>
                <td>{boq.boqId}</td>
                <td>{boq.boqName}</td>
                <td>{boq.createdBy}</td>
                <td>{boq.type}</td>
                <td>{boq.boqComments}</td>
              </tr>
              {expandedBoqId === boq.boqId && (
                <tr className={styles.detailsRow}>
                  <td colSpan="5">
                    <div className={styles.boqDetails}>
                      <h3>BOQ Details</h3>
                      <p><strong>BOQ Name:</strong> {boq.boqName}</p>
                      <p><strong>Customer:</strong> {getCustomerNameById(boq.customer)}</p>
                      <p><strong>Type:</strong> {boq.type}</p>
                      <p><strong>Comments:</strong> {boq.boqComments}</p>
                      {/* Add more details as needed */}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        {/* Pagination controls can be added here */}
      </div>
    </div>
  );
}

export default BoqTable;
