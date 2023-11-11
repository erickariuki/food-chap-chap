import { useState, useEffect } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";
import Feed from '../../components/feed/Feed';
import axios from 'axios';

import "./blog.css"

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      axios.get(`http://localhost:8080/api/user/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, []);

  return (
    <>
      <div className="homeContainer">
        
        <Sidebar user={user} />
        <Feed />
        <Rightbar user={user} />
      </div>
    </>
  );
}
