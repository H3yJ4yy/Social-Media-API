const { thought, Thought } =  require ('../models');

model.exports = {

//get all thoughts
    async getALlThoughts(req, res){
      try{
        const thoughts = await Thought.find();
        res.json(thoughts)
      }catch (err) {
        res.status(500).json(err);
      }
    },
//get single thoughts
    async getSingleThought(req, res){
        try {
            const thought = await thought.findOne({ _id: req.params.thoughtId })
      
            if (!thought) {
              return res.status(404).json({ message: 'No thought with that ID' });
            }
      
            res.json(thought);
          } catch (err) {
            res.status(500).json(err);
          } 
    },
//create a thought
    async createThought(req, res){
        try{
            const thought = await Thought.create(req.body);
            const user = await User.findByIdAndUpdate(
                req.params.userId,
                { $addToSet: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );
      
            if (!user) {
              return res.status(404).json({
                message: 'Thought created, but found no user with that ID',
              }
              );
            }
            res.json({user}, ' created a thougth 🎉');
          } catch (err) {
            res.status(500).json(err); 
        }
    },

//update a thought
async updateThought(req, res){ 
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thoughtId,
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.status(200).json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
},


//delete a thought
    async deleteThought(req, res){
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params },
                { $pull: { thoughts: req.body } },
                { new: true }
                );
      
            if (!user) {
                return res.status(404).json({ message: 'Thought created but no user with this id!' });
                }

            const thought = await Thought.findByIdAndDelete({_id: req.body})

            res.json({ message: 'Thought successfully deleted!' });
          } catch (err) {
            res.status(500).json(err);
          }
    },

//add reaction
    async addReaction(req, res) {
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reaction: req.body } },
                { runValidators: true, new: true }
              );
        
              if (!thought) {
                return res.status(404).json({ message: 'Sorry, no thought found' });
              }
        
              res.json(thought);
            } catch (err) {
              res.status(500).json(err); 
        }
    },

//remove reaction
    async removeReaction(req, res){
        try{
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'Sorry this thought does not exist' });
              }
        
              res.json(thought);
            } catch (err) {
              res.status(500).json(err);
        }
    }
}