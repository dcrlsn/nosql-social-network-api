const { Schema, model, Types } = require('mongoose');
const ReactionSchema = require('./Reaction');
const { create } = require('./User');

const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    get: createdAtVal => (createdAtVal.toLocaleDateString() + " " + createdAtVal.toLocaleTimeString())
  },
  username: {
    type: String,
    required: true
  },
  reactions: [ReactionSchema]
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
});

ThoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', ThoughtSchema)
module.exports = Thought;