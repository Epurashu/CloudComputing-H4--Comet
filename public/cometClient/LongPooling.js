/**
 * Created by Epurashu on 25.04.2016.
 */

/**
 * Created by Epurashu on 19.04.2016.
 */

var lastMessage = 1;

function getRoomAdress(){
    return document.getElementById('roomName').innerHTML;
}

function getUserName(){
    return document.getElementById('username').innerHTML;
}

function retrieveMessages(){
    $.ajax({
         cache: false,
         dataType: 'json',
         type: "GET",
         url: getRoomAdress(),
         data: {lstMsg: lastMessage},
         success: function (json) {
         console.log(json.lstmsg);
         if (json.lstmsg == lastMessage){
         }
         else {
         lastMessage = json.lstmsg;
         document.getElementById('chatbox').innerHTML += json.msg+"<br>";
         }

         },
         error: function () {
         //don't flood the servers on error, wait 10 seconds before retrying
         console.log("Response is Err: ");
         }

 });
}

function longPoll_feed() {
    //make another request
    $.ajax({
        cache: false,
        dataType: 'json',
        type: "GET",
        url: getRoomAdress(),
        data: {lstMsg: lastMessage},
        success: function (json) {

            console.log(json.lstmsg);
            if (json.lstmsg == lastMessage){
                setTimeout(longPoll_feed, 3 * 1000);
            }
            else {
                lastMessage = json.lstmsg;
                document.getElementById('chatbox').innerHTML += json.msg+"<br>";
                setTimeout(longPoll_feed, 3 * 1000);
            }

        },
        error: function () {
            //don't flood the servers on error, wait 10 seconds before retrying
            console.log("Response is Err: ");
            setTimeout(longPoll_feed, 10 * 1000);
        }

    });
}

$(document).ready(function () {
    //begin listening for updates right away
    longPoll_feed();
    var button=document.getElementById("submitmsg");
    button.onclick=function(){
        var data = {username: document.getElementById('username').innerHTML, message: document.getElementById('usrmsg').value, firstTime: "false" };
        $.post(getRoomAdress(), data, function (res) {
            //retrieveMessages();
        },'json');
        document.getElementById("usrmsg").value="";};
});