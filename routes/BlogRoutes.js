const express = require('express');
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  approveBlog,
  rejectBlog,
  featureBlog
} = require('../controller/blogController');

router.post('/create', createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.put('/update/:id', updateBlog);
router.delete('/delete/:id', deleteBlog);

router.patch('/approve/:id', approveBlog);
router.patch('/reject/:id', rejectBlog);
router.patch('/feature/:id', featureBlog);

module.exports = router;
