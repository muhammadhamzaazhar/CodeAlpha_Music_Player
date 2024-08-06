import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { PlayerContext } from "../context/player-context";

const MediaItem = ({ image, name, desc, id, isAlbum = false }) => {
  const navigate = useNavigate();
  const { playWithId } = useContext(PlayerContext);

  return (
    <div
      onClick={() => {
        navigate(isAlbum ? `/album/${id}` : playWithId(id));
      }}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded" src={image} alt="media-image" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  );
};

export default MediaItem;
