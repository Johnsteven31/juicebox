const express = require ('express');
const postsRouter = express.Router();

const {
    getAllPosts
} = require('../db');

postsRouter.get('/', async (req, res, next) => {
    try {
      const allPosts = await getAllPosts();
  
      const posts = allPosts.filter(post => {
        // the post is active, doesn't matter who it belongs to
        if (post.active) {
          return true;
        }
      
        // the post is not active, but it belogs to the current user
        if (req.user && post.author.id === req.user.id) {
          return true;
        }
      
        // none of the above are true
        return false;
      });
    
      res.send({
        posts
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  module.exports = postsRouter;