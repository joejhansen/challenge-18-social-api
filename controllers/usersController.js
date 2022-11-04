const { User, Thought } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
            .then((users) => {
                res.status(200).json(users)
            }).catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends')
            .then((user) => {
                user
                    ? res.status(200).json(user)
                    : res.status(400).json({ message: "No user by that ID found" })
            })
    },
    createUser(req, res) {
        User.create(req.body)
            .then((newUser) => res.json(newUser))
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((updatedUser) => {
                updatedUser
                    ? res.status(200).json(updatedUser)
                    : res.status(400).json({ message: "No user by that ID found" })
            })
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => {
                user
                    ? Thought.deleteMany({ _id: { $in: user.thoughts } })
                    : res.status(404).json({ message: "No user by that ID found" })
            })
            .then(() => {
                res.status(200).json({ message: "User and associated thoughts deleted" })
            }).catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
}