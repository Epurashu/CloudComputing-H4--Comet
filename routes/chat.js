/**
 * Created by Epurashu on 23.04.2016.
 */
var express = require('express');
var router = express.Router();
var room = require('../Comet/CometRoom.js');


var rooms = [new room.room(0,'HardWareRoom'), new room.room(1, 'SoftWareRoom')];

router.get('/:chatRoomName/:chatRoomId', function(req, res, next)
{
    if(rooms[req.params.chatRoomId].getId()==req.params.chatRoomId)
        if(rooms[req.params.chatRoomId].getName()==req.params.chatRoomName) {
            res.writeHead(200);
            res.end(rooms[req.params.chatRoomId].retrieveMessages(req.params.lstMsg));
        }

    res.render('chatPage',{title: rooms[req.params.chatRoomId].getName, username: req.params.username, roomAdress: '/'+req.params.chatRoomName+'/'+req.params.chatRoomId});
    res.end();

});

router.post('/:chatRoomName/:chatRoomId', function(req, res, next)
{
    console.log('tss');
    if(rooms[req.params.chatRoomId].getId()==req.params.chatRoomId)
        if(rooms[req.params.chatRoomId].getName()==req.params.chatRoomName) {
            rooms[req.params.chatRoomId].addMessage(req.params.username + " " + req.params.message);
            res.writeHead(202);
            res.end();
        }

    res.render('chatPage',{title: rooms[req.params.chatRoomId].getName, username: req.params.username, roomAdress: '/'+req.params.chatRoomName+'/'+req.params.chatRoomId});
    res.writeHead(404);
    res.end();
});

module.exports = router;