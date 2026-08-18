const user = require('../models/user');
const { getAuthUserAndTargetUser } = require('../service/getFollowService');

const followUser = async (req, res) => {
  try {
    const { userIdToFollow } = req.body;
    const currentUserId = req.user.id;

    if (currentUserId === userIdToFollow) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const users = await getAuthUserAndTargetUser(currentUserId, userIdToFollow, req, res);
    if (!users) {
        return; // The response has already been sent in the service function   
    }
    const { currentUser, targetUser } = users;

    if (currentUser.following.includes(userIdToFollow)) {
      return res.status(400).json({ message: "You are already following this user" });
    }

    currentUser.following.push(userIdToFollow);
    targetUser.followers.push(currentUserId);

    await currentUser.save();
    await targetUser.save();
    res.status(200).json({ message: "User followed successfully" });

    } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



const unfollowUser = async (req,res) =>{
    try {

        const {userIdToUnfollow} = req.body;
        const currentUserId = req.user.id;

        const users = await getAuthUserAndTargetUser(currentUserId, userIdToUnfollow, req, res);
        if (!users) {
            return; // The response has already been sent in the service function   
        }

        const { currentUser, targetUser: userToUnfollow } = users;

        if(!currentUser.following.includes(userIdToUnfollow)){
            return res.status(400).json({message: "You are not following this user"});
        }

        currentUser.following = currentUser.following.filter(id => id.toString() !== userIdToUnfollow);
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUserId);

        await currentUser.save();
        await userToUnfollow.save();
        res.status(200).json({message: "User unfollowed successfully"});
        
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

module.exports = { followUser, unfollowUser };