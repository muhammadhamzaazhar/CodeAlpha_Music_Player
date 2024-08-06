import { ToastContainer, toast } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import AddSong from "./pages/add-song.page";
import AddAlbum from "./pages/add-album.page";
import ListSong from "./pages/list-song.page";
import ListAlbum from "./pages/list-album.page";
import Sidebar from "./components/sidebar.component";
import Navbar from "./components/navbar.component";
import "./App.css";

const App = () => {
  return (
    <div className="flex items-start min-h-screen">
      <ToastContainer />
      <Sidebar />
      <div className="flex-1 bg-[#F3FFF7] overflow-y-scroll hide-scrollbar">
        <Navbar />
        <div className="pt-6 pl-5 sm:pt-9 sm:pl-12">
          <Routes>
            <Route path="/add-song" element={<AddSong />} />
            <Route path="/add-album" element={<AddAlbum />} />
            <Route path="/list-song" element={<ListSong />} />
            <Route path="/list-album" element={<ListAlbum />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
