const { User, Thought } = require('../models');

module.exports = {
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body.friendId } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                user
                    ? res.status(200).json(user)
                    : res.status(404).json({ message: "No user with that ID" })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { userId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) => {
                user
                    ? res.status(200).json(user)
                    : res.status(404).json({ message: "No user with that ID" })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
}