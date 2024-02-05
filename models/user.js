const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username:{
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email."]
    },
    thoughts:[
        {
          type: Schema.Types.ObjectId,
          ref: 'Thoughts',
        },
      ],
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);


userSchema
  .virtual('friendsCount')
  .get(function(){
    return this.friends.length;
  })

const User = model('User', userSchema) 

  module.export = User;