// import { Menu } from 'antd';
import { HomeOutlined, SearchOutlined, NotificationOutlined, MessageOutlined, FireOutlined, PlusOutlined } from '@ant-design/icons';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import RssFeedOutlinedIcon from '@mui/icons-material/RssFeedOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import Home from '../components/Home.jsx'

const MenuList = () => {
  const history = useHistory();

  const navigateTo = (path) => {
    history.push(path);
  };

  return (
    <div className='menu-bar'>
      <Button type='link' icon={<HomeOutlined />} onClick={() => navigateTo('/home')}>
        <Home/>
      </Button>
      <Button type='link' icon={<RssFeedOutlinedIcon />} onClick={() => navigateTo('/following')}>
        Following
      </Button>
      <Button type='link' icon={<SearchOutlined />} onClick={() => navigateTo('/search')}>
        Search
      </Button>
      <Button type='link' icon={<NotificationsNoneOutlinedIcon />} onClick={() => navigateTo('/notifications')}>
        Notifications
      </Button>
      <Button type='link' icon={<MessageOutlined />} onClick={() => navigateTo('/messages')}>
        Messages
      </Button>
      <Button type='link' icon={<PlusOutlined />} onClick={() => navigateTo('/upload')}>
        Upload
      </Button>
      <Button type='link' icon={<AccountCircleOutlinedIcon />} onClick={() => navigateTo('/profile')}>
        Profile
      </Button>
    </div>
  );
};

export default MenuList;