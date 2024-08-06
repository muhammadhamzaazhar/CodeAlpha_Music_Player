import { useContext } from "react";

import Player from "./components/player.component";
import Sidebar from "./components/side-bar.component";
import Display from "./components/display.component";
import { PlayerContext } from "./context/player-context";
import "./App.css";

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      {songsData.length != 0 ? (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}
      <audio
        ref={audioRef}
        src={track ? track.file : ""}
        preload="auto"
      ></audio>
    </div>
  );
};

export default App;
