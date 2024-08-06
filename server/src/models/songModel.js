import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const songSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Song name is required"],
      trim: true,
      minlength: [2, "Song name must be at least 2 characters long"],
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    album: {
      type: String,
      required: [true, "Album name is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image URL is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/.test(v);
        },
        message: (props) => `${props.value} is not a valid image URL!`,
      },
    },
    file: {
      type: String,
      required: [true, "File URL is required"],
      trim: true,
      validate: {
        validator: function (v) {
          return /^(https?:\/\/.*\.(?:mp3))$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mp3 file URL!`,
      },
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      min: [1, "Duration must be at least 1 second"],
    },
  },
  {
    timestamps: true,
  }
);

songSchema.index({ name: 1, album: 1 }, { unique: true });

const SongModel = models.Song || model("Song", songSchema);

export default SongModel;
