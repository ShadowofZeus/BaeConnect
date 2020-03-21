//adding new chat documents
//setting up a realtime listener
//updating the username
//updating the room

class Chatroom {
    constructor(room,username)
    {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
    }

    async addChat(message)
    {
        //formatting a Chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }
        //save the chat document
    const response = await this.chats.add(chat);
    return response;  //remember that this returns a PROMISE ..so .THEN method()!
    };

    //Realtime Listener Section - its a method
    getChats(callback)
    {
        this.unsub = this.chats
        //understand the where method - powerful
            .where('room','==', this.room)
        //create index from link in error message
            .orderBy('created_at')
            .onSnapshot((snapshot) => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added')
                    {
                        //update UI
                        callback(change.doc.data());
                    }
                });
            });
    }

    updateName(username){
        this.username = username;
        localStorage.setItem('username',username);
    }

    updateRoom(room)
    {
        this.room = room;
        console.log('room added');
        if(this.unsub)
        {
            this.unsub();
        }
        
    }

}
