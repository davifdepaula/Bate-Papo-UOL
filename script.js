let user = prompt("Digite seu lindo nome: ")
let  msgList = []

function comeIn() {
    const url = "https://mock-api.driven.com.br/api/v6/uol/participants"
    axios.post(url, {name: user})
    .catch((err) => {
        if (err.response.status === 400) {
            user = prompt(`Esse nome já existe. Escolha outro para usar o bate papo`)
            comeIn()
        }
    });
}
comeIn()
getMsg()

function active(){
    const url = "https://mock-api.driven.com.br/api/v6/uol/status"
    axios.post(url, {name: user})
        .then((response) => console.log("to ativo"))
        .catch((error) => console.log("não to mais", error))
}
setInterval(active, 5000)

function getMsg(){
    console.log("atualizei")
    const url = "https://mock-api.driven.com.br/api/v6/uol/messages"
    axios.get(url)
        .then((response) => {  
            msgList = response.data
            msgList.map((msg) => {
                return renderMsg(msg)
            })     
        })
        .catch((error) => console.log("msg não veio", error))
}

setInterval(getMsg, 3000)


function renderMsg(msg) {
    const content =  document.querySelector("main")
    if (msg.type === "status"){
        content.innerHTML += `<div class= "status share">
        <span class="time">(${msg.time})</span>$ 
        <span class="userName">${msg.from}</span> ${msg.text}
        </div>
        `
    }
    else if(msg.type === "message"){
        content.innerHTML += `<div class= "message share">
        <span class="time">(${msg.time})</span>$ 
        <span class="userName">${msg.from}</span> para 
        <span class="userName">${msg.to}</span>
        ${msg.text}
        </div>
        `
    }

    else if(msg.type === "private_message"){
        content.innerHTML += `<div class= "private_message share">
        <span class="time">(${msg.time})</span>$ 
        <span class="userName">${msg.from}</span> para 
        <span class="userName">${msg.to}</span>
        ${msg.text}
        </div>
        `
    }
    updateChat()
}

function updateChat(){
    const lastMsg = document.querySelectorAll(".share")
    const show = lastMsg[lastMsg.length -1]
    show.scrollIntoView()
}

function creatMsg() {
    const content = document.querySelector(".msgContent")
    const msg =  content.value
    content.value = ""
    return {
        from: user, 
        to: "todos",
        text: msg,
        type: "message"
    }
}


function sendMsg(){
    const msgContent = creatMsg()
    const url = "https://mock-api.driven.com.br/api/v6/uol/messages"
    axios.post(url, msgContent)
        .then((response) => {
            getMsg()
            updateChat()
    })
        .catch((error) => {
            window.location.reload()
        })
}

