const express = require('express');
const {
  createComic,
  getComics,
  getComicById,
  updateComic,
  deleteComic,
} = require('../controllers/comicController');

const router = express.Router();

// CRUD routes
router.post('/', createComic);
router.get('/', getComics);
router.get('/:id', getComicById);
router.put('/:id', updateComic);
router.delete('/:id', deleteComic);

module.exports = router;
