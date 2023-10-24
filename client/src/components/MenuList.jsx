import { Menu } from 'antd';
import { HomeOutlined, SearchOutlined, NotificationOutlined, MessageOutlined, FireOutlined, PlusOutlined } from '@ant-design/icons';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import RssFeedOutlinedIcon from '@mui/icons-material/RssFeedOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const MenuList = () => {
    return (
        <>
            <Menu theme='dark' mode='inline' className='menu-bar'>
                <Menu.Item key="Home" icon={<HomeOutlined />}>
                    Home
                </Menu.Item>
                <Menu.Item key="Posts" icon={<RssFeedOutlinedIcon />}>
                    Following
                </Menu.Item>
                <Menu.Item key="search" icon={<SearchOutlined />}>
                    Search
                </Menu.Item>
                <Menu.Item key="Notifications" icon={<NotificationsNoneOutlinedIcon />}>
                    Notifications
                </Menu.Item>
                <Menu.Item key="Messages" icon={<MessageOutlined />}>
                    Messages
                </Menu.Item>
                <Menu.Item key="Messages" icon={<PlusOutlined />}>
                    Upload
                </Menu.Item>
                <Menu.Item key="Messages" icon={< AccountCircleOutlinedIcon/>}>
                    Profile
                </Menu.Item>
            </Menu>
        </>
    )

}

export default MenuList;