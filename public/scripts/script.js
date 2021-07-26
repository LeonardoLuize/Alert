function loadMessages(){

    fetch('http://localhost:3000/api/messages/all')
    .then(res => {
        console.log(res);

        res.json().then(data => {
            console.log(data);
        })
    })
    .catch(err => console.log('Novo erro: ' + err));
}

function addMessage(){
    title = 'oo esse é o título novo'
    description = 'oo essa é a descrição nova'

    newMessage = {title, description};

    fetch('http://localhost:3000/api/messages/add', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(newMessage)
    })
    .then(res => {
        console.log(res);
        loadMessages();
    })
    .catch(err => console.log('Novo erro: ' + err))
}