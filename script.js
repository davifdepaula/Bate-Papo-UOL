let user = "Davi", msgList = []

function comeIn() {
    const url = "https://mock-api.driven.com.br/api/v6/uol/participants"
    axios.post(url, {name: user})
    .then((response) => console.log("Usuario entrou: ", response.status))
    .catch((err) => {
        if (err.response.status === 400) {
            user = prompt(`Esse nome já existe. Escolha outro para usar o bate papo`)
            comeIn()
        }
    });
}
comeIn()

const users = []

function active(){
    const url = "https://mock-api.driven.com.br/api/v6/uol/status"
    axios.post(url, {name: user})
        .then((response) => console.log("status", response.status))
        .catch((error) => console.log(error))
}


setInterval(active, 5000)

function getMsg(){
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
getMsg()

function renderMsg(msg) {
    const content =  document.querySelector("main")
    if (msg.type === "status"){
        content.innerHTML += `<div class= "inOut share">
        <span class="time">(${msg.time})</span>$ 
        <span class="userName">${msg.from}</span> ${msg.text}
        </div>
        `
    }
    else if(msg.type === "message"){
        content.innerHTML += `<div class= "public share">
        <span class="time">(${msg.time})</span>$ 
        <span class="userName">${msg.from}</span> para 
        <span class="userName">${msg.to}</span>
        ${msg.text}
        </div>
        `
    }

    else if(msg.type === "private_message"){
        content.innerHTML += `<div class= "private share">
        <span class="time">(${msg.time})</span>$ 
        <span class="userName">${msg.from}</span> para 
        <span class="userName">${msg.to}</span>
        ${msg.text}
        </div>
        `
    }
}

function creatMsg() {
    const content = document.querySelector(".msgContent")
    const msg =  content.value
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
            const show = document.querySelector("main")
            show.scrollIntoView()
            console.log("foi")
    })
        .catch((error) => window.location.reload())
}
