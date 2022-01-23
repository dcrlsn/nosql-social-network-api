const { Thought, User } = require('../models');


const getAllThoughts = (req, res) => {
  Thought
    .find({})
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

const getThoughtbyId = (req, res) => {
  Thought
    .findOne({
      _id: req.params.id
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

const createThought = (req, res) => {
  Thought
    .create(req.body)
    .then((thoughtData) => {
      return User.findOneAndUpdate({
        _id: req.body.userId
      }, {
        $addToSet: {
          thoughts: thoughtData._id
        }
      }, {
        new: true
      });
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

const updateThought = (req, res) => {
  Thought
    .findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: req.body
    }, {
      runValidators: true,
      new: true
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

const deleteThought = (req, res) => {
  Thought
    .findOneAndDelete({
      _id: req.params.id
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

const addReaction = (req, res) => {
  Thought
    .findOneAndUpdate({
      _id: req.params.id
    }, {
      $push: {
        reactions: req.body
      }
    }, {
      new: true,
      runValidators: true
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

const deleteReaction = (req, res) => {
  Thought
    .findOneAndUpdate({
      _id: req.params.id
    }, {
      $pull: {
        reactions: {
          reactionId: req.params.reactionId
        }
      }
    }, {
      new: true
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
}

module.exports = { getAllThoughts, getThoughtbyId, createThought, updateThought, deleteThought, addReaction, deleteReaction }