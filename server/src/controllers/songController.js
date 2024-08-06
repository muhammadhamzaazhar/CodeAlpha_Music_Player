import { v2 as cloudinary } from "cloudinary";

import SongModel from "../models/songModel.js";

const addSong = async (req, res) => {
  try {
    const { name, desc, album } = req.body;
    const audioFile = req.files.audio[0];
    const imageFile = req.files.image[0];

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "video",
    });
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    const songData = {
      name,
      desc,
      album,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    };
    const song = SongModel(songData);
    await song.save();

    res.status(200).json({ success: true, message: "Song added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const listSong = async (req, res) => {
  try {
    const allSongs = await SongModel.find({});

    res.status(200).json({ success: true, songs: allSongs });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const removeSong = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedSong = await SongModel.findByIdAndDelete(id);
    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Song removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addSong, listSong, removeSong };
