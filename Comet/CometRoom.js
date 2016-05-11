/**
 * Created by Epurashu on 25.04.2016.
 */
var room = (function () {
    function room(id, name) {
        this.roomId = id;
        this.roomName = name;
        this.lastMessage = 1;
        this.messagesNotFilled = true;
        this.roomMessages = [""];
    }
    room.prototype.getId = function () {
        return this.roomId;
    };
    room.prototype.getName = function () {
        return this.roomName;
    };
    room.prototype.getLastMessage = function () {
        return this.lastMessage;
    };
    room.prototype.resetLastMessage = function () {
        this.lastMessage = 1;
    };
    room.prototype.addMessage = function (msg) {
        if (this.roomMessages.length < 1000 && this.messagesNotFilled) {
            this.roomMessages.push(msg);
            this.lastMessage++;
        }
        else if (this.lastMessage < 1000) {
            this.roomMessages[this.lastMessage] = msg;
            this.lastMessage++;
        }
        else {
            this.messagesNotFilled = false;
            this.resetLastMessage();
            this.roomMessages[this.lastMessage] = msg;
            this.lastMessage++;
        }
    };
    room.prototype.retrieveMessages = function (lMsg) {
        var response = "{";
        console.log("Last Recieved Message:" + lMsg);
        if (lMsg == this.lastMessage)
            return "{\"lstmsg\":\"" + this.lastMessage + "\"}";
        else if (lMsg < this.lastMessage) {
            for (var i = lMsg; i < this.lastMessage; i++)
                response += "\"msg\":\"" + this.roomMessages[i] + "\",\n";
            response += "\"lstmsg\":\"" + this.lastMessage + "\"}";
            return response;
        }
        for (var i = lMsg; i < 1000; i++)
            response += this.roomMessages[lMsg] + '\n';
        for (var i = 1; i < this.lastMessage; i++)
            response += this.roomMessages[lMsg] + '\n';
        return response;
    };
    return room;
})();
exports.room = room;
//# sourceMappingURL=CometRoom.js.map