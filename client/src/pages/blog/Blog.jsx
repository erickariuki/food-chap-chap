
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
// import { BrowserRouter, Route } from 'react'
// import Profile from '../../components/profile/Profile'
// import Post from '../../components/post/Post'
// import CreatePost from '../../components/CreatePost/CreatePost'
import Feed from '../../components/feed/Feed';
// import Following from '../../components/following/Following';
// import CreatePost from '../../components/CreatePost/CreatePost';
// import UserProfile from "../../components/UserProfile";
import "./blog.css"

export default function Home() {
  return (
    <>
      <div className="homeContainer">
        {/* <BrowserRouter>
        <Sidebar />
        <Route exact path ="/Feed">
          <Feed />
        </Route>
        <Route exact path ="/following">
          <Following />
        </Route>
        <Route exact path ="/Upload">
          <CreatePost />
        </Route>
        <Route exact path ="/Profile">
          <UserProfile />
        </Route>
        </BrowserRouter> */}
        <Sidebar />
        <Feed />
        <Rightbar/>
      </div>
    </>
  );
}