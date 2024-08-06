import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { assets } from "../assets/admin-assets/assets";

const AddSong = () => {
  const [image, setImage] = useState(false);
  const [song, setSong] = useState(false);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("none");
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("audio", song);
      formData.append("album", album);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/song/add`,
        formData
      );
      if (response.data.success) {
        toast.success("Song Added");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(false);
        setSong(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error Occurred");
    }
    setLoading(false);
  };

  const loadAlbumData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/album/list`
      );

      if (response.data.success) {
        setAlbumData(response.data.albums);
      } else {
        toast.error("Failed to fetch Albums.");
      }
    } catch (error) {
      console.error("Error fetching Albums:", error);
      if (error.response) {
        toast.error(
          `Error: ${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        toast.error("Network error: No response received.");
      } else {
        toast.error(`Error Occurred!`);
      }
    }
  };

  useEffect(() => {
    loadAlbumData();
  }, []);

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      className="flex flex-col items-start gap-1 text-gray-600 p-6 bg-white shadow-lg rounded-lg"
      onSubmit={handelSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Song</h2>
      <div className="flex gap-8">
        <div className="flex flex-col gap-1 items-center mb-1">
          <p className="text-lg font-semibold text-gray-700">Upload Song</p>
          <input
            type="file"
            id="song"
            onChange={(e) => setSong(e.target.files[0])}
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              className="w-20 h-20 cursor-pointer border-2 border-gray-300 rounded-md p-2 hover:border-green-500"
              src={song ? assets.upload_added : assets.upload_song}
              alt="song-icon"
            />
          </label>
        </div>

        <div className="flex flex-col gap-1 items-center mb-1">
          <p className="text-lg font-semibold text-gray-700">Upload Image</p>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            hidden
          />
          <label htmlFor="image">
            <img
              className="w-20 h-20 cursor-pointer border-2 border-gray-300 rounded-md p-2 hover:border-green-500"
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload-image"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <label className="text-lg font-semibold text-gray-700">Song Name</label>
        <input
          className="bg-transparent outline-none border-2 border-gray-400 p-1.5 w-[max(40vw,250px)]  rounded-md focus:border-green-500"
          type="text"
          placeholder="Type Here"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <label className="text-lg font-semibold text-gray-700">
          Song Description
        </label>
        <input
          className="bg-transparent outline-none border-2 border-gray-400 p-1.5 w-[max(40vw,250px)] rounded-md focus:border-green-500"
          type="text"
          placeholder="Type Here"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          required
        />
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <label className="text-lg font-semibold text-gray-700">Album</label>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          defaultValue={album}
          className="bg-transparent outline-none border-2 border-gray-400 p-1.5 w-40 rounded-md focus:border-green-500"
        >
          <option value="none">None</option>
          {albumData.map((item, index) => (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="bg-green-500 mt-1 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors duration-300"
      >
        ADD SONG
      </button>
    </form>
  );
};

export default AddSong;
