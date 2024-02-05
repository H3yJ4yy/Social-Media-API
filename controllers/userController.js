const { User, Types } =  require ('../models');

// Aggregate function to get the number of users overall
const userCount = async () => {
    const numberOfUsers = await User.aggregate()
      .count('userCount');
    return numberOfUsers;
};

module.exports = {
//get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();

            const userObj = {
            users,
            userCount: await userCount(),
            };

            res.json(userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
//get a single user
async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('thoughts')
        .populate('friends')

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json(user);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

//create a user
async createUser(req, res){
    try{
        const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
},

//delete user
async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'Sorry this user doess not exist' });
      }
      res.json({ message: 'User has been successfully deleted!' });
    } catch (err) {
     
      res.status(500).json(err);
    }
  },

//update a user
async updateUser(req, res){
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $set: req.body },
            { runValidators: true, new: true }
        );
        
        if (!user){
            return res.status(404).json({ message: 'Sorry this user doess not exist' });
          }
          res.status(200).json({ message: 'User has been successfully updates!' });
        } catch (err) {
         
          res.status(500).json(err);
        }
    },


//add a friend
async addFriend(res, req){
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    },
//remove a friend
async removeFriend(res, req){
    try{
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
          );
    
          if (!user) {
            return res
              .status(404)
              .json({ message: 'No user found with that ID :(' });
          }
    
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
    }
}
};