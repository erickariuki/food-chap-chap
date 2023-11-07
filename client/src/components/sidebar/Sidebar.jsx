import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';
import {
  RssFeed,
  Chat,
  Group,
} from '@mui/icons-material';
import FlagIcon from '@mui/icons-material/Flag';
import VibrationIcon from '@mui/icons-material/Vibration';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Feed from '../feed/Feed'
import CreatePostModal from '../CreatePost/CreatePostModal';

export default function Sidebar() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleCollapseToggle = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const hideSidebar = () => {
    setModalOpen(false);
  };

  const handleAddPostClick = () => {
    setModalOpen(true);
    setSidebarOpen(false);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
      <div className="collapse-button" onClick={handleCollapseToggle}>
        ☰
      </div>
      {isSidebarOpen && (
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <div onClick={(e) => { e.stopPropagation(); handleAddPostClick(); }} className="addPostButton">
              <RssFeed className="sidebarIcon" />
              {!isSidebarOpen && <span className="sidebarListItemText">Feed</span>}
              </div>
            
          </li>
          <li className="sidebarListItem">
            <Link to="/Chats">
              <Chat className="sidebarIcon" />
              {!isSidebarOpen && <span className="sidebarListItemText">Chats</span>}
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/Following">
              <Group className="sidebarIcon" />
              {!isSidebarOpen && <span className="sidebarListItemText">Following</span>}
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/Notifications">
              <VibrationIcon className="sidebarIcon" />
              {!isSidebarOpen && <span className="sidebarListItemText">Notifications</span>}
            </Link>
          </li>
          <li className="sidebarListItem">
            <div onClick={handleAddPostClick} className="addPostButton">
              <AddCircleOutlineIcon className="sidebarIcon" />
              {!isSidebarOpen && <span className="sidebarListItemText">Upload</span>}
            </div>
          </li>
          <li className="sidebarListItem">
            <Link to="/Profile">
              <AccountCircleIcon className="sidebarIcon" />
              {!isSidebarOpen && <span className="sidebarListItemText">Profile</span>}
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/Settings">
              <SettingsIcon className="sidebarIcon" />
              {!isSidebarOpen && <span className="sidebarListItemText">Settings</span>}
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/Report">
              <FlagIcon className="sidebarIcon" />
              {!isSidebarOpen && <span className="sidebarListItemText">Report</span>}
            </Link>
          </li>
        </ul>
      
      </div>
      )}
      {isModalOpen && <CreatePostModal closeModal={hideSidebar} />}
      
    </div>
  );
}

