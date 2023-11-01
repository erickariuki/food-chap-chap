import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [userProfile, setProfile] = useState(null);
  const { userid } = useParams();

  useEffect(() => {
    fetch(`/api/users/${userid}`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        setProfile(result);
      })
  }, []);

  return (
    <>
      {userProfile ?
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "18px 0px",
            borderBottom: "1px solid grey"
          }}>
            <div>
              <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                src={userProfile.profilePic}
              />
            </div>
            <div>
              <h4>{userProfile.name}</h4>
              <h5>{userProfile.email}</h5>
              <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                <h6>{userProfile.posts && userProfile.posts.length > 0 ? userProfile.posts.length : 0} posts</h6>
                <h6>{userProfile.followers && userProfile.followers.length > 0 ? userProfile.followers.length : 0} followers</h6>
                <h6>{userProfile.following && userProfile.following.length > 0 ? userProfile.following.length : 0} following</h6>
              </div>
            </div>
          </div>

          <div className="gallery">
            {
              userProfile.posts && userProfile.posts.map(item => {
                return (
                  <img key={item._id} className="item" src={item.pic} alt={item.title} />  
                )
              })
            }
          </div>
        </div>
        : <h2>loading...!</h2>}
    </>
  )
}

export default Profile;
