import { v2 as cloudinary } from "cloudinary";

import AlbumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {
  try {
    const { name, desc, bgColor } = req.body;
    const imageFile = req.file;

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };
    const album = AlbumModel(albumData);
    await album.save();

    res
      .status(200)
      .json({ success: true, message: "Album added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const listAlbum = async (req, res) => {
  try {
    const allAlbums = await AlbumModel.find({});

    res.status(200).json({ success: true, albums: allAlbums });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const removeAlbum = async (req, res) => {
  try {
    const { id } = req.body;
    const deletedAlbum = await AlbumModel.findByIdAndDelete(id);
    if (!deletedAlbum) {
      return res.status(404).json({ message: "Album not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Album removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addAlbum, listAlbum, removeAlbum };
