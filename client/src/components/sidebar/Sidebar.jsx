import React, { useState } from 'react';
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
// import Feed from '../feed/Feed.jsx'
export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <button className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">
              Feed
              </span>
          </button>
          <button className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">
              Chats
              </span>
          </button>
          <button className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Following</span>
          </button>
          <button className="sidebarListItem">
            <VibrationIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Notifications</span>
          </button>
          <button className="sidebarListItem">
            <AddCircleOutlineIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Upload</span>
          </button>
          <button className="sidebarListItem">
            <AccountCircleIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Profile</span>
          </button>
          <button className="sidebarListItem">
            <SettingsIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Settings</span>
          </button>
          <button className="sidebarListItem">
            <FlagIcon className="sidebarIcon" />
            <span className="sidebarListItemText">Report</span>
          </button>
        </ul>
        <button className="sidebarToggleBtn" onClick={toggleSidebar}>
        {isCollapsed ? '☰' : '✖'}
      </button>
      </div>
    </div>
  );
}
