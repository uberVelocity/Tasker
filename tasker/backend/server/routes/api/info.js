const router = require("express").Router();
const jwt = require('jsonwebtoken');
const User = require("../../model/User");

// Return data of user to the front-end
router.post('/user', async (req, res) => {
    const token = req.body.token;
    const decoded = jwt.decode(token, {complete: true});
    const id = decoded.payload._id;
    const user = await User.findById(id);
    const userData = {
        name: user.name,
        tasks: user.tasks
    };
    res.status(200).json({
        userData
    }).send();
});

module.exports = router;