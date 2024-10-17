import React from 'react';
import './LeadDetails'; // Import the CSS specific to the ActivityTimeline

const Tasks = ({ tasks }) => {
  return (
    <div className="tasks-container">
      <h2>Tasks</h2>
      <div className="tasks-header">
        <span>Next steps</span>
        <span className="mark-as-done">Mark as done</span>
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <div className="task-details">
              <p className="task-title">{task.title}</p>
              <p className="task-desc">{task.description}</p>
              <p className={`task-timestamp ${task.overdue ? 'overdue' : 'upcoming'}`}>
                {task.overdue ? `${task.daysOverdue} day overdue` : `${task.daysLeft} days to go`}
              </p>
            </div>
            <div className="task-meta">
              <p className="task-date">{task.dueDate}</p>
              {task.assignedTo && (
                <img src={task.assignedTo} alt="Assigned" className="assigned-image" />
              )}
              <input type="checkbox" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
