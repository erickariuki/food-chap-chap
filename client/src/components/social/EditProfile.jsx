import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ setOpen }) => {
  const [img, setImg] = useState(null);
  const [imgUploadProgress, setImgUploadProgress] = useState(0);
  const navigate = useNavigate();

  const uploadImg = async (file) => {
    try {
      // Create a new FormData object
      const formData = new FormData();
      formData.append("file", file); // Append the file to the FormData object

      // Send a POST request to the server to handle the image upload
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          // Calculate and set the upload progress
          const progress = (progressEvent.loaded / progressEvent.total) * 100;
          setImgUploadProgress(Math.round(progress));
        },
      });

      // Handle the response from the server (e.g., update user's profile picture)
      console.log(response.data);

      // Handle local state or dispatch an action if necessary
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete the user's account in the database
      const response = await axios.delete(`/api/users/${currentUser._id}`);
      console.log(response);

      // Logout or handle the deletion response as needed

      // Navigate to the sign-in page
      navigate("/signin");
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  useEffect(() => {
    // Upload the image when img state is set
    img && uploadImg(img);
  }, [img]);

  return (
    <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
      <div className="w-[600px] h-[600px] bg-slate-200 rounded-lg p-8 flex flex-col gap-4 relative">
        <button onClick={() => setOpen(false)} className="absolute top-3 right-3 cursor-pointer">
          X
        </button>
        <h2 className="font-bold text-xl">Edit Profile</h2>
        <p>Choose a new profile picture</p>
        {imgUploadProgress > 0 ? (
          "Uploading " + imgUploadProgress + "%"
        ) : (
          <input
            type="file"
            className="bg-transparent border border-slate-500 rounded p-2"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}

        <p>Delete Account</p>
        <button className="bg-red-500 text-white py-2 rounded-full" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
