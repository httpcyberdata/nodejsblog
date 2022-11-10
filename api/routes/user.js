const router = require('express').Router()
const User = require('../model/User');
const Post = require('../model/Post');
const bcrypt = require('bcrypt');

router.put("/:id", async (req, res) => {
    if(req.body.userId == req.params.id) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt);

        }
        try {
            const updateUser = await User.findByIdAndUpdate(
                req.params.id, 
                {
                    $set: req.body
                },
                {
                    new: true,
                })
                res.status(200).json(updateUser);
        } catch(err) {
            res.status(500).json(err)
        }
    } else {
        res.status(401).json("You can update your account.")
    }
})

router.delete('/:id', async (req, res) => {

    if(req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            try {
                await Post.deleteMany({ 
                    username: user.username
                })
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted")
            } catch(err) {
                res.status(500).json(err)
            }
        } catch(err) {
            res.status(404).json("User not found...")
        }
    } else {
        res.status(401).json("You can delete only your account")
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...other}  = user._doc
        res.status(200).json(other);
    } catch(err) {
        res.status(400).json(other)
    }
})

module.exports = router;

/**
 * username: Vlad1337anonymous
 * email: vlad1337@gmail.com
 * password: vlad456
 * 
 * username: freshacc
 * email: freshacc101@mail.com
 * password: fresh456
 * 
 * username: dimitri_presno
 * email: presnodmitri@mail.com
 * password: presno456
 */