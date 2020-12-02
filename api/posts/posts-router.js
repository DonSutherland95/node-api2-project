const express = require('express');
const Post = require('../../data/db')
const router = express.Router();

router.get('/', async (req, res)=>{
    const { query } = req

    try{
        const post = await Post.find(query)
        res.json(post)
    }catch(error){
        res.json(error.message)
    }
})

router.post('/', (req, res)=>{
    if(!req.body.title || !req.body.contents){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
    Post.insert(req.body)
        .then(post=>{
            res.status(201).json(post)
        })
        .catch(error=>{
            console.log(error);
            res.status(500).json({error: "There was an error while saving the post to the database"})
        })
})

router.post('/:id/comments', (req, res)=>{
    const {id} = req.params
    const {title, comment} = req.body

    if(!id){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
})
module.exports = router