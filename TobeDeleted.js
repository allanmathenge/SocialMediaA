import User from "./models/User.js";
import Post from "./models/Post.js";

export const newPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);

    const newPost = new Post(
      {
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        description,
        location: user.location,
        userPicturePath: user.picturePath,
        picturePath,
        likes: {},
        comments: {},
      }
    )
    await newPost.save();
    const post = await Post.find();

    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post)
  } catch (err) {
    res.status(404).json({ message: err.message })
  }
}

