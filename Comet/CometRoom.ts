
/**
 * Created by Epurashu on 25.04.2016.
 */

 export class room{
    private roomId: number;
    private roomName: string;
    private lastMessage: number;
    private messagesNotFilled: boolean;
    public roomMessages: string[];

    constructor(id:number, name:string){
        this.roomId = id;
        this.roomName = name;
        this.lastMessage = 1;
        this.messagesNotFilled = true;
        this.roomMessages = [""];
    }

    public getId(): number{
        return this.roomId;
    }

    public getName(): string {
        return this.roomName;
    }

    public getLastMessage(): number {
        return this.lastMessage;
    }

    private resetLastMessage(){
        this.lastMessage = 1;
    }

    public addMessage(msg:string){
        if(this.roomMessages.length < 1000 && this.messagesNotFilled) {
            this.roomMessages.push(msg);
            this.lastMessage++;
        }
        else
            if(this.lastMessage<1000){
                this.roomMessages[this.lastMessage] = msg;
                this.lastMessage++;
            }
            else{
                this.messagesNotFilled=false;
                this.resetLastMessage();
                this.roomMessages[this.lastMessage] = msg;
                this.lastMessage++;
            }
    }

    public retrieveMessages(lMsg:number){
        var response: string = "{";
        console.log("Last Recieved Message:"+lMsg);
        if(lMsg==this.lastMessage)
        return "{\"lstmsg\":\""+this.lastMessage+"\"}";
        else
        if(lMsg<this.lastMessage){
            for(var i=lMsg; i<this.lastMessage; i++)
                response +="\"msg\":\""+this.roomMessages[i]+"\",\n";
            response +="\"lstmsg\":\""+this.lastMessage+"\"}";
            return response;
        }
        for(var i=lMsg; i<1000;i++)
            response +=this.roomMessages[lMsg]+ '\n';

        for(var i=1; i<this.lastMessage;i++)
            response += this.roomMessages[lMsg]+ '\n';

        return response;
    }
}