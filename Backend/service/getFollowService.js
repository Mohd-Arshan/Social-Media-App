const user = require("../models/user");
const  getAuthUserAndTargetUser = async(authUserId, targetUserId, req, res) => {
    const currentUser = await user.findById(authUserId);
    const targetUser = await user.findById(targetUserId);

    if (!currentUser) {
        return res.status(404).json({ message: "Authenticated user not found" });
        return null;
    }

    if (!targetUser) {
        return res.status(404).json({ message: "Target user not found" });
        return null;
    }

    return { currentUser, targetUser };
}

module.exports = { getAuthUserAndTargetUser };