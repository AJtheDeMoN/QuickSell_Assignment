import React, { useState } from 'react';
import '../styles/Navbar.css';

// Import the SVG icons
import DisplayIcon from "../assets/Display.svg";
import Down from "../assets/down.svg";

const Navbar = ({ onSortChange, onGroupChange }) => {
  const [isMainDropdownOpen, setMainDropdownOpen] = useState(false);
  const [isSortingDropdownOpen, setSortingDropdownOpen] = useState(false);
  const [isGroupingDropdownOpen, setGroupingDropdownOpen] = useState(false);

  const [currentSort, setCurrentSort] = useState('Priority'); // Default sorting
  const [currentGroup, setCurrentGroup] = useState('User'); // Default grouping

  const handleSortChange = (sortOption) => {
    setCurrentSort(sortOption); // Update current sort state
    onSortChange(sortOption);
    setSortingDropdownOpen(false);
  };

  const handleGroupChange = (groupOption) => {
    setCurrentGroup(groupOption); // Update current group state
    onGroupChange(groupOption);
    setGroupingDropdownOpen(false);
  };

  const toggleSortingDropdown = () => {
    // Close grouping dropdown if sorting is opened
    setSortingDropdownOpen(!isSortingDropdownOpen);
    if (isGroupingDropdownOpen) {
      setGroupingDropdownOpen(false);
    }
  };

  const toggleGroupingDropdown = () => {
    // Close sorting dropdown if grouping is opened
    setGroupingDropdownOpen(!isGroupingDropdownOpen);
    if (isSortingDropdownOpen) {
      setSortingDropdownOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="dropdown">
        <button onClick={() => setMainDropdownOpen(!isMainDropdownOpen)} className="dropdown-button">
          <span className="dropdownimg">
            <img src={DisplayIcon} alt="Display" />
          </span>
          <span>Display</span>
          <span className="dropdownimg">
            <img src={Down} alt="Toggle" />
          </span>
        </button>
        {isMainDropdownOpen && (
          <div className="dropdown-content">
            <div className="dropdown-row">
              <span>Grouping</span>
              <button onClick={toggleGroupingDropdown} className="sub-dropdown-button dropdown-button">
                {currentGroup}<span><img src={Down} alt="Toggle" /></span>
              </button>
            </div>
            {isGroupingDropdownOpen && (
              <div className="dropdown-options">
                <div onClick={() => handleGroupChange('User')}>User</div>
                <div onClick={() => handleGroupChange('Status')}>Status</div>
                <div onClick={() => handleGroupChange('Priority')}>Priority</div> {/* Added grouping by priority */}
              </div>
            )}
            <div className="dropdown-row">
              <span>Ordering</span>
              <button onClick={toggleSortingDropdown} className="sub-dropdown-button dropdown-button">
                {currentSort}<span><img src={Down} alt="Toggle" /></span>
              </button>
            </div>
            {isSortingDropdownOpen && (
              <div className="dropdown-options">
                <div onClick={() => handleSortChange('Priority')}>Priority</div>
                <div onClick={() => handleSortChange('Title')}>Title</div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
