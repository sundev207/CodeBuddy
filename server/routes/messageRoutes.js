const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Message = mongoose.model('messages');
const User = mongoose.model('users');

module.exports = app => {
  app.get('/api/messages', requireLogin, async (req, res) => {
    Message.find({ recipientUserId: req.user._id }, (err, messages) => {
      const messageMap = {};

      messages.map(message => {
        messageMap[message._id] = message;
        return messageMap;
      });

      res.send(messageMap);
    });
  });

  app.post('/api/add_message', async (req, res) => {
    const { values, user, currentUser } = req.body;
    try {
      const author = await User.findOne({ _id: currentUser._id });
      const recipient = await User.findOne({ _id: user._id });
      Message.create({
        author: {
          _id: author._id,
          firstName: author.firstName,
          lastName: author.lastName,
          img: author.profile.img,
        },
        recipient: recipient._id,
        body: values.message,
      });

      res.send();
    } catch (e) {
      /* eslint-disable no-console */
      console.log('Error: ', e);
    }
  });
};
