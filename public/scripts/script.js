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

                                                        <img src="./svg/delete.svg" alt="Deletar Mensagem">
                                                    </div>

                                                    <p>
                                                        ${message.description}
                                                    </p>
                                                </div>
                                                `

            })
           
        })
    })
    .catch(err => console.log('Novo erro: ' + err));
}

function addMessage(){
    title = document.getElementById('messageTitle').value;
    description = document.getElementById('messageDescription').value;

    newMessage = {title, description};

  

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
    .catch(err => console.log('Novo erro: ' + err))
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