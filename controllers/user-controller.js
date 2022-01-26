const { User, Thought } = require('../models');

const getAllUsers = (req, res) => {
  User
    .find({})
    .populate({
      path: 'thoughts'
    })
    .populate({
      path: 'friends'
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

const getUserbyId = (req, res) => {
  User
    .findOne({
      _id: req.params.id
    })
    .populate({
      path: 'thoughts'
    })
    .populate({
      path: 'friends'
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

const createUser = (req, res) => {
  User
    .create(req.body)
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

const updateUser = (req, res) => {
  User
    .findOneAndUpdate({
      _id: req.params.id
    }, req.body, {
      new: true,
      runValidators: true
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

const deleteUser = (req, res) => {
  User
    .findOneAndDelete({
      _id: req.params.id
    })
    .then(dbData => {
      User
        .updateMany({
          _id: {
            $in: dbData.friends
          }
        },
          {
            $pull: {
              friends: req.params.id
            }
          })
        .then(() => {
          Thought
            .deleteMany({
              username: dbData.username
            })
            .then(() => {
              res.json({ message: 'User Deleted' })
            })
            .catch(err => {
              console.log(err);
              res.status(500).json(err);
            })
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        })
    })
}

const addFriend = (req, res) => {
  User
    .findOneAndUpdate({
      _id: req.params.id
    }, {
      $push: {
        friends: req.params.friendId
      }
    }, {
      new: true
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

const removeFriend = (req, res) => {
  User
    .findOneAndUpdate({
      _id: req.params.id
    }, {
      $pull: { friends: req.params.friendId }
    }, {
      new: true
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}

module.exports = {
  getAllUsers, getUserbyId, createUser, updateUser, deleteUser, addFriend, removeFriend
}