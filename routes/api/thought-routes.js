const router = require('express').Router();
const { getAllThoughts, getThoughtbyId, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thought-controller')


router
  .route('/')
  .get(getAllThoughts)
  .post(createThought)

router
  .route('/:id')
  .get(getThoughtbyId)
  .put(updateThought)
  .delete(deleteThought)

router
  .route('/:id/reactions')
  .post(addReaction)

router
  .route('/:id/reactions/:reactionId')
  .delete(deleteReaction)

module.exports = router;