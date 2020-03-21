//DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.reset())
        .catch(err => console.log(err));
});

//update the Username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    //update name via chatroom
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);
    //reset the form
    newNameForm.reset();
    //show status message of the updated username
    updateMssg.innerHTML = `Your name was updated to: ${newName}`;
    setTimeout(() => updateMssg.innerHTML = '',2000);
});

//update the chatroom upon button click
rooms.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON')
    {
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats((chat) => chatUI.render(chat));
    }
})

//check local storage for a name
const username = localStorage.username ? localStorage.username : 'Unknown'

//class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

//get chats and render
chatroom.getChats((data) => {
    chatUI.render(data);
});