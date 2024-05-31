import User from "./models/User.js";
import Post from "./models/Post.js";

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId)
    } else {
      post.likes.set(userId)
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: likes.post },
      { new: true }
    )
    res.status(200).json(updatedPost)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}