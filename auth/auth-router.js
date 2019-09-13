const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users-model.js');

router.post('/register', (req, res) => {
  let user = req.body;

  user.password = bcrypt.hashSync(user.password, 6);

  Users.add(user)
  .then(newUser => {
      const token = generateToken(newUser);
      res.status(201).json({
          user: newUser,
          token
      });
  })
  .catch(error => {
      res.status(500).json(error);
  });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
  .first()
  .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);

          res.status(200).json({ 
              message: `Welcome ${user.username}`,
              token 
          });
      } else {
          res.status(401).json({ message: 'You shall not pass!'})
      }
  })
  .catch(error => {
      res.status(500).json(error);
  });
});

function generateToken(user) {
  const payload = {
      id: user.id,
      username: user.username
  };

  const options = {
      expiresIn: '1d'
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options)
}

module.exports = router;
