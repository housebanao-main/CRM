import React from 'react';
import './LeadDetails'; // Import the CSS specific to the ActivityTimeline

const ActivityTimeline = ({ activities, isTimelineOpen, toggleTimeline }) => {
  return (
    <div className="activity-timeline">
      <h2>Activity Timeline</h2>
      <ul className="timeline-list">
        {isTimelineOpen &&
          activities.map((activity, index) => (
            <li key={index} className="timeline-item">
              <div className="timeline-content">
                <span className="timeline-icon">➤</span>
                <p>{activity.task}</p>
                <img src={activity.avatar} alt="User" className="avatar" />
                <span className="timeline-user">{activity.user}</span>
                <span className="timeline-time">{activity.time}</span>
              </div>
            </li>
          ))}
        <button className="timeline-toggle" onClick={toggleTimeline}>
          {isTimelineOpen ? 'Show older' : 'Show newer'}
        </button>
      </ul>
    </div>
  );
};

export default ActivityTimeline;
