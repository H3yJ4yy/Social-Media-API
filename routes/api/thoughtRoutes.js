const router = require('express').Router();
const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction

} = require('../../controllers/thoughtController');

router
    .route("/")
    .get(getAllThoughts)
    .post(createThought);

router
    .route("/:userId")
    .delete(deleteThought);
router
    .route("/:thoughtId")
    .get(getSingleThought)
    .put(updateThought);

router
    .route("/:thoughtId/reactions")
    .post(addReaction);
router
    .route("?:thoughtId/reaction/:reactionId")
    .delete(removeReaction);


module.exports = router;

