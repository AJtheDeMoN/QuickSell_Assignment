import React, { useEffect, useState } from 'react';
import './App.css';
import TicketCard from './components/TicketCard';
import { fetchData } from './api/Api';
import Navbar from './components/Navbar';

// Import SVG icons
import urgentIcon from './assets/SVG - Urgent Priority colour.svg';
import highIcon from './assets/Img - High Priority.svg';
import mediumIcon from './assets/Img - Medium Priority.svg';
import lowIcon from './assets/Img - Low Priority.svg';
import noPriorityIcon from './assets/No-priority.svg';
import doneIcon from './assets/Done.svg';
import inProgressIcon from './assets/in-progress.svg';
import toDoIcon from './assets/To-do.svg';
import AddIcon from './assets/add.svg';
import MenuIcon from './assets/3 dot menu.svg';
import backlogIcon from './assets/Backlog.svg';
import cancelledIcon from './assets/Cancelled.svg';

const priorityIcons = {
  4: urgentIcon,
  3: highIcon,
  2: mediumIcon,
  1: lowIcon,
  0: noPriorityIcon,
};

const priorityLabels = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};

const statusIcons = {
  Done: doneIcon,
  'In progress': inProgressIcon,
  Todo: toDoIcon,
  Backlog: backlogIcon,
  Canceled: cancelledIcon,
};

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  // Retrieve sort and group options from localStorage, or use defaults
  const [sortOption, setSortOption] = useState(() => {
    return localStorage.getItem('sortOption') || 'Priority';
  });

  const [groupOption, setGroupOption] = useState(() => {
    return localStorage.getItem('groupOption') || 'Priority';
  });

  useEffect(() => {
    // Fetch tickets and users when the component mounts
    const loadData = async () => {
      try {
        const { tickets, users } = await fetchData();
        setTickets(tickets);
        setUsers(users);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  // Update localStorage when sortOption or groupOption changes
  useEffect(() => {
    localStorage.setItem('sortOption', sortOption);
  }, [sortOption]);

  useEffect(() => {
    localStorage.setItem('groupOption', groupOption);
  }, [groupOption]);

  // Grouping tickets based on selected groupOption
  const groupTickets = (tickets, groupOption) => {
    const grouped = tickets.reduce((acc, ticket) => {
      let groupKey;
      if (groupOption === 'User') {
        groupKey = ticket.userId; // Group by user
      } else if (groupOption === 'Status') {
        groupKey = ticket.status; // Group by status
      } else if (groupOption === 'Priority') {
        groupKey = ticket.priority; // Group by priority
      }

      // Initialize array for the group if it doesn't exist
      if (!acc[groupKey]) {
        acc[groupKey] = {
          tickets: [],
          count: 0,
        };
      }
      acc[groupKey].tickets.push(ticket); // Add ticket to the group
      acc[groupKey].count += 1; // Increment count
      return acc;
    }, {});

    return grouped;
  };

  // Ensure all groups are included with 0 count
  const ensureAllGroups = (groupedTickets) => {
    let allGroups = {};

    if (groupOption === 'Priority') {
      Object.keys(priorityLabels).forEach((key) => {
        allGroups[key] = {
          tickets: [],
          count: 0,
        };
      });
    } else if (groupOption === 'Status') {
      Object.keys(statusIcons).forEach((key) => {
        allGroups[key] = {
          tickets: [],
          count: 0,
        };
      });
    } else if (groupOption === 'User') {
      users.forEach((user) => {
        allGroups[user.id] = {
          tickets: [],
          count: 0,
        };
      });
    }

    // Merge the existing groupedTickets with the allGroups
    Object.keys(groupedTickets).forEach((key) => {
      allGroups[key] = groupedTickets[key];
    });

    return allGroups;
  };

  // Sorting tickets within each group
  const sortTickets = (tickets, sortOption) => {
    return tickets.sort((a, b) => {
      if (sortOption === 'Priority') {
        return b.priority - a.priority; // Descending by priority
      } else if (sortOption === 'Title') {
        return a.title.localeCompare(b.title); // Ascending by title
      }
      return 0;
    });
  };

  // First group the tickets, then sort each group
  const groupedTickets = groupTickets(tickets, groupOption);
  const allGroupedTickets = ensureAllGroups(groupedTickets);

  // Sort the tickets within each group after grouping
  Object.keys(allGroupedTickets).forEach((groupKey) => {
    allGroupedTickets[groupKey].tickets = sortTickets(allGroupedTickets[groupKey].tickets, sortOption);
  });

  return (
    <div className="mainclass unclickable">
      <Navbar onSortChange={setSortOption} onGroupChange={setGroupOption} />
      <div style={{ background: '#f5f6fa', display: 'flex', flexDirection: 'row', gap: '20px' }}>
        {/* Render tickets grouped by the selected option */}
        {Object.keys(allGroupedTickets).map((groupKey) => (
          <div key={groupKey} className="ticket-group" style={{ flex: 1 }}>
            <div className="group-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              
              {/* Left side with avatar, priority, or status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginLeft: '5px' }}>
                {groupOption === 'User' && (
                  <>
                    {users.find(u => u.id === groupKey) && (
                      <div style={{ display: 'flex', alignItems: 'center' }} className="user-avatar">
                        <img
                          src={`https://ui-avatars.com/api/?name=${users.find(u => u.id === groupKey).name}`}
                          alt={users.find(u => u.id === groupKey).name}
                          style={{ borderRadius: '50%', width: '24px', height: '24px', marginRight: '5px' }} // Adjusted size
                        />
                        <span
                          className={`availability-indicator ${
                            users.find(u => u.id === groupKey).available ? "available" : "unavailable"
                          }`}
                        ></span>
                      </div>
                    )}
                    <h5 style={{ marginLeft: '10px' }}>{users.find(u => u.id === groupKey)?.name || 'Unknown User'} 
                    <span style={{color:'#929397',marginLeft:'10px' }}>{allGroupedTickets[groupKey].count}</span></h5>
                  </>
                )}
                {groupOption === 'Priority' && (
                  <>
                    <img src={priorityIcons[groupKey]} alt={`Priority ${priorityLabels[groupKey]}`} style={{ width: '24px', height: '24px' }} />
                    <h5 style={{ marginLeft: '10px' }}>{priorityLabels[groupKey]} <span style={{color:'#929397',marginLeft:'10px' }}>{allGroupedTickets[groupKey].count}</span></h5>
                  </>
                )}
                {groupOption === 'Status' && (
                  <>
                    <img src={statusIcons[groupKey]} alt={`Status: ${groupKey}`} style={{ width: '24px', height: '24px' }} />
                    <h5 style={{ marginLeft: '10px' }}>{groupKey} {allGroupedTickets[groupKey].count}
                    <span style={{color:'#929397',marginLeft:'10px' }}>{allGroupedTickets[groupKey].count}</span>
                    </h5>
                  </>
                )}
              </div>
              
              {/* Right side with plus sign and 3-dot menu */}
              <div className="icon-container">
                <div className="icon-container1">
                  <img src={AddIcon} alt="Add" style={{ width: '15px', height: '15px' }} />
                </div>
                <div className="icon-container1">
                  <img src={MenuIcon} alt="Menu" style={{ width: '15px', height: '15px' }} />
                </div>
              </div>

              
            </div>
            
            <div className="ticket-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {allGroupedTickets[groupKey].tickets.map((ticket) => {
                const user = users.find(u => u.id === ticket.userId);
                return (
                  <TicketCard key={ticket.id} ticket={ticket} user={user} groupOption={groupOption} />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
