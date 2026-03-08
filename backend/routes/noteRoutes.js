const express = require('express');
const { body } = require('express-validator');
const noteController = require('../controllers/noteController');
const { protect } = require('../middleware/auth');

const router = express.Router();
router.use(protect);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('body').trim().notEmpty().withMessage('Body is required'),
    body('category').trim().notEmpty().withMessage('Category is required'),
  ],
  noteController.createNote
);

router.get('/', noteController.getNotes);
router.get('/:id', noteController.getNoteById);

router.put(
  '/:id',
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('body').optional().trim().notEmpty().withMessage('Body cannot be empty'),
    body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  ],
  noteController.updateNote
);

router.delete('/:id', noteController.deleteNote);

module.exports = router;
