const PrivateChat = require('../models/PrivateChat');
const User = require('../models/User');

exports.getPrivateChatPage = async(req, res) => {
  try {
		const user = await User.findById(req.params.id);
    
    let match = []

    match = user.chat.filter(u => {
      return u.userId.toString() === req.session.user.id.toString();
    })
    let roomId;
    if(match.length == 0){
      // Insert the room ID to both sender and receiver after creating a room
      const pChat = PrivateChat({
        user1: user._id,
        user2: req.session.user.id
      });

      await pChat.save();

      user.chat.push({
        userId: req.session.user.id,
        roomId: pChat._id
      });

      await user.save();


      // Update currentUser;
      const me = await User.findById(req.session.user.id);

      me.chat.push({
        userId: user._id,
        roomId: pChat._id
      });

      await me.save();

      roomId = pChat._id;

    }else {
      roomId = user.chat.find(u => {
        return u.userId.toString() === req.session.user.id.toString()
      })

      roomId = roomId.roomId;
    }
		res.render('chat', { room: roomId });
	} catch (error) {
		console.log(error);
	}
}