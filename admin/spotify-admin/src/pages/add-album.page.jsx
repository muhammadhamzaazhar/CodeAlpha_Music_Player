import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { assets } from "../assets/admin-assets/assets";

const AddAlbum = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("image", image);
      formData.append("bgColor", color);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/album/add`,
        formData
      );

      if (response.data.success) {
        toast.success("Album Added");
        setName("");
        setDesc("");
        setImage(null);
        setColor("#ffffff");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error Occurred!");
    }
    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      className="flex flex-col items-start gap-1 p-6 bg-white shadow-lg rounded-lg border border-gray-200"
      onSubmit={handelSubmit}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Album</h2>

      <div className="flex flex-col items-center gap-1 mb-2">
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
            alt="Upload"
          />
        </label>
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <label className="text-lg font-semibold text-gray-700" htmlFor="name">
          Album Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="Type Here"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="bg-transparent outline-none border-2 border-gray-400 p-1.5 w-[max(40vw,250px)]  rounded-md focus:border-green-500"
          required
        />
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <label className="text-lg font-semibold text-gray-700" htmlFor="desc">
          Album Description
        </label>
        <input
          type="text"
          id="desc"
          placeholder="Type Here"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className="bg-transparent outline-none border-2 border-gray-400 p-1.5 w-[max(40vw,250px)]  rounded-md focus:border-green-500"
          required
        />
      </div>

      <div className="flex flex-col gap-1 mb-2">
        <label className="text-lg font-semibold text-gray-700" htmlFor="color">
          Background Color
        </label>
        <input
          type="text"
          id="color"
          placeholder="Enter a valid hex code"
          onChange={(e) => setColor(e.target.value)}
          value={color}
          className="bg-transparent outline-none border-2 border-gray-400 p-1.5 w-[max(40vw,250px)]  rounded-md focus:border-green-500"
        />
      </div>

      <button
        type="submit"
        className="bg-green-500 mt-1 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors duration-300"
      >
        ADD ALBUM
      </button>
    </form>
  );
};

export default AddAlbum;
