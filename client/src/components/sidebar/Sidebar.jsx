import React, { useState } from 'react';
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

  const hideSidebar = () => {
    setModalOpen(false);
  };

  const handleAddPostClick = () => {
    setModalOpen(true);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to="/" onClick={hideSidebar}>
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed </span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/Chats">
              <Chat className="sidebarIcon" />
              <span className="sidebarListItemText">Chats</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/Following">
              <Group className="sidebarIcon" />
              <span className="sidebarListItemText">Following</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/Notifications">
              <VibrationIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Notifications</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <div onClick={handleAddPostClick} className="addPostButton">
              <AddCircleOutlineIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Upload</span>
            </div>
          </li>
          <li className="sidebarListItem">
            <Link to="/Profile">
              <AccountCircleIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Profile</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/Settings">
              <SettingsIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Settings</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link to="/Report">
              <FlagIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Report</span>
            </Link>
          </li>
        </ul>
      </div>
      {isModalOpen && <CreatePostModal closeModal={hideSidebar} />}
    </div>
  );
}

