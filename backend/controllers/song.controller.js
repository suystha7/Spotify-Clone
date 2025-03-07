import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

const getRandomSongs = async (size, res, next) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size } },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);
    res.status(200).json(songs);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = (req, res, next) =>
  getRandomSongs(6, res, next);
export const getMadeForYouSongs = (req, res, next) =>
  getRandomSongs(4, res, next);
export const getTrendingSongs = (req, res, next) =>
  getRandomSongs(4, res, next);
