const router = require('express').Router()

const { 
    createReaction, 
    deleteReaction 
} = require('../../controllers/reactionsController')

const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtsController')

router.route('/')
    .get(getAllThoughts)
    .post(createThought)

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:thoughtId/reactions')
    .post(createReaction)

router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router