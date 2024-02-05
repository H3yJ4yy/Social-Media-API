const router = require('express').Router();

const {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

router.route('/')
    .get(getAllUsers)
    .post(createUser);

router.route("/friend/:userId")
    .put(addFriend)
    .delete(removeFriend);

router.route("/:userId")
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;