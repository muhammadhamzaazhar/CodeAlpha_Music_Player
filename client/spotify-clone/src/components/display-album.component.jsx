import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "./navbar.component";
import { assets } from "../assets/frontend-assets/assets";
import { PlayerContext } from "../context/player-context";

const DisplayAlbum = ({ album }) => {
  const { id } = useParams();
  const [albumData, setAlbumData] = useState("");
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    albumsData.map((item) => {
      if (item._id === id) {
        setAlbumData(item);
      }
    });
  }, []);

  return albumData ? (
    <>
      <Navbar />
      <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end p-6 bg-gradient-to-r from-gray-700 via-gray-800 to-black rounded-lg shadow-lg">
        <img
          className="w-48 h-48 rounded-lg shadow-md transform transition duration-500 hover:scale-105"
          src={albumData.image}
          alt="album-image"
        />
        <div className="flex flex-col mb-4 text-white">
          <p className="text-lg font-medium uppercase tracking-wide">
            Playlist
          </p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl leading-tight">
            {albumData.name}
          </h2>
          <h4 className="text-lg mb-2">{albumData.desc}</h4>
          <p className="mt-1 flex items-center space-x-2 text-sm md:text-base">
            <img
              className="inline-block w-5 h-5"
              src={assets.spotify_logo}
              alt="spotify-logo"
            />
            <b className="font-semibold">Spotify&nbsp;</b>
            <span className="font-light">
              • 1,234,456 likes &nbsp;• <b>50 songs,</b> about 2 hr 30 min
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-col-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="clock-icon" />
      </div>
      <hr />
      {songsData
        .filter((songItem) => songItem.album === album.name)
        .map((songItem, index) => (
          <div
            onClick={() => playWithId(songItem._id)}
            key={index}
            className="grid grid-col-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img
                className="inline w-10 mr-5"
                src={songItem.image}
                alt="song-image"
              />
              {songItem.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center">{songItem.duration}</p>
          </div>
        ))}
    </>
  ) : null;
};

export default DisplayAlbum;
