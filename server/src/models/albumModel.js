import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const albumSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Album name is required"],
      trim: true,
      unique: true,
      minlength: [2, "Album name must be at least 2 characters long"],
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    bgColor: {
      type: String,
      required: [true, "Background color is required"],
      trim: true,
      validate: {
        validator: function (v) {
          const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
          return hexColorRegex.test(v);
        },
        message: (props) => `${props.value} is not a valid hex color code!`,
      },
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
  },
  {
    timestamps: true,
  }
);

const AlbumModel = models.Album || model("Album", albumSchema);

export default AlbumModel;
