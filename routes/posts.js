const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const Post = require('../models/Post');


const router = express.Router();


//Get back all the post
router.get('/', async (req, res) => {
    try {
const posts = await Post.find();
res.json(posts);
    } catch (err) {
        res.json({ message: err });


        }
    });

    //Submits a post

router.post('/', (req,res) => {
const post = new Post({
email_id: req.body.email_id,
discord_id: req.body.discord_id,
contract: req.body.contract,
alert_price: req.body.alert_price,
alert_type: req.body.alert_type,
alert_cat: req.body.alert_cat,
status: req.body.status


});

post.save()
.then(data => {
res.json(data);

})
.catch(err => { 
    res.json({ message: err });
    });

});

//Specific post
router.get('/:postId', async (req, res) => {
    try {
const post = await Post.findById(req.params.postId);
res.json(post);
    }catch (err) {

res.json({ message: err});

    }

    console.log(req.params.postId);
});

// Delete Post
router.delete('/:postId', async (req,res) => {
    try{
const removedPost = await Post.remove({_id: req.params.postId});
res.json(removedPost);
}catch (err) {
    res.json({ message: err});

}


});

//Update post

router.patch('/:postId', async (req,res) => {
    try{
const updatedPost = await Post.updateOne(
    {_id: req.params.postId },
{ $set: { title: req.body.title }}
);
res.json(updatedPost);
} catch (err) {
    res.json({ message: err});

}
    });

module.exports = router;