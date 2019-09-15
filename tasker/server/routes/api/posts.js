const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// Get Posts (/ refers to /api/posts)
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    
    return res.status(201).send();
});

// Delete Posts
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

// Connect to posts collection
async function loadPostsCollection() {
    const client = await mongodb.MongoClient.connect(
    "mongodb+srv://dbadmin:Mihaitu3@universitycluster-b239a.mongodb.net/test?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
    );

    return client.db('UniversityCluster').collection('posts');
}

module.exports = router;
