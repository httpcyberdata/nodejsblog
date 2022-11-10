const router = require('express').Router()
const Post = require('../model/Post')

router.post('/', async (req, res) => {
    const newPost = new Post(req.body)

    try {
        const savePost = await newPost.save()
        res.status(200).json(savePost)
    } catch(err) {
        res.status(500).json()
    }
})

module.exports = router;