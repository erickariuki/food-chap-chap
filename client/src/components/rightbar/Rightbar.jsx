import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Rightbar() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div style={{ marginTop: "-10px" }}>
      {restaurants.map((restaurant) => (
        <div key={restaurant._id}>
          <h3>{restaurant.name}</h3>
          <p>{restaurant.description}</p>
          <img src={restaurant.image} alt="Restaurant" />
        </div>
      ))}
    </div>
  );
}
