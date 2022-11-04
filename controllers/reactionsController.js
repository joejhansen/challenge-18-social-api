const { User, Thought } = require('../models');

module.exports = {
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                thought
                    ? res.status(200).json(thought)
                    : res.status(404).json({ message: "No thought with that ID" })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                thought
                    ? res.status(200).json(thought)
                    : res.status(404).json({ message: "No thought with that ID" })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
}