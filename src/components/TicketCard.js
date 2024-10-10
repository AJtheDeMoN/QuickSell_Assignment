import React from "react";
import "../styles/TicketCard.css"; // You can style the card using CSS

// Import the SVG icons
import HighPriority from "../assets/Img - High Priority.svg";
import MediumPriority from "../assets/Img - Medium Priority.svg";
import LowPriority from "../assets/Img - Low Priority.svg";
import NoPriority from "../assets/No-priority.svg";
import UrgentPriority from "../assets/SVG - Urgent Priority colour.svg";
import Backlog from "../assets/Backlog.svg";
import Todo from "../assets/To-do.svg";
import InProgress from "../assets/in-progress.svg";
import Done from "../assets/Done.svg";

const TicketCard = ({ ticket, user, groupOption }) => {
  // Function to get the correct priority SVG
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 0:
        return NoPriority;
      case 1:
        return LowPriority;
      case 2:
        return MediumPriority;
      case 3:
        return HighPriority;
      case 4:
        return UrgentPriority;
      default:
        return NoPriority;
    }
  };

  // Function to get the correct status SVG
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "backlog":
        return Backlog;
      case "todo":
        return Todo;
      case "in progress":
        return InProgress;
      case "done":
        return Done;
      default:
        return Backlog;
    }
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        
        {/* Render user avatar and availability only if groupOption is not "User" */}
        {groupOption !== 'User' && (
          <div className="user-avatar">
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}`}
              alt={user.name}
            />
            <span
              className={`availability-indicator ${
                user.available ? "available" : "unavailable"
              }`}
            ></span>
          </div>
        )}
      </div>

      <h3 className="ticket-title">
        {/* Render status icon only if groupOption is not "Status" */}
        {groupOption !== 'Status' && (
          <img
            src={getStatusIcon(ticket.status)}
            alt={ticket.status}
            className="status-icon"
          />
        )}
        {ticket.title}
      </h3>
      <div className="ticket-footer">
        <div className="ticket-content-wrapper">
          {/* Render priority icon only if groupOption is not "Priority" */}
          {groupOption !== 'Priority' && (
            <div className="ticket-priority">
              <img
                src={getPriorityIcon(ticket.priority)}
                alt="priority"
                className="priority-icon"
              />
            </div>
          )}
          <div className="ticket-tag">
            {ticket.tag.map((t, index) => (
              <span className="tag-item" key={index}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketCard;