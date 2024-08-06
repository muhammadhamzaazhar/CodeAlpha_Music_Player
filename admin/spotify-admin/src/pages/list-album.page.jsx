import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/album/list`
      );
      if (response.data.success) {
        setData(response.data.albums);
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
        toast.error(`Error Occured!`);
      }
    }
  };

  const removeAlbum = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/album/remove`,
        { data: { id } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums();
      } else {
        toast.error(response.data.message || "Failed to remove album");
      }
    } catch (error) {
      console.error("Error removing Album:", error);
      toast.error("An error occurred while removing the album");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="p-5 bg-gray-50">
      <p className="text-xl font-semibold mb-4">All Albums List</p>
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-4 p-3 border border-gray-300 text-sm bg-gray-200 rounded-lg shadow">
          <b className="text-gray-700">Image</b>
          <b className="text-gray-700">Name</b>
          <b className="text-gray-700">Description</b>
          <b className="text-gray-700">Album Color</b>
          <b className="text-gray-700">Action</b>
        </div>
        {data.map((albumData, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-4 p-3 border border-gray-300 text-sm bg-white rounded-lg shadow my-2 hover:bg-gray-100 transition-colors duration-300"
            >
              <img
                className="w-12 h-12 rounded shadow-lg"
                src={albumData.image}
                alt="song-image"
              />
              <p className="font-medium text-gray-800">{albumData.name}</p>
              <p className="text-gray-600">{albumData.desc}</p>
              <p className="text-gray-600">{albumData.bgColor}</p>
              <div className="relative group">
                <p
                  className="cursor-pointer text-black hover:text-red-500 transition-colors duration-300"
                  onClick={() => removeAlbum(albumData._id)}
                >
                  x
                </p>
                <div className="absolute w-28 bottom-full left-1/2 transform -translate-x-1/2 hidden group-hover:block bg-black text-white text-xs rounded py-2 px-3">
                  <span className="ml-1">Remove Album</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAlbum;
