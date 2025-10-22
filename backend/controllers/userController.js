const User = require('../models/User')
class UserController{
     async getAll(req, res, next) {
        try {
            const users = await User.find()
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json({ message: 'Error', error: err.message })
        }
    }
    async getProfile(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
}
module.exports = new UserController()