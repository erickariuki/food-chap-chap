
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
// import Profile from '../../components/profile/Profile'
// import Post from '../../components/post/Post'
// import CreatePost from '../../components/CreatePost/CreatePost'
import "./blog.css"

export default function Home() {
  return (
    <>
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar/>
      </div>
    </>
  );
}