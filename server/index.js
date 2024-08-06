import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";

import songRouter from "./src/routes/songRoute.js";
import albumRouter from "./src/routes/albumRoute.js";
import connectDB from "./src/config/mongodb.js";
import connectCloudinary from "./src/config/cloudinary.js";

configDotenv();
const app = express();
const port = process.env.PORT || 8000;
connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API Working"));
app.use("/api/song", songRouter);
app.use("/api/album", albumRouter);

import AlbumModel from "./src/models/albumModel.js";
import { v2 as cloudinary } from "cloudinary";
import SongModel from "./src/models/songModel.js";

const albumsData = [
  {
    id: 0,
    name: "Top 50 Global",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img8.jpg",
    desc: "Your weekly update of the most played tracks",
    bgColor: "#2a4365",
  },
  {
    id: 1,
    name: "Top 50 India",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img9.jpg",
    desc: "Your weekly update of the most played tracks",
    bgColor: "#22543d",
  },
  {
    id: 2,
    name: "Trending India",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img10.jpg",
    desc: "Your weekly update of the most played tracks",
    bgColor: "#742a2a",
  },
  {
    id: 3,
    name: "Trending Global",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img16.jpg",
    desc: "Your weekly update of the most played tracks",
    bgColor: "#44337a",
  },
  {
    id: 4,
    name: "Mega Hits",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img11.jpg",
    desc: "Your weekly update of the most played tracks",
    bgColor: "#234e52",
  },
  {
    id: 5,
    name: "Happy Favorites",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img15.jpg",
    desc: "Your weekly update of the most played tracks",
    bgColor: "#744210",
  },
];

const songsData = [
  {
    name: "Song One",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img1.jpg",
    file: "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/song1.mp3",
    desc: "Put a smile on your face with these happy tunes",
    album: "Top 50 Global",
    duration: "3:00",
  },
  {
    name: "Song Two",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img2.jpg",
    file: "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/song2.mp3",
    desc: "Put a smile on your face with these happy tunes",
    album: "Top 50 India",
    duration: "2:20",
  },
  {
    name: "Song Three",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img3.jpg",
    file: "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/song3.mp3",
    desc: "Put a smile on your face with these happy tunes",
    album: "Top 50 Global",
    duration: "2:32",
  },
  {
    name: "Song Four",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img4.jpg",
    file: "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/song1.mp3",
    desc: "Put a smile on your face with these happy tunes",
    album: "Top 50 Global",
    duration: "2:50",
  },
  {
    name: "Song Five",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img5.jpg",
    file: "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/song2.mp3",
    desc: "Put a smile on your face with these happy tunes",
    album: "Top 50 Global",
    duration: "3:10",
  },
  {
    name: "Song Six",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img6.jpg",
    file: "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/song3.mp3",
    desc: "Put a smile on your face with these happy tunes",
    album: "Top 50 India",
    duration: "2:45",
  },
  {
    id: 6,
    name: "Song Seven",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img7.jpg",
    file: "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/song1.mp3",
    desc: "Put a smile on your face with these happy tunes",
    album: "Trending India",
    duration: "2:18",
  },
  {
    id: 7,
    name: "Song Eight",
    image:
      "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/img12.jpg",
    file: "E:/CodeAlpha_Music_Player/client/spotify-clone/src/assets/frontend-assets/song2.mp3",
    desc: "Put a smile on your face with these happy tunes",
    album: "Trending Global",
    duration: "2:35",
  },
];

const saveSongsToDB = async () => {
  try {
    // Optionally, you can clear the existing albums first
    await SongModel.deleteMany({});

    for (const songData of songsData) {
      const result = await cloudinary.uploader.upload(songData.image, {
        resource_type: "image",
      });
      const result1 = await cloudinary.uploader.upload(songData.file, {
        resource_type: "video",
      });

      // Create album object with secure URL
      const song = new SongModel({
        name: songData.name,
        image: result.secure_url,
        album: songData.album,
        file: result1.secure_url,
        desc: songData.desc,
        duration: songData.duration,
      });

      // Save album to database
      await song.save();
      console.log(`Saved album: ${song.name}`);
    }

    console.log("All songs have been saved to the database");
  } catch (error) {
    console.error("Error saving songs to the database:", error);
  }
};

// saveSongsToDB();
app.listen(port, () => console.log(`Server Port: ${port}`));
