import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Add this import statement
import ActivityTimeline from './ActivityTimeline'; 
import Tasks from './Tasks'; 
import MoreDetails from './MoreDetails'; 
import './LeadDetails.css'; 
import LeadHeader from './LeadHeader'; // Import the new component

const LeadDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lead = location.state?.lead;

  // Ensure lead data is available
  if (!lead) {
    console.error('No lead data passed to LeadDetails');
    navigate('/leads'); // Redirect if no lead data
    return null;
  }

  // Define state to manage input for each step
  const [stepDetails, setStepDetails] = useState({
    Creation: '',
    'Client Meeting': '',
    Quotation: '',
    'Test Fit Out': '',
    'Follow Up': '',
    Negotiation: '',
    Closure: ''
  });

  const [currentStep, setCurrentStep] = useState(3); 
  const [activeTab, setActiveTab] = useState('details'); 
  const [activeActivityTab, setActiveActivityTab] = useState('logCall'); 
  const [isTimelineOpen, setIsTimelineOpen] = useState(true); 
  const [selectedStep, setSelectedStep] = useState('Creation'); 
  const [completedSteps, setCompletedSteps] = useState([]); 

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch saved steps when the component mounts
  useEffect(() => {
    const fetchStepDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/lead-steps/${lead._id}`);
        const result = response.data; // No need to use .json()
    
        if (result.leadSteps) {
          const updatedSteps = { ...stepDetails };
          const completed = [];
    
          result.leadSteps.forEach((step) => {
            updatedSteps[step.stepName] = step.stepDetails;
            if (step.stepDetails.trim()) {
              completed.push(step.stepName);
            }
          });
    
          setStepDetails(updatedSteps);
          setCompletedSteps(completed);
        }
      } catch (error) {
        console.error('Error fetching step details:', error);
      }
    };
    
  
    fetchStepDetails();
  }, [lead._id]);

  // Debounce function to auto-save step details after user stops typing
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(...args), delay);
    };
  };

  // Function to mark the step as done or update
  const saveStepDetails = useCallback(async (stepName, stepDetailsValue) => {
    const payload = {
      leadId: lead._id,   // Ensure this value is correct and not undefined
      stepName: stepName, // Ensure this is a valid string like "Creation", "Quotation", etc.
      stepDetails: stepDetailsValue, // This can be empty
    };
  
    console.log('Sending payload:', payload);
  
    try {
      const response = await axios.post(`${API_BASE_URL}/lead-steps`, payload);
  
      const result = response.data;
      if (result.message === 'Step data saved successfully') {
        console.log('Step saved:', result);
  
        if (!completedSteps.includes(stepName)) {
          setCompletedSteps([...completedSteps, stepName]);
        }
      }
    } catch (error) {
      console.error('Error saving step data:', error);
    }
  }, [completedSteps, lead._id]);
  

  // Handle textarea input changes with auto-save
  const handleInputChange = (e) => {
    const { value } = e.target;
    setStepDetails({ ...stepDetails, [selectedStep]: value });

    // Auto-save step details when typing stops for 1 second
    debounce(saveStepDetails(selectedStep, value), 1000);
  };

  const steps = [
    'Creation',
    'Client Meeting',
    'Quotation',
    'Test Fit Out',
    'Follow Up',
    'Negotiation',
    'Closure',
  ];

  const toggleTab = (tab) => {
    setActiveTab(tab);
  };

  const toggleTimeline = () => {
    setIsTimelineOpen(!isTimelineOpen);
  };

  const handleStepClick = (step) => {
    setSelectedStep(step); 
  };

  const handleNavigateToQuotation = () => {
    navigate('/quotation', { state: { lead } });
  };

  // Function to mark the step as done, and mark all if "Closure" is selected
  const markStepAsDone = async () => {
    const stepDetailsValue = stepDetails[selectedStep];
    
    try {
      const response = await axios.post(`${API_BASE_URL}/lead-steps`, { 
        leadId: lead._id,         // Ensure this is valid
        stepName: selectedStep,   // Ensure this is valid
        stepDetails: stepDetailsValue, // Optional
      });
  
      const result = response.data;
      if (result.message === 'Step data saved successfully') {
        console.log('Step marked as done:', result);
  
        // Update completed steps
        if (!completedSteps.includes(selectedStep)) {
          setCompletedSteps([...completedSteps, selectedStep]);
        }
  
        // If the step is "Closure", mark all steps as done
        if (selectedStep === 'Closure') {
          setCompletedSteps([...steps]);  // Mark all steps as completed
        } else {
          // Move to the next step
          const currentStepIndex = steps.indexOf(selectedStep);
          if (currentStepIndex < steps.length - 1) {
            const nextStep = steps[currentStepIndex + 1];
            setSelectedStep(nextStep);  // Move to the next step
          }
        }
      }
    } catch (error) {
      console.error('Error saving step data:', error);
    }
  };
  

  const tasks = [
    {
      title: 'Send quotation',
      description: "Make changes in BOQ, as per customer's need",
      dueDate: 'June 21',
      overdue: true,
      daysOverdue: 1,
      assignedTo: 'https://i.pravatar.cc/150?img=9', 
    },
    {
      title: 'Meeting with the customer',
      description: 'Regarding budget and updated BOQ.',
      dueDate: 'June 25',
      overdue: false,
      daysLeft: 3,
      assignedTo: null,
    },
    {
      title: 'Send quotation',
      description: 'You have an upcoming work',
      dueDate: 'June 27',
      overdue: false,
      daysLeft: 5,
      assignedTo: null,
    },
  ];

  const timelineActivities = [
    {
      task: 'Updated new task',
      user: 'Nitin',
      time: '1 day ago',
      avatar: 'https://robohash.org/mail@ashallendesign.co.uk',
    },
    {
      task: 'Updated new task',
      user: 'Sanya',
      time: '1 day ago',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      task: 'Updated new task',
      user: 'Sachin',
      time: '1 day ago',
      avatar: 'https://i.pravatar.cc/150?img=67',
    },
    {
      task: 'Updated new task',
      user: 'Kunjan',
      time: '1 day ago',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
  ];

  return (
    <div className="details-page">
      
      <LeadHeader activeTab={activeTab} lead={lead} />

      {/* Arrow-shaped Progress Bar */}
      <div className="arrow-progress-bar">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`arrow-step 
              ${selectedStep === step ? 'filled' : 'empty'} 
              ${index === 0 ? 'first' : ''} 
              ${index === steps.length - 1 ? 'last' : ''} 
              ${completedSteps.includes(step) ? 'completed' : ''}`}
            onClick={() => handleStepClick(step)}
          >
            {step} {completedSteps.includes(step) && <span className="completed-badge">✓</span>}
          </div>
        ))}
      </div>

      {/* Mark as Done button */}
      <div className="mark-as-done-container">
        <button className="mark-as-done-button" onClick={markStepAsDone}>
          Mark "{selectedStep}" as Done
        </button>
      </div>

      {/* Content Section */}
      <div className="content">
        <div className="left-section">
          {/* Activity Section */}
          <div className="activity">
            <h2>Activity</h2>
            <div className="activity-container">
              <div className="activity-tabs">
                <button
                  className={`activity-tab ${activeActivityTab === 'logCall' ? 'active' : ''}`}
                  onClick={() => setActiveActivityTab('logCall')}
                >
                  Log a call
                </button>
                <button
                  className={`activity-tab ${activeActivityTab === 'email' ? 'active' : ''}`}
                  onClick={() => setActiveActivityTab('email')}
                >
                  Email
                </button>
                <button
                  className={`activity-tab ${activeActivityTab === 'newTask' ? 'active' : ''}`}
                  onClick={() => setActiveActivityTab('newTask')}
                >
                  New task
                </button>
              </div>

              {/* Conditional input forms based on the active tab */}
              <div className="activity-form">
                {activeActivityTab === 'logCall' && (
                  <div className="log-call">
                    <input type="text" placeholder="Recap your call..." className="log-input" />
                    <button className="add-button">Add</button>
                  </div>
                )}
                {activeActivityTab === 'email' && (
                  <div className="email-form">
                    <input type="email" placeholder="Enter email..." className="log-input" />
                    <button className="add-button">Add</button>
                  </div>
                )}
                {activeActivityTab === 'newTask' && (
                  <div className="new-task-form">
                    <input type="text" placeholder="Enter new task..." className="log-input" />
                    <button className="add-button">Add</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Details Section */}
          <div className="key-details-container">
            <h2>Key Details "{selectedStep}"</h2>

            {lead && selectedStep === 'Creation' ? (
              <ul className="key-details-list">
                <li>Email: <span>{lead.email}</span></li>
                <li>Phone Number: <span>{lead.number}</span></li>
                <li>Plot Size: <span>{lead.plotSize}</span></li>
                <li>Floor Requirement: <span>{lead.floors}</span></li>
                <li>Room Requirement: <span>{lead.rooms}</span></li>
                <li>Budget: <span>{lead.budget}</span></li>
                <li>Day to Start: <span>{lead.dayToStart}</span></li>
                <li>Location: <span>{lead.city}</span></li>
              </ul>
            ) : selectedStep === 'Test Fit Out' ? (
              <div className="test-fit-out-container">
                <div className="upload-section">
                  <div className="file-drop-area">
                    <div className="upload-icon">📁</div>
                    <p>Drop file here</p>
                    <span>OR</span>
                    <button className="upload-button">Upload file</button>
                    <input type="file" className="file-input" hidden />
                  </div>
                </div>

                <div className="basic-info">
                  <h3>Basic Info</h3>
                  <input type="text" placeholder="Floor plan name" className="input-field" />
                  <textarea placeholder="Description" rows="5" className="input-field"></textarea>
                  <button className="save-button">Save</button>
                </div>
              </div>
            ) : (
              <div className="step-details">
                <h3>{selectedStep} details</h3>
            <textarea
            rows="5"
            placeholder={`Enter details for ${selectedStep} here...`}
            className="meeting-textarea"
            value={stepDetails[selectedStep]} // Show saved value for current step
            onChange={handleInputChange} // Update state based on textarea input
          ></textarea>
              </div>
            )}
          </div>

          {/* Render Tasks Section */}
          <Tasks tasks={tasks} />
        </div>

        <div className="right-section">
          <h2>&nbsp;</h2>
          
          {/* Render MoreDetails Component */}
          <MoreDetails activeTab={activeTab} toggleTab={toggleTab} lead={lead} />

          {/* Activity Timeline Section */}
          <ActivityTimeline
            activities={timelineActivities}
            isTimelineOpen={isTimelineOpen}
            toggleTimeline={toggleTimeline}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;
