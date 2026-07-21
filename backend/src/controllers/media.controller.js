import Media from "../models/media.model.js";

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const media = await Media.create({
      filename: req.file.filename,
      url: `/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      message: "Uploaded successfully",
      media,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMedia = async (req, res) => {
  try {
    const media = await Media.find().sort({ createdAt: -1 });

    res.json(media);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};