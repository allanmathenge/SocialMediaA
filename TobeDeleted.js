import User from "./models/User.js";

export const getUserFriends = async (req, res) => {
try {
  const { id } = eq.params;
  const user = User.findById(id);

  const friends = await Promise.all(
    user.friends.map((id) => User.findById(id));
  )

  const formattedFriends = friends.amap(
    ({_id, firstName, lastName, location, occupation, picturePath}) => {
      return { _id, firstName, lastName, location, occupation, picturePath}
    }
  );

  res.status(200).json(formattedFriends)
  } catch (error) {
    res.status(500).json({msg: `${error.message}`});
  }
}