
const db = firebase.firestore();

db.collection('messages').orderBy('timestamp')
  .onSnapshot(snapshot => {
      const chatBox = document.getElementById('chat-box');
      chatBox.innerHTML = '';
      snapshot.forEach(doc => {
          const data = doc.data();
          chatBox.innerHTML += `<p><strong>${data.user}:</strong> ${data.message}</p>`;
      });
  });

function sendMessage(){
    const user = document.getElementById('user').value;
    const message = document.getElementById('message').value;
    fetch('/sendMessage', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({user, message})
    });
}
