const { User } = require('../models');

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
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
}