var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var room = require('../Comet/CometRoom.js');


var rooms = [new room.room(0,'HardWareRoom'), new room.room(1, 'SoftWareRoom')];

router.get('/:chatRoomName/:chatRoomId', function(req, res, next)
{
  if(rooms[req.params.chatRoomId].getId()==req.params.chatRoomId)
    if(rooms[req.params.chatRoomId].getName()==req.params.chatRoomName) {
      res.writeHead(200);
      var msgToJson = rooms[req.params.chatRoomId].retrieveMessages(req.param('lstMsg'));
      console.log(msgToJson);
      res.end(msgToJson);
    }

  //res.render('chatPage',{title: rooms[req.params.chatRoomId].getName, username: req.params.username, roomAdress: '/'+req.params.chatRoomName+'/'+req.params.chatRoomId});

});

router.post('/:chatRoomName/:chatRoomId', function(req, res, next)
{
  var rId = parseInt(req.params.chatRoomId);
  if(req.body.firstTime=='true') {
    res.render('chatPage', {
      title: rooms[req.params.chatRoomId].getName(),
      username: req.body.nickname,
      roomAdress: '/' + req.params.chatRoomName + '/' + req.params.chatRoomId
    });
  }
  else  if(rooms[rId].getId()==rId) {
        if (rooms[rId].getName() == req.params.chatRoomName) {
          console.log(req.body.username);
          rooms[rId].addMessage(req.body.username + ": " + req.body.message);
          res.writeHead(202);
          res.end();
        }
  }


  //res.render('chatPage',{title: rooms[req.params.chatRoomId].getName, username: req.params.username, roomAdress: '/'+req.params.chatRoomName+'/'+req.params.chatRoomId});

});


module.exports = router;
