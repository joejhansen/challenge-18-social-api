const { User, Thought } = require('../models');

module.exports = {
    getAllThoughts(req, res) {
        Thought.find().then((thoughts) => {
            res.status(200).json(thoughts)
        }).catch((err) => {
            console.log(err)
            res.status(500).json(err)
        })
    },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            // .populate('user')
            .then((thought) => {
                thought
                    ? res.status(200).json(thought)
                    : res.status(400).json({ message: "No thought by that ID found" })
            })
    },
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body)
            if(!newThought){
                res.status(500).json({ message: "Something went wrong creating the new thought"})
            }
            const updatedUser = await User.findOneAndUpdate(
                { owner: newThought.username },
                { $addToSet: { thoughts: newThought._id}},
                { runValidators: true, new: true}
            )
            if(!updatedUser){
                res.status(500).json({ message: "Something went wrong adding the thought to the associated user"})
            }
            res.status(200).json(newThought)
        } catch(err){
            console.log(err)
            res.status(500).json(err)
        }
    },
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        ).then((updatedThought) => {
            updatedThought
                ? res.status(200).json(updatedThought)
                : res.status(400).json({ message: "No thought by that ID found" })
        })
    },
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => {
                thought
                    ? res.status(200).json({ message: "Thought and associated reactions deleted" })
                    : res.status(404).json({ message: "No thought by that ID found" })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json(err)
            })
    },
}