const Comic = require('../models/Comic');

// Create a new comic book
const createComic = async (req, res) => {
  const comic = new Comic(req.body);
  try {
    await comic.save();
    res.status(201).json(comic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all comic books with pagination and filtering
const getComics = async (req, res) => {
  const { page = 1, limit = 10, ...filters } = req.query;
  try {
    const comics = await Comic.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const count = await Comic.countDocuments(filters);
    res.status(200).json({
      comics,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a comic book by ID
const getComicById = async (req, res) => {
  try {
    const comic = await Comic.findById(req.params.id);
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.status(200).json(comic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a comic book
const updateComic = async (req, res) => {
  try {
    const comic = await Comic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.status(200).json(comic);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a comic book
const deleteComic = async (req, res) => {
  try {
    const comic = await Comic.findByIdAndDelete(req.params.id);
    if (!comic) return res.status(404).json({ message: 'Comic not found' });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createComic,
  getComics,
  getComicById,
  updateComic,
  deleteComic,
};
