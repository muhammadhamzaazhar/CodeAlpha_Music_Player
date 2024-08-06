// import React from "react";

// import Navbar from "./navbar";
// import AlbumItem from "./album-item";
// import SongItem from "./song-item";
// import { albumsData } from "../assets/frontend-assets/assets";
// import { songsData } from "../assets/frontend-assets/assets";

// const DisplayHome = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="mb-4">
//         <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
//         <div className="flex overflow-auto hide-scrollbar">
//           {albumsData.map((albumItem, index) => (
//             <AlbumItem
//               key={index}
//               image={albumItem.image}
//               name={albumItem.name}
//               desc={albumItem.desc}
//               id={albumItem.id}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="mb-4">
//         <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
//         <div className="flex overflow-auto hide-scrollbar">
//           {songsData.map((songItem, index) => (
//             <SongItem
//               key={index}
//               image={songItem.image}
//               name={songItem.name}
//               desc={songItem.desc}
//               id={songItem.id}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default DisplayHome;

import React, { useContext } from "react";
import Navbar from "./navbar.component";
import MediaItem from "./media-item.component";

import { PlayerContext } from "../context/player-context";

const DisplayHome = () => {
  const { songsData, albumsData } = useContext(PlayerContext);
  return (
    <>
      <Navbar />

      <div className="mb-8">
        <h1 className="my-5 font-bold text-2xl text-white">Featured Charts</h1>
        <div className="flex overflow-x-auto space-x-4 py-2 hide-scrollbar">
          {albumsData.map((albumItem, index) => (
            <MediaItem
              key={index}
              image={albumItem.image}
              name={albumItem.name}
              desc={albumItem.desc}
              id={albumItem._id}
              isAlbum={true}
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h1 className="my-5 font-bold text-2xl text-white">
          Today's Biggest Hits
        </h1>
        <div className="flex overflow-x-auto space-x-4 py-2 hide-scrollbar">
          {songsData.map((songItem, index) => (
            <MediaItem
              key={index}
              image={songItem.image}
              name={songItem.name}
              desc={songItem.desc}
              id={songItem._id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisplayHome;
