import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";

const UserPlaceholder = ({ setUserData, userData }) => {
  const { id } = useParams();
  const location = useLocation().pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/users/${id}`);
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id]);

  return <div>{userData?.username}</div>;
};

export default UserPlaceholder;
