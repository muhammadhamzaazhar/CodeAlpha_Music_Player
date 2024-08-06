import React from "react";
import { useNavigate } from "react-router-dom";

import { assets } from "../assets/frontend-assets/assets";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 text-white hidden lg:flex">
      <div className="bg-[#121212] h-[15%] rounded flex flex-col justify-around shadow-lg">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-3 pl-8 cursor-pointer hover:bg-[#1e1e1e] py-2 rounded transition-all duration-300"
        >
          <img className="w-6" src={assets.home_icon} alt="home-icon" />
          <p className="font-bold">Home</p>
        </div>
        <div className="flex items-center gap-3 pl-8 cursor-pointer hover:bg-[#1e1e1e] py-2 rounded transition-all duration-300">
          <img className="w-6" src={assets.search_icon} alt="search-icon" />
          <p className="font-bold">Search</p>
        </div>
      </div>

      <div className="bg-[#121212] h-[85%] rounded shadow-lg mt-2">
        <div className="p-4 flex items-center justify-between border-b border-[#242424]">
          <div className="flex items-center gap-3">
            <img className="w-8" src={assets.stack_icon} alt="stack-icon" />
            <p className="font-semibold">Your Library</p>
          </div>
          <div className="flex items-center gap-3">
            <img className="w-5" src={assets.arrow_icon} alt="arrow-icon" />
            <img className="w-5" src={assets.plus_icon} alt="plus-icon" />
          </div>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 transition-all duration-300 hover:bg-[#343434]">
          <h1>Create your first playlist</h1>
          <p className="font-light">It's easy we will help you</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:bg-gray-300 transition-all duration-300">
            Create Playlist
          </button>
        </div>
        <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4 transition-all duration-300 hover:bg-[#343434]">
          <h1>Let's find some podcasts to follow</h1>
          <p className="font-light">We will keep you updated on new episodes</p>
          <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4 hover:bg-gray-300 transition-all duration-300">
            Browse Podcasts
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
