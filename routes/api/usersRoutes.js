const router = require('express').Router()

const {
    addFriend,
    deleteFriend
} = require('../../controllers/friendsController')

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/usersController')

router.route('/')
    .get(getAllUsers)
    .post(createUser)

router.route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser)

router.route('/:userId/friends')
    .post(addFriend)

router.route('/:userId/friends/:friendId')
    .delete(deleteFriend)

module.exports = router