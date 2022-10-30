let user = "Davi"
function creatUser() {
    const participants = {
        name: user
    }
    return participants
}

function getTime(){
    const time = new Date()
    const h = time.getHours()
    const m = time.getMinutes()
    const s = time.getSeconds()
    return `${h}:${m}:${s}`
}

// comeIn()

function comeIn() {
    const url = "https://mock-api.driven.com.br/api/v6/uol/participants"
    const participants = creatUser()
    const response = axios.post(url, {name: "Davi"})
    response.then((result) => {
        console.log("first", result)
        if (result.status === 200){
            const content = document.querySelector("main .users")
            content.innerHTML += `<div class="user inOut"> 
            <span class = "time">(${getTime()})</span> 
            <span class="userName">${participants.name}</span> 
            entrou na sala...</div>`
        }
    }).catch((err) => {
        if (err.response.status === 400) {
            user = "Lari"
            // user = prompt(`Esse nome já existe. Escolha outro para usar o bate papo`)
            // creatUser()
            // comeIn()
        }
    });
}
comeIn()

const users = []

function active(){
    const url = "https://mock-api.driven.com.br/api/v6/uol/status"
    axios.post(url, {name: user})
        .then((response) => console.log("ainda to aqui"))
        .catch((error) => {
            const content = document.querySelector("main .users")
            content.innerHTML += `<div class="user inOut"> 
            <span class = "time">(${getTime()})</span> 
            <span class="userName">${participants.name}</span> 
            entrou na sala...</div>`

        })
}


setInterval(active, 5000)
