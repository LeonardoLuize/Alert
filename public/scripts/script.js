document.querySelector('body').addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
})

window.addEventListener('load', () => {
    loadMessages()
})

function loadMessages(){

    fetch('http://localhost:3000/api/messages/all')
    .then(res => {
        console.log(res);

        res.json().then(data => {

            messageContainer = document.getElementById('wrapMessage');
            console.log(data);

            messageContainer.innerHTML = ''

            data.forEach(message => {

                messageContainer.innerHTML += 
                                                `
                                                <div class="messageContainer">
                                                    <div class="noteHeader">
                                                        <h2>${message.title}</h2>

                                                        <img onclick="deleteMessage('${message.id}')" src="./svg/delete.svg" alt="Deletar Mensagem">
                                                    </div>

                                                    <p>
                                                        ${message.description}
                                                    </p>
                                                </div>
                                                `

            })
           
        })
    })
    .catch(err => console.log('Novo erro no loadMessages: ' + err));
}

function addMessage(){
    id = newId();
    title = document.getElementById('messageTitle').value;
    description = document.getElementById('messageDescription').value;

    newMessage = {id, title, description};

  

    fetch('http://localhost:3000/api/messages/add', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(newMessage)
    })
    .then(res => {
        console.log(res);
        
        toggleAddMessage()
        loadMessages();
    })
    .catch(err => console.log('Novo erro no addMessage: ' + err))
}


function deleteMessage(id){
    fetch(`http://localhost:3000/api/message/delete/${id}`, {method: 'DELETE'})
    .then(res => {
        console.log(res)
        loadMessages();
    })
    .catch(err => console.log('Novo erro no deleteMessage: ' + err))
}

function searchMessage(){


    fetch('http://localhost:3000/api/messages/all')
    .then(res => {
        console.log(res);

        res.json().then(data => {

            var messageTitle = document.getElementById('searchInput').value;
            var messageContainer = document.getElementById('wrapMessage');
            console.log(data);

            messageContainer.innerHTML = ''

            data.forEach(message => {

                if(message.title == messageTitle){

                    messageContainer.innerHTML += 
                                                `
                                                <div class="messageContainer">
                                                    <div class="noteHeader">
                                                        <h2>${message.title}</h2>

                                                        <img onclick="deleteMessage('${message.id}')" src="./svg/delete.svg" alt="Deletar Mensagem">
                                                    </div>

                                                    <p>
                                                        ${message.description}
                                                    </p>
                                                </div>
                                                `

                }else{
                    console.log("Não encontrado")
                }
                

            })
           
        })
    })
    .catch(err => console.log("Novo erro no search: " + err))
}

async function toggleAddMessage(){
    reset = resetInputs()

    await reset

    var modalBackground = document.querySelector('.modalBackground')

    modalBackground.classList.toggle('modalOpen')

}

function resetInputs(){
    title = document.getElementById('messageTitle').value;
    description = document.getElementById('messageDescription').value;

    title = " "
    description = ""
}

function newId() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    
}